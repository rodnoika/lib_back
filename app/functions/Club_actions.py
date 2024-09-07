from fastapi import Depends, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from .Basic.token_manipulations import check_and_get_current_user, get_db
from .Basic.models import User, Club

club_actions_routes = APIRouter()

# I am not sure if it works  -antilopa
@club_actions_routes.get("/api/my-clubs")
def show_clubs(current_user: User = Depends(check_and_get_current_user)):
    club_list = [(club.id, club.name, club.users) for club in current_user.clubs]
    if len(club_list) == 0:
        return {"clubs": []}
    else:
        return {"clubs": [club_list]}
    
@club_actions_routes.post("/api/create-club")
def create_club(name:str, current_user: User = Depends(check_and_get_current_user)):
    db = next(get_db)
    new_club = Club(name=name, owner_id=current_user.id, users=[])
    new_club.users.append(current_user.id)
    db.db.add(new_club)
    db.commit()
    db.refresh(new_club)

