import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import fetchClubs from './ClubServices';

const ClubList = () => {
  const [clubs, setClubs] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClubs = async () => {
      try {
        const data = await fetchClubs();
        console.log(data); 
        if (data && Array.isArray(data.clubs)) {
          setClubs(data.clubs);
        } else {
          console.error('Unexpected data structure:', data);
        }
      } catch (err) {
        setError('Failed to fetch clubs');
      }
    };

    loadClubs();
  }, []);

  if (error) return <div>{error}</div>;
  if (!clubs || clubs.length === 0) return <div>No clubs found</div>;

  return (
    <div>
      <h1>Club List</h1>
      <ul>
        {clubs.map((club) => (
          <li key={club.id}>
            <Link to={`/club-info/${club.id}`}>{club.name}</Link> {/* Wrap club name with Link */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClubList;
