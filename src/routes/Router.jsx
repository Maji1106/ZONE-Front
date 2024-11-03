import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AddStore from '../pages/AddStore';
import EditStore from '../pages/EditStore'; // เพิ่มการนำเข้า EditStore
import Navbar from '../components/Navbar';
import { useAuthContext } from '../contexts/auth.context';

const AppRouter = () => {
  const { user, checkLogin } = useAuthContext(); // ตรวจสอบการนำเข้า Context
  
  useEffect(() => {
    checkLogin(); // เรียกใช้ฟังก์ชันเพื่อตรวจสอบการล็อกอินเมื่อคอมโพเนนต์ถูก mount
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/add-store" element={user ? <AddStore /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={user ? <EditStore /> : <Navigate to="/login" />} /> {/* เพิ่มเส้นทางไปที่ EditStore */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
