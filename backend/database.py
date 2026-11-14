from sqlalchemy.dialects.postgresql import ARRAY
import os
from dotenv import load_dotenv
from sqlalchemy import ForeignKey, Integer, String, create_engine
from sqlalchemy.orm import Mapped, mapped_column, relationship, sessionmaker, DeclarativeBase

load_dotenv()

print(os.getenv("DATABASE_URL"))
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set.")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False)

# classes
class Base(DeclarativeBase):
    pass

class Users(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    passwordHash: Mapped[str] = mapped_column(String(), nullable=False)
    quiz = relationship("Quiz", back_populates="owner", uselist=False)

class Quiz(Base):
    __tablename__ = "quizzes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    selected_answers = mapped_column(ARRAY(Integer), nullable=False)
    owner = relationship("Users", back_populates="quiz")

# session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()