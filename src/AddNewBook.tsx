import React, { useState } from 'react';

interface ApiResponse<T> {
    message: string;
    book?: T;
}

interface Book {
    id: number;
    name: string;
    description: string;
    date_of_publication: string;
    picture?: string;
    book_file?: string;
}

const AddNewBook: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dateOfPublication, setDateOfPublication] = useState<string>('');
  const [picture, setPicture] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('date_of_publication', dateOfPublication);
    if (picture) {
      formData.append('picture', picture);
    }
    if (bookFile) {
      formData.append('book_file', bookFile);
    }

    try {
      const response = await fetch('http://localhost:8000/api/add_book', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.detail || 'An error occurred');
      }

      const data: ApiResponse<Book> = await response.json();
      setMessage(`${data.message}: ${data.book?.name} added successfully`);
    } catch (error: any) {
      setMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Book Name"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Book Description"
        />
        <input
          type="date"
          value={dateOfPublication}
          onChange={(e) => setDateOfPublication(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setPicture)}
          accept="image/*"
        />
        <input
          type="file"
          onChange={(e) => handleFileChange(e, setBookFile)}
        />
        <button type="submit">Add Book</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddNewBook;
