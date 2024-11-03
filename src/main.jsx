// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './routes/Router.jsx'; // ตรวจสอบการนำเข้าให้ถูกต้อง
import './index.css';
import { StoreProvider } from './contexts/store.context';
import { AuthProvider } from './contexts/auth.context';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider>
        <AppRouter />
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>
);
