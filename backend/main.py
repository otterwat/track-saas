from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import os
import hashlib
import hmac
import secrets

from database import Users, Quiz, engine, get_db, Base
from models import UserCreate, UserLogin, UserRead, QuizSubmission

def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    password_hash = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 310_000)
    return f"pbkdf2_sha256$310000${salt.hex()}${password_hash.hex()}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        algorithm, iterations, salt_hex, hash_hex = hashed_password.split("$", 3)
        if algorithm != "pbkdf2_sha256":
            return False
        password_hash = hashlib.pbkdf2_hmac(
            "sha256", plain_password.encode(), bytes.fromhex(salt_hex), int(iterations)
        )
        return hmac.compare_digest(password_hash.hex(), hash_hex)
    except (ValueError, TypeError):
        return False

app = FastAPI()
#Run uvicorn main:app --reload --port 8000 in /backend to run the server in dev, separate from frontend

origins = [
    "http://localhost:5173",
    "http://localhost:8000",
    "https://tracksaas.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# ---- API routes ----
@app.post("/api/signup", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def signupUser(user: UserCreate, db: Session = Depends(get_db)):
    username = user.username.strip().lower()
    existingUser = db.query(Users).filter(Users.username == username).first()
    hashedPassword = hash_password(user.password)

    if existingUser:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    
    newUser = Users(username=username, passwordHash=hashedPassword)
    db.add(newUser)
    db.commit()
    db.refresh(newUser)
    return newUser

@app.post("/api/login", response_model=UserRead, status_code=status.HTTP_200_OK)
def loginUser(user: UserLogin, db: Session = Depends(get_db)):
    username = user.username.strip().lower()
    existingUser = db.query(Users).filter(Users.username == username).first()

    if not existingUser or not verify_password(user.password, existingUser.passwordHash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    return existingUser

@app.post("/api/quiz")
def create_quiz_entry(submission: QuizSubmission, db: Session = Depends(get_db)):
    existing_quiz = db.query(Quiz).filter(Quiz.user_id == submission.user_id).first()
    if existing_quiz:
        existing_quiz.selected_answers = submission.answers
        db.commit()
        db.refresh(existing_quiz)
        
        return {
            "message": "Quiz saved successfully",
            "quiz_id": existing_quiz.id,
            "saved_answers": existing_quiz.selected_answers
        }
    else:
        new_quiz = Quiz(
            user_id=submission.user_id,
            selected_answers=submission.answers
        )

        db.add(new_quiz)
        db.commit()
        db.refresh(new_quiz)

        return {
            "message": "Quiz saved successfully",
            "quiz_id": new_quiz.id,
            "saved_answers": new_quiz.selected_answers
        }

# ---- mount frontend ----
static_dir = "static"
if os.path.isdir(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")