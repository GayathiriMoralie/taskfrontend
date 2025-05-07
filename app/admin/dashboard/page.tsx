'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/admindashboard.module.css';

export default function AdminDashboard() {
  const router = useRouter();

  // Simulate authentication check (replace with real logic)
  const isAuthenticated = true;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="bg-black text-white min-h-screen"> {/* Ensure full screen black background */}
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Welcome to the Admin of this Task Manager</h1>
          <p className={styles.subtitle}>
            Click the button below to see the details of login and registration person details.
          </p>

          <button
            className={styles.clickMeButton}
            onClick={() => router.push('/admin/details')}
          >
            Click Me
          </button>
        </div>
      </div>
    </div>
  );
}
