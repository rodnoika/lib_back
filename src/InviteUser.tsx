import React, { useState } from 'react';
import Cookies from 'js-cookie';

const InviteUserToClub: React.FC = () => {
  const [clubId, setClubId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleInviteUser = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:8000/api/social/clubs/invite_user', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ club_id: clubId, user_id: userId }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.detail);
      } else {
        throw new Error(data.detail);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <input type="number" placeholder="Club ID" onChange={(e) => setClubId(Number(e.target.value))} />
      <input type="number" placeholder="User ID" onChange={(e) => setUserId(Number(e.target.value))} />
      <button onClick={handleInviteUser}>Invite User</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default InviteUserToClub;
