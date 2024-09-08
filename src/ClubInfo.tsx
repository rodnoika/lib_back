// src/components/ClubInfo.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ClubInfo {
  id: number;
  name: string;
  description: string;
  isprivate: boolean;
  owner_id: number;
}

const ClubInfo: React.FC = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const [club, setClub] = useState<ClubInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubInfo = async () => {
      try {
        const token = Cookies.get('token'); 

        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`http://localhost:8000/api/social/club-info/${clubId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ClubInfo = await response.json();
        setClub(data);
      } catch (error) {
        console.error('Error fetching club info:', error);
        setError('Failed to fetch club info');
      }
    };

    fetchClubInfo();
  }, [clubId]);

  if (error) return <div>{error}</div>;
  if (!club) return <div>Loading...</div>;

  return (
    <div>
      <h1>{club.name}</h1>
      <p>{club.description}</p>
      <p>Private: {club.isprivate ? 'Yes' : 'No'}</p>
      <p>Owner ID: {club.owner_id}</p>
    </div>
  );
};

export default ClubInfo;
