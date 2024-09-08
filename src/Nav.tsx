// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import CreateClub from './CreateClub';
import ClubInfo from './ClubInfo';
import InviteUser from './InviteUser';
import FriendActions from './FriendActions';
import UserInfo from './UserInfo';
import ChangeClub from './ChangeClub';
import AcceptClubInvitation from './AcceptClubInvitation.';
import DeclineClubInvitation from './DeclineClubInvitation';
import DeleteClubInvitation from './DeleteClubInvitation';
import AddBookToLibrary from './AddBookToLibrary';
import RemoveFromLibrary from './RemoveFromLibrary';
import GetUserLibrary from './GetUserLibrary';
import CheckBookInLibrary from './CheckBookInLibrary';
import AddNewBook from './AddNewBook';
import Katalog from './Katalog';
const Nav: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-club" element={<CreateClub />} />
        <Route path="/club-info/:clubId" element={<ClubInfo />} />
        <Route path="/invite-user" element={<InviteUser />} />
        <Route path="/friends" element={<FriendActions />} />
        <Route path='/info/:userId' element={<UserInfo />} />
        <Route path="/change-club" element={<ChangeClub />} />
        <Route path="/accept-invitation" element={<AcceptClubInvitation />} />
        <Route path="/decline-invitation" element={<DeclineClubInvitation />} />
        <Route path="/delete-invitation" element={<DeleteClubInvitation />} />
        <Route path="/add-book-to-library" element={<AddBookToLibrary />} />
        <Route path="/remove-from-library" element={<RemoveFromLibrary />} />
        <Route path="/check-book-in-library" element={<CheckBookInLibrary />} />
        <Route path="/add-new-book" element={<AddNewBook />} />
        <Route path="/katalog" element={<Katalog/>}/>

      </Routes>
    </Router>
  );
};

export default Nav;
