import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthContext } from '../contexts/auth.context';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthContext(); // ดึงฟังก์ชัน login จาก Context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        username,
        password,
      });
      console.log('Login successful', response.data);
      localStorage.setItem('token', response.data.accessToken); // เก็บ token ไว้ใน localStorage
      login(response.data); // เก็บข้อมูลผู้ใช้ใน Context
      Swal.fire({
        title: 'Login Successful',
        text: 'Welcome back!',
        icon: 'success',
      });
      navigate('/dashboard'); // เปลี่ยนเส้นทางไปที่หน้าแดชบอร์ด
    } catch (error) {
      setError(error.response?.data?.message || error.message); // เก็บข้อผิดพลาดไว้ใน state
      Swal.fire({
        title: 'Login Failed',
        text: error.response?.data?.message || error.message,
        icon: 'error',
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:text-blue-700 transition duration-200 text-sm"
          >
            Go to Register
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 transition duration-200 text-sm"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
