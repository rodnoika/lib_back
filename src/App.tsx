import React from 'react';
import { AuthProvider } from './AuthContext';
import Register from './Register';
import Login from './Login';
import UserProfile from './UserProfile';
import ClubList from './ClubList';
import FriendsList from './FriendsList';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div>
        <h1>Authentication App</h1>
        <Register />
        <Login />
        <UserProfile />
        <ClubList/>
        <FriendsList/>
      </div>
    </AuthProvider>
  );
}

export default App;
