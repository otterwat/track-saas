from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from database import get_db

from models import Quiz
from schemas import QuizRead, QuizSubmission


router = APIRouter(prefix="/api", tags=["quiz"])

@router.post("/quiz", response_model=QuizRead)
def save_quiz(submission: QuizSubmission, db: Session = Depends(get_db)):
    quiz = db.scalar(select(Quiz).where(Quiz.user_id == submission.user_id))

    if quiz:
        quiz.selected_answers = submission.answers
    else:
        quiz = Quiz(user_id=submission.user_id, selected_answers=submission.answers)
        db.add(quiz)

    db.commit()
    db.refresh(quiz)
    return quiz