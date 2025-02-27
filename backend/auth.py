from supabase import create_client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

def sign_up(email: str, password: str):
    try:
        response = supabase.auth.sign_up({"email": email, "password": password})
        return {"message": "User created successfully!", "data": response}
    except Exception as e:
        return {"error": str(e)}

def sign_in(email: str, password: str):
    try:
        response = supabase.auth.sign_in_with_password({"email": email, "password": password})
        return {"message": "User logged in!", "data": response}
    except Exception as e:
        return {"error": str(e)}
