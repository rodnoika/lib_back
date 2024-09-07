from fastapi import Depends, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from .Basic.token_manipulations import check_and_get_current_user, get_db
from .Basic.models import User

friend_actions_routes = APIRouter()

@friend_actions_routes.get("/api/social/friends")
def show_friends(current_user: User = Depends(check_and_get_current_user)):
    db = next(get_db())
    if not current_user.friend_ids:
        return {"friends": []}
    friend_ids = [int(friend_id) for friend_id in current_user.friend_ids.split(" ")]

    friends = db.query(User).filter(User.id.in_(friend_ids)).all()
    friends_list = [{"id": friend.id, "name": friend.name, "surname": friend.surname} for friend in friends]

    return {"friends": friends_list}


@friend_actions_routes.post("/api/social/friends/add")
def add_friend(friend_id: int, current_user: User = Depends(check_and_get_current_user), db: Session = Depends(get_db)):
    friend = db.query(User).filter(User.id == friend_id).first()
    if not friend:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Friend not found")
    if str(friend_id) in current_user.friend_ids.split(" "):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is already a friend")
    if current_user.friend_ids:
        current_user.friend_ids += f",{friend_id}"
    else:
        current_user.friend_ids = str(friend_id)
    db.commit()
    db.refresh(current_user)

    return {"detail": "Friend added successfully"}

@friend_actions_routes.post("/api/social/friends/remove")
def remove_friend(friend_id: int, current_user: User = Depends(check_and_get_current_user), db: Session = Depends(get_db)):
    friend = db.query(User).filter(User.id == friend_id).first()
    if not friend:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Friend not found")
    if str(friend_id) not in current_user.friend_ids.split(" "):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User is not a friend")
    friend_ids_list = current_user.friend_ids.split(" ")
    friend_ids_list.remove(str(friend_id))
    current_user.friend_ids = " ".join(friend_ids_list)
    db.commit()
    db.refresh(current_user)
    return {"detail": "Friend removed successfully"}