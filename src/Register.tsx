import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  date_of_birth: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    email: '',
    password: '',
    date_of_birth: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error registering user');
      }

      const result = await response.json();
      alert('Registration successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="surname" placeholder="Surname" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="date" name="date_of_birth" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
