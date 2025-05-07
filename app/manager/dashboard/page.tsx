'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/managerdashboard.module.css';

export default function ManagerDashboard() {
  const [greetingMessage, setGreetingMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Check if logged in as manager
    const fetchGreetingMessage = () => {
      // You can fetch greeting message from the backend if necessary
      setGreetingMessage('Welcome back, Manager!');
    };

    fetchGreetingMessage();
  }, []);

  // Handle logout
  const handleLogout = () => {
    alert('You have been logged out');
    router.push('/login');  // Redirect to login page
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.greeting}>{greetingMessage}</h1>
      <div className={styles.buttonContainer}>
        <button onClick={() => router.push('/manager/create-task')} className={styles.createTaskButton}>
          Create Task
        </button>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}
