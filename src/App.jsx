// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Navbar /> {/* เพิ่ม Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* เพิ่มเส้นทางนี้เพื่อจัดการกรณีไม่มีเส้นทางตรงกัน */}
      </Routes>
    </Router>
  );
}

export default App;
