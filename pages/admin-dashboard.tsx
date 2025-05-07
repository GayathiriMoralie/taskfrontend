'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AdminDashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Use localStorage, not sessionStorage

    if (!token || role !== 'admin') {
      router.push('/login');
    } else {
      axios
        .get('http://localhost:5001/api/admin-data', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => {
          setError('Failed to fetch admin data!');
          console.error('Error fetching admin data:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {userData ? (
        <div className="bg-white shadow p-4 rounded-lg">
          <p className="text-lg">Welcome, <strong>{userData.name}</strong></p>
          <p>Email: {userData.email}</p>
          {/* Add more admin-related UI here */}
        </div>
      ) : (
        <p>No admin data found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
