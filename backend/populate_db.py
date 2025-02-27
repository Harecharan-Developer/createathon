import os
from supabase import create_client, Client
from faker import Faker
import random
import dotenv

# Load environment variables from.env file
dotenv.load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

fake = Faker()

# Create categories
categories = ["Python", "JavaScript", "Algorithms", "Data Structures"]
for cat in categories:
    supabase.table("categories").insert({"name": cat}).execute()

# Create sample challenges
challenges = [
    {
        "title": "Hello World",
        "description": "Print 'Hello World' in Python",
        "difficulty": "beginner",
        "points": 100,
        "category_id": supabase.table("categories").select("id").eq("name", "Python").execute().data[0]["id"]
    },
    {
        "title": "Check Armstrong Number",
        "description": "Determine if a number is an Armstrong number",
        "difficulty": "beginner",
        "points": 200,
        "category_id": supabase.table("categories").select("id").eq("name", "Python").execute().data[0]["id"]
    },
    {
        "title": "Generate Fibonacci Sequence",
        "description": "Print the Fibonacci sequence up to n terms",
        "difficulty": "beginner",
        "points": 150,
        "category_id": supabase.table("categories").select("id").eq("name", "Python").execute().data[0]["id"]
    },
    {
        "title": "Reverse Array In-Place",
        "description": "Reverse the elements of an array in-place",
        "difficulty": "beginner",
        "points": 200,
        "category_id": supabase.table("categories").select("id").eq("name", "Data Structures").execute().data[0]["id"]
    },
    {
        "title": "Check Palindrome String",
        "description": "Check if a given string is a palindrome",
        "difficulty": "beginner",
        "points": 200,
        "category_id": supabase.table("categories").select("id").eq("name", "Python").execute().data[0]["id"]
    },
    {
        "title": "Merge Two Sorted Arrays",
        "description": "Merge two sorted arrays into one sorted array",
        "difficulty": "intermediate",
        "points": 300,
        "category_id": supabase.table("categories").select("id").eq("name", "Data Structures").execute().data[0]["id"]
    },
    {
        "title": "Minimum Coin Change",
        "description": "Compute the fewest coins that make up a certain amount (DP)",
        "difficulty": "advanced",
        "points": 400,
        "category_id": supabase.table("categories").select("id").eq("name", "Algorithms").execute().data[0]["id"]
    },
    {
        "title": "Longest Common Subsequence",
        "description": "Find the LCS of two strings using dynamic programming",
        "difficulty": "advanced",
        "points": 450,
        "category_id": supabase.table("categories").select("id").eq("name", "Algorithms").execute().data[0]["id"]
    },
    {
        "title": "Counting Sort",
        "description": "Implement the counting sort algorithm",
        "difficulty": "intermediate",
        "points": 300,
        "category_id": supabase.table("categories").select("id").eq("name", "Algorithms").execute().data[0]["id"]
    },
    {
        "title": "Longest Palindromic Substring",
        "description": "Find the longest palindromic substring in a given string",
        "difficulty": "advanced",
        "points": 400,
        "category_id": supabase.table("categories").select("id").eq("name", "Algorithms").execute().data[0]["id"]
    },
    {
        "title": "Prime Sieve",
        "description": "Generate prime numbers up to n using the Sieve of Eratosthenes",
        "difficulty": "intermediate",
        "points": 350,
        "category_id": supabase.table("categories").select("id").eq("name", "Algorithms").execute().data[0]["id"]
    }
]

print("Challenges added successfully!")
for challenge in challenges:
    supabase.table("challenges").insert(challenge).execute()

print("Database populated successfully!")