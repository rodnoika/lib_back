from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse, PlainTextResponse
from sqlalchemy.orm import Session
from .Basic.token_manipulations import check_and_get_current_user, create_access_token, get_db
from pydantic import BaseModel
from .Basic.models import User

autorization_router = APIRouter()

class RegistrationResponse(BaseModel):
    success: bool

class UserCreate(BaseModel):
    name: str
    surname: str
    password: str
    email:str
    date_of_birth : str

class UserInDB(BaseModel):
    id: int
    username: str
    name: str
    surname: str
    date_of_birth: str
    profile_picture: str = None
    score: int

@autorization_router.post("/api/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already registered")
    

    db_user = User(name=user.name, surname=user.surname, date_of_birth=user.date_of_birth, password=user.password,)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return RegistrationResponse(success=True)

@autorization_router.post("/api/login", response_model=str) 
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = next(get_db())
    db_user = db.query(User).filter((User.email == form_data.email)).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="no such email has registered")
    if db_user.password != form_data.password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="password is not correct")
    token = create_access_token({"id":db_user.id})
    return {"token": token, "token_type": "bearer"}

@autorization_router.get("/api/user/me", response_model=UserInDB)
def get_current_user(current_user: User = Depends(check_and_get_current_user)):
    return current_user

