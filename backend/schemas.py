from typing import List

from pydantic import BaseModel, ConfigDict, Field


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=8, max_length=50)


class UserLogin(BaseModel):
    username: str
    password: str


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str


class QuizRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    selected_answers: List[int]


class QuizSubmission(BaseModel):
    user_id: int
    answers: List[int]