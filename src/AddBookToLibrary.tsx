import React, { useState } from 'react';
import Cookies from 'js-cookie'

interface ApiResponse<T> {
  message: string;
  data?: T;
}

const AddBookToLibrary: React.FC = () => {
  const [bookId, setBookId] = useState<number | ''>('');
  const [message, setMessage] = useState<string>('');
  const [token, setToken] = useState<string | null>(Cookies.get('token') || null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/add_book_to_library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ book_id: bookId }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.detail || 'An error occurred');
      }

      const data: ApiResponse<{}> = await response.json();
      setMessage(data.message);
    } catch (error: any) {
      setMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Add Book to Library</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={bookId}
          onChange={(e) => setBookId(Number(e.target.value))}
          placeholder="Book ID"
        />
        <button type="submit">Add Book</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddBookToLibrary;
