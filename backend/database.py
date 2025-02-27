import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Ensure the credentials are present
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials in .env file!")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Function to test connection
def test_connection():
    try:
        response = supabase.table("users").select("*").limit(1).execute()
        print("✅ Supabase connected successfully!")
    except Exception as e:
        print("❌ Error connecting to Supabase:", e)

# Run test connection when script is executed
if __name__ == "__main__":
    test_connection()
