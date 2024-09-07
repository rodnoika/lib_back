from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from .Basic.database import SessionLocal
from .Basic.models import User, Book
from .Basic.token_manipulations import check_and_get_current_user

Exchange_routes = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@Exchange_routes.post("/api/add_book_to_library")
def add_book_to_library(book_id: int, current_user: User = Depends(check_and_get_current_user), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    user.books.append(book)
    db.commit()
    return {"message": "Book added to user successfully"}

@Exchange_routes.post("/api/remove_from_library")
def remove_from_library(book_id: int, current_user: User = Depends(check_and_get_current_user), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    user.books.remove(book)
    db.commit()
    return {"message": "Book added to user successfully"}
    

@Exchange_routes.get("/api/get_user_library")
def get_user_library(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_books = user.books

    return {"user_id": user.id, "books": [{"id": Book.id, "title:": Book.name} for Book in user_books]}

