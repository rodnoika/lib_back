import React, { useState } from 'react';
import Cookies from 'js-cookie';

const ChangeClub: React.FC = () => {
  const [clubId, setClubId] = useState<number | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [isPrivate, setIsPrivate] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleChangeClub = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:8000/api/social/clubs/change', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ club_id: clubId, description, isprivate: isPrivate }),
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
      <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <label>
        Private:
        <input type="checkbox" onChange={(e) => setIsPrivate(e.target.checked)} />
      </label>
      <button onClick={handleChangeClub}>Change Club</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangeClub;
