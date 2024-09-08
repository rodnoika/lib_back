import React, { useState } from 'react';
import Cookies from 'js-cookie';

const FriendActions: React.FC = () => {
  const [friendId, setFriendId] = useState<number | string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddFriend = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:8000/api/social/friends/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friend_id: friendId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessage('Friend added successfully');
      setError(null);
    } catch (error) {
      console.error('Error adding friend:', error);
      setError('Failed to add friend');
      setMessage(null);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:8000/api/social/friends/remove', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friend_id: friendId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessage('Friend removed successfully');
      setError(null);
    } catch (error) {
      console.error('Error removing friend:', error);
      setError('Failed to remove friend');
      setMessage(null);
    }
  };

  return (
    <div>
      <h1>Manage Friends</h1>
      <input
        type="number"
        value={friendId}
        onChange={(e) => setFriendId(e.target.value)}
        placeholder="Friend ID"
      />
      <button onClick={handleAddFriend}>Add Friend</button>
      <button onClick={handleRemoveFriend}>Remove Friend</button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FriendActions;
