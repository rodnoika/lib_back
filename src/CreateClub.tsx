import React, { useState } from 'react';
import Cookies from 'js-cookie';

const CreateClub: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const token = Cookies.get('token'); 
  
    try {
      const response = await fetch('http://localhost:8000/api/social/create-club', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          name,
          description,
          is_private: isPrivate,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Club created successfully:', data);
    } catch (error) {
      console.error('Error creating club:', error);
    }
  };
  

  return (
    <div>
      <h1>Create Club</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>
            <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
            Private
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateClub;
