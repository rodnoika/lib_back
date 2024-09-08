import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
interface Book {
    id: number;
    title: string;
    author: string;
  }
  
  interface UserLibraryResponse {
    user_id: number;
    books: Book[];
  }
  
const UserLibrary: React.FC<{ userId: number }> = ({ userId }) => {
  const [library, setLibrary] = useState<UserLibraryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const token = Cookies.get('token'); 
        console.log('Token:', token);
    
        if (!token) {
          throw new Error('No token found');
        }
    
        const response = await fetch(`http://localhost:8000/api/get_user_library`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json', 
            },
          });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: UserLibraryResponse = await response.json();
        setLibrary(data);
      } catch (error: any) {
        setError(error.message || 'An error occurred');
      }
    };

    fetchLibrary();
  }, [userId]);

  return (
    <div>
      <h2>User Library</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {library ? (
        <div>
          <h3>Books</h3>
          <ul>
            {library.books.map((book) => (
              <li key={book.id}>
                {book.title} by {book.author}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserLibrary;
