from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session
from database import engine, get_db, Base
from typing import List
import os
import models

class Fruit(BaseModel):
    name: str

class Fruits(BaseModel):
    fruits: List[Fruit]

app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost:5173"
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

@app.post("/fruits")
def add_fruit(fruit: Fruit, db: Session = Depends(get_db)):
    db_fruit = models.FruitDB(name=fruit.name)
    db.add(db_fruit)
    db.commit()
    db.refresh(db_fruit)
    return {"id": db_fruit.id, "name": db_fruit.name}

@app.get("/fruits")
def list_fruits(db: Session = Depends(get_db)):
    rows = db.scalars(select(models.FruitDB)).all()
    return {"fruits": [{"id": r.id, "name": r.name} for r in rows]}

# ---- mount frontend ----

static_dir = "static"
if os.path.isdir(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")