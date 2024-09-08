import React, { useState, useEffect } from 'react';

interface Book {
  id: number;
  name: string;
  description: string;
  date_of_publication: string;
  picture: string; 
  book_file: string;
  stars: number;
  Responce_id: number;
}

const Katalog: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/books?limit=5');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data: Book[] = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      }
    };

    fetchBooks();
  }, []);

  if (error) return <div>{error}</div>;
  if (books.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <h2>Katalog</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <h3>{book.name}</h3>
            <p>{book.description}</p>
            <p>Published on: {book.date_of_publication}</p>
            {book.picture && (
              <img
                src={`data:image/png;base64,${book.picture}`}
                alt={book.name}
                style={{ width: '100px', height: 'auto' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Katalog;
