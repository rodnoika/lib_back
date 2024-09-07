from sqlalchemy import Column, Integer, String, Date, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.functions.Basic.database import Base

user_books = Table(
    'user_books', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('book_id', Integer, ForeignKey('books.id'))
)

user_clubs = Table(
    "user_clubs", Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('club_id', Integer, ForeignKey('clubs.id'))
)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    number = Column(Integer, unique=True, default=None)
    email = Column(String, unique=True)
    name = Column(String)
    surname = Column(String)
    date_of_birth = Column(String)
    password = Column(String)
    profile_picture = Column(String, default=None)
    friend_ids = Column(String, default=None)
    score = Column(Integer, default=0)
    books = relationship("Book", secondary=user_books, back_populates="users")
    clubs = relationship("Club", secondary=user_clubs, back_populates="users")

class Book(Base):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    text = Column(String)
    date_of_publication = Column(Date)
    picture = Column(String, default=None)
    stars = Column(Integer, default=0)
    Responce_id = Column(Integer, default=None)
    users = relationship("User", secondary=user_books, back_populates="books")



class Responses(Base):
    __tablename__ = 'responses'

    id = Column(Integer, primary_key=True, index=True)
    responcerId = Column(Integer)
    text = Column(String)
    date_of_responce = Column(Date)
    likes = Column(Integer)
    next_Responce_id = Column(Integer, default=None)

class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, index=True)
    author_id = Column(Integer)
    date = Column(Date)
    text = Column(String)
    next_Message = Column(Integer, default=None)


class Chat(Base):
    __tablename__ = 'chats'

    id = Column(Integer, primary_key=True, index=True)
    Contributors = Column(String)
    first_Message = Column(Integer)
    

class Club(Base):
    __tablename__ = 'clubs'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    users = relationship("User", secondary=user_clubs, back_populates="clubs")
    owner_id = Column(Integer)
    
class Quiz(Base):
    __tablename__ = 'quizzes'

    id = Column(Integer, primary_key=True, index=True)
    text_hash = Column(String, unique=True, index=True)
    questions = relationship("QuizQuestion", back_populates="quiz")

class QuizQuestion(Base):
    __tablename__ = 'quiz_questions'

    id = Column(Integer, primary_key=True, index=True)
    question_text = Column(String, nullable=False)
    correct_answer = Column(String, nullable=False)
    quiz_id = Column(Integer, ForeignKey('quizzes.id'))
    quiz = relationship("Quiz", back_populates="questions")
    answers = relationship("QuizAnswer", back_populates="question")

class QuizAnswer(Base):
    __tablename__ = 'quiz_answers'

    id = Column(Integer, primary_key=True, index=True)
    answer_text = Column(String, nullable=False)
    question_id = Column(Integer, ForeignKey('quiz_questions.id'))
    question = relationship("QuizQuestion", back_populates="answers")
