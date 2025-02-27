from fastapi import FastAPI, HTTPException
import crud
from schemas import UserCreate, ChallengeCreate
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Change this to your frontend URL if deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/users/")
def create_user(user: UserCreate):
    existing_user = crud.get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(user)

@app.post("/challenges/")
def create_challenge(challenge: ChallengeCreate):
    return crud.create_challenge(challenge)




@app.post("/signup")
async def signup(email: str, password: str):
    result = sign_up(email, password)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/login")
async def login(email: str, password: str):
    result = sign_in(email, password)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result
