// src/components/UserInfo.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

interface UserInfo {
  id: number;
  name: string;
  surname: string;
  profile_picture: string;
  score: number;
}

const UserInfo: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchUserInfo = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`http://localhost:8000/api/person/user-info?user_id=${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          signal: abortController.signal, // Link the request to the abort controller
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: UserInfo = await response.json();
        setUser(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching user info:', error);
          setError('Failed to fetch user info');
        }
      }
    };

    fetchUserInfo();

    // Cleanup function to cancel fetch request if component unmounts
    return () => {
      abortController.abort();
    };
  }, [userId]);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name} {user.surname}</h1>
      <img 
        src={user.profile_picture || '/path/to/default/image.png'} 
        alt={`${user.name}'s profile`} 
      />
      <p>Score: {user.score}</p>
    </div>
  );
};

export default UserInfo;
