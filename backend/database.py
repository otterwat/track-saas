import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

load_dotenv()  # reads the .env file into environment variables

DATABASE_URL = os.getenv("DATABASE_URL")

# The engine is the actual connection to Neon.
# pool_pre_ping checks a connection is still alive before using it,
# because Neon can pause idle databases.
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# A session is one "conversation" with the database (a batch of reads/writes).
SessionLocal = sessionmaker(bind=engine, autoflush=False)

# Every table class will inherit from this.
class Base(DeclarativeBase):
    pass

# FastAPI will call this for each request to give your route a session,
# then close it afterwards.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()