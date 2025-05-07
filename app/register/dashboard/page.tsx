'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './register.css'; // You can create this for custom styles

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    role: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
  
    const { username, role, password } = form;
  
    const validCredentials = {
      manager: { username: 'manager1', password: '54321' },
      user: { username: 'user1', password: '67890' },
      admin: { username: 'admin1', password: '12345' },
    };
  
    if (
      !validCredentials[role] ||
      validCredentials[role].username !== username ||
      validCredentials[role].password !== password
    ) {
      setError('Invalid combination of username, role, or password');
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.message || 'Registration failed');
  
      alert('Registered successfully!');
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    }
  };
  

  return (
    <div className="register-container">
      <h2>Register for Access</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <select name="role" required onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
