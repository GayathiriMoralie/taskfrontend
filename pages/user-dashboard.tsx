import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserDashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const role = sessionStorage.getItem('role');

    if (!token || role !== 'user') {
      router.push('/login');
    } else {
      // Simulate API call or replace with real one
      axios.get('/api/user-data', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setUserData(res.data))
      .catch(() => setError('Failed to fetch user data.'))
      .finally(() => setLoading(false));
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      {userData ? (
        <div>
          <p>Welcome, {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Add additional user dashboard content here */}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserDashboard;
