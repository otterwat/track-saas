from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from database import Base

class FruitDB(Base):
    __tablename__ = "fruits"   # the table's name in Postgres

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))