from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True)
    password_hash: Mapped[str]
    quiz: Mapped["Quiz | None"] = relationship(back_populates="owner")

class Quiz(Base):
    __tablename__ = "quizzes"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True)
    selected_answers: Mapped[list[int]] = mapped_column(ARRAY(Integer))
    owner: Mapped["User"] = relationship(back_populates="quiz")