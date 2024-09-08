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

      </Routes>
    </Router>
  );
};

export default Nav;
