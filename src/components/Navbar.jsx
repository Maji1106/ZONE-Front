import React from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import { useAuthContext } from '../contexts/auth.context';

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <div className="navbar bg-gray-800 text-white shadow-lg p-4">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold hover:text-gray-300 transition">Zone Checker</Link>
      </div>
      <div className="flex items-center ml-auto">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-lg">Welcome, <span className="font-semibold">{user.username}</span></span>
            {user.roles && user.roles.length > 0 ? (
              <div className="flex space-x-2">
                {user.roles.map((role, index) => (
                  <div key={index} className="badge badge-accent text-xs">{role}</div>
                ))}
              </div>
            ) : (
              <span className="text-sm text-gray-400">No roles available</span>
            )}
            <UserProfile />
            <Link to="/add-store" className="btn btn-outline btn-primary hover:bg-primary hover:text-white transition">Add Store</Link>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="btn btn-outline btn-accent hover:bg-accent hover:text-white transition">Login</Link>
            <Link to="/register" className="btn btn-outline btn-primary hover:bg-primary hover:text-white transition">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
