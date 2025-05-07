import axios from 'axios';

// Base URL for your backend API
const API_URL = 'http://localhost:5001/api/auth'; // Update with your backend URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username: email, // Assuming 'email' as the username in your DB
      password,
    });
    
    if (response.data?.token) {
      return response.data; // return the token and role
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Error logging in, please try again');
  }
};
