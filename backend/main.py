# main.py
from datetime import datetime
from enum import Enum
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from supabase import create_client, Client
from typing import Optional, List
import os
import dotenv
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Load environment variables
dotenv.load_dotenv()


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Initialize Supabase client
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)


# Authentication scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Enums
class DifficultyEnum(str, Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"

class StatusEnum(str, Enum):
    started = "started"
    submitted = "submitted"
    completed = "completed"

# Pydantic models
class User(BaseModel):
    id: str
    email: str

class ChallengeCreate(BaseModel):
    title: str
    description: str
    difficulty: DifficultyEnum
    points: int
    category_id: str

class ChallengeOut(BaseModel):
    id: str
    title: str
    description: str
    difficulty: DifficultyEnum
    points: int
    category_id: str
    created_at: datetime
    category: Dict  # New field for category data

class Submission(BaseModel):
    code: str
    language: str

class UserProgressOut(BaseModel):
    challenge_id: str
    status: StatusEnum
    attempts: int
    completed_at: Optional[datetime]

# Dependency to get current user
async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    try:
        user = supabase.auth.get_user(token)
        if not user.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return User(id=user.user.id, email=user.user.email)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
@app.get("/challenges/", response_model=List[ChallengeOut])
async def get_challenges():
    """Get all challenges with category data"""
    try:
        # Query with category relationship
        result = supabase.table("challenges").select("*, category:categories(*)").execute()
        
        # Transform response to match ChallengeOut model
        challenges = []
        for item in result.data:
            challenges.append({
                **item,
                "category": item["category"] if item.get("category") else {}
            })
        
        return challenges
    except Exception as e:
        raise HTTPException(500, str(e))
    
# Update submit endpoint
@app.post("/challenges/{challenge_id}/submit")
async def submit_challenge(
    challenge_id: str,
    submission: Submission,
    current_user: User = Depends(get_current_user)
):
    try:
        # Get challenge
        challenge = supabase.table("challenges").select("*").eq("id", challenge_id).execute()
        if not challenge.data:
            raise HTTPException(404, "Challenge not found")

        # Execute code
        result = execute_python_code(submission.code)
        
        # Store submission
        submission_data = {
            "user_id": current_user.id,
            "challenge_id": challenge_id,
            "code": submission.code,
            "language": submission.language,
            "success": result["success"]
        }
        supabase.table("submissions").insert(submission_data).execute()

        # Update progress
        progress_data = {
            "user_id": current_user.id,
            "challenge_id": challenge_id,
            "status": StatusEnum.completed if result["success"] else StatusEnum.submitted,
            "attempts": 1,
            "completed_at": datetime.utcnow().isoformat() if result["success"] else None
        }

        existing = supabase.table("user_progress").select("*").match({
            "user_id": current_user.id,
            "challenge_id": challenge_id
        }).execute()

        if existing.data:
            progress_data["attempts"] = existing.data[0]["attempts"] + 1
            supabase.table("user_progress").update(progress_data).eq(
                "id", existing.data[0]["id"]
            ).execute()
        else:
            supabase.table("user_progress").insert(progress_data).execute()

        return {
            "success": result["success"],
            "output": result.get("output"),
            "error": result.get("error"),
            "attempts": progress_data["attempts"]
        }
    except Exception as e:
        raise HTTPException(500, str(e))
@app.get("/progress/", response_model=List[UserProgressOut])
async def get_progress(current_user: User = Depends(get_current_user)):
    """Get user progress"""
    try:
        result = supabase.table("user_progress").select("*").eq(
            "user_id", current_user.id
        ).execute()
        return result.data
    except Exception as e:
        raise HTTPException(500, str(e))

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    """Get current user info"""
    return current_user



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)