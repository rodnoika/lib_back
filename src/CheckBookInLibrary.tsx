import React, { useState } from 'react';
import axios from 'axios';

const CheckBookInLibrary: React.FC = () => {
  const [userId, setUserId] = useState<number | ''>('');
  const [bookId, setBookId] = useState<number | ''>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get<ApiResponse<{}>>('/api/check_book_in_library', { params: { user_id: userId, book_id: bookId } });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response.data.detail || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Check Book in Library</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          placeholder="User ID"
        />
        <input
          type="number"
          value={bookId}
          onChange={(e) => setBookId(Number(e.target.value))}
          placeholder="Book ID"
        />
        <button type="submit">Check</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CheckBookInLibrary;
