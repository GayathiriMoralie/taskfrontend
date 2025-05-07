'use client';

import { useRouter } from 'next/navigation';

import styles from '../styles/home.module.css'; // Adjust based on your folder structure

export default function HomePage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TASK MANAGER</h1>
      <p className={styles.description}>Welcome to our page. Simplify your work with this task manager.</p>
      <p className={styles.description}>Click the button below to see what's inside.</p>
      <button className={styles.getStartedButton} onClick={() => router.push('/login')}>
        Get Started
      </button>
    </div>
  );
}
