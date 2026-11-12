import os
from dotenv import load_dotenv
from sqlalchemy import Integer, String, create_engine
from sqlalchemy.orm import Mapped, mapped_column, sessionmaker, DeclarativeBase

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



# session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()