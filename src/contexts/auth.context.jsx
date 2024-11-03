import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const checkLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data using the token if needed
      setUser({ username: 'SampleUser' }); // ตัวอย่างการตั้งค่า user
    }
  };

  useEffect(() => {
    checkLogin(); // ตรวจสอบการล็อกอินเมื่อ mount
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, checkLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
