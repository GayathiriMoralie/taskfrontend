import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ManagerDashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const role = sessionStorage.getItem('role');

    if (!token || role !== 'manager') {
      // Redirect to login page if user is not logged in or doesn't have manager role
      router.push('/login');
    } else {
      // Fetch manager data from API
      axios
        .get('/api/manager-data', { headers: { Authorization: `Bearer ${token}` } }) // Example API call
        .then((response) => {
          setUserData(response.data); // Assume the API returns manager data
        })
        .catch((err) => {
          setError('Failed to fetch manager data.');
          console.error('Error fetching manager data:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router]);

  if (loading) {
    return <p>Loading...</p>; // Loading state while data is being fetched
  }

  if (error) {
    return <p>{error}</p>; // Display error message if fetching data fails
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
      {userData ? (
        <div>
          <p>Welcome, {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Add additional manager dashboard content here */}
        </div>
      ) : (
        <p>No manager data found.</p> // Handling case where no data is returned
      )}
    </div>
  );
};

export default ManagerDashboard;
