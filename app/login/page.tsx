'use client';

import React, { useState } from 'react';
import styles from '../../styles/login.module.css'; // Corrected the import for CSS module
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // You can integrate your authentication logic here (e.g., check username and password against your backend)
    if (role && username && password) {
      // For simplicity, we're assuming any username and password combination for each role
      // You can replace this with real authentication logic
      localStorage.setItem('role', role); // Save role in localStorage
      if (role === 'admin') router.push('/admin/dashboard');
      else if (role === 'manager') router.push('/manager/dashboard');
      else router.push('/user/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login Page</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={styles.select}
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.submitBtn}>
          Login
        </button>
      </form>
      <p className={styles.registerPrompt}>
        New user? Don’t worry! Click below to register.
      </p>
      <button onClick={() => router.push('/register/dashboard')} className={styles.registerBtn}>
        Register
      </button>
    </div>
  );
}
