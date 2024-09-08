import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { AuthContext } from './AuthContext';

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({ username: '', password: '' });
  const { saveToken } = useContext(AuthContext)!;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      });

      if (!response.ok) {
        throw new Error('Error logging in');
      }

      const result = await response.json();
      alert(result);
      saveToken(result.token);
      alert('Login successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="username" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
