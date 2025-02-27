from database import supabase
from schemas import UserCreate, ChallengeCreate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create a new user
def create_user(user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    response = supabase.table("users").insert({
        "email": user.email,
        "hashed_password": hashed_password
    }).execute()
    return response.data

# Fetch user by email
def get_user_by_email(email: str):
    response = supabase.table("users").select("*").eq("email", email).execute()
    return response.data[0] if response.data else None

# Create a challenge
def create_challenge(challenge: ChallengeCreate):
    response = supabase.table("challenges").insert(challenge.dict()).execute()
    return response.data
