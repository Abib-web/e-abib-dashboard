import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:3000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.data.user);
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default Profile;
