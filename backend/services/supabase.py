from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL:
    raise Exception("Falta SUPABASE_URL en .env")

if not SUPABASE_KEY:
    raise Exception("Falta SUPABASE_KEY en .env")

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)
