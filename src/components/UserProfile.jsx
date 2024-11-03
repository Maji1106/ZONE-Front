import React from 'react';
import { useAuthContext } from '../contexts/auth.context';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
