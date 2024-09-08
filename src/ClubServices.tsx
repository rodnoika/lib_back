import Cookies from 'js-cookie';

const fetchClubs = async () => {
  try {
    const token = Cookies.get('token'); 
    console.log('Token:', token);

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('http://localhost:8000/api/social/my-clubs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(`HTTP error! status: ${response.status} - ${errorData.detail}`);
    }

    const data = await response.json();
    console.log('Response data:', data); 
    return data; 
  } catch (error) {
    console.error('Error fetching clubs:', error.message);
    throw error;
  }
};

export default fetchClubs;
