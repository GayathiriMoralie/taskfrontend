'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/details.module.css';

interface UserDetails {
  username: string;
  registered_at: string;
}

export default function AdminDetails() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);  // State to store user details (single user)
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';  // Ensure this is set correctly in .env.local
        const response = await fetch(`${apiUrl}/users/details`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        
        // Check if the data is an object and then store it in state
        if (data.username && data.registered_at) {
          setUserDetails(data);  // Store the fetched data in state
        } else {
          setError('User details not found.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to load user details');  // Set an error message in case of failure
      }
    };

    fetchUserDetails();
  }, []);  // The empty dependency array ensures this effect runs only once on component mount

  // Handle logout
  const handleLogout = () => {
    // You can also handle clearing cookies or local storage if necessary here
    alert('You have been logged out');
    router.push('/login');  // Redirect to login page
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login and Registration Details</h1>
      {error && <div className={styles.error}>{error}</div>}
      
      {userDetails ? (
        <table className={styles.detailsTable}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Registration Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userDetails.username}</td>
              <td>{userDetails.registered_at ? new Date(userDetails.registered_at).toLocaleString() : '—'}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className={styles.error}>No data available</div>
      )}
      
      {/* Logout Button */}
      <div className={styles.logoutButton}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
