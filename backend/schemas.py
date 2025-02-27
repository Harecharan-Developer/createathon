from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str

class ChallengeCreate(BaseModel):
    title: str
    description: str
    difficulty: str
    points: int

class ChallengeOut(ChallengeCreate):
    id: int
