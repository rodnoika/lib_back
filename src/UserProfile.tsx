import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

interface UserProfileData {
  id: number;
  username: string;
  name: string;
  surname: string;
  date_of_birth: string;
  profile_picture?: string;
  score: number;
}

const UserProfile: React.FC = () => {
  const { token } = useContext(AuthContext)!;
  const [userData, setUserData] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }

        const result = await response.json();
        setUserData(result);
      } catch (error) {
        alert(error.message);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userData.name} {userData.surname}</h1>
      <p>Email: {userData.username}</p>
      <p>Date of Birth: {userData.date_of_birth}</p>
    </div>
  );
};

export default UserProfile;
