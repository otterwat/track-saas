from security import hash_password, verify_password
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db

from models import User
from schemas import UserCreate, UserLogin, UserRead

router = APIRouter(prefix="/api", tags=["auth"])

@router.post("/signup", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def signupUser(user: UserCreate, db: Session = Depends(get_db)):
    username = user.username.strip().lower()
    existingUser = db.query(User).filter(User.username == username).first()
    hashedPassword = hash_password(user.password)

    if existingUser:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    
    newUser = User(username=username, password_hash=hashedPassword)
    db.add(newUser)
    db.commit()
    db.refresh(newUser)
    return newUser

@router.post("/login", response_model=UserRead, status_code=status.HTTP_200_OK)
def loginUser(user: UserLogin, db: Session = Depends(get_db)):
    username = user.username.strip().lower()
    existingUser = db.query(User).filter(User.username == username).first()

    if not existingUser or not verify_password(user.password, existingUser.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    return existingUser