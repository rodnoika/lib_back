import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Friend {
  id: number;
  name: string;
  surname: string;
}

const FriendsList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://localhost:8000/api/social/friends', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFriends(data.friends);
      } catch (error) {
        console.error('Error fetching friends:', error);
        setError('Failed to fetch friends');
      }
    };

    fetchFriends();
  }, []);

  if (error) return <div>{error}</div>;
  if (friends.length === 0) return <div>No friends found</div>;

  return (
    <div>
      <h1>Friends List</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.name} {friend.surname}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
