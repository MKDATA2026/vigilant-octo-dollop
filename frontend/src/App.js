import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DataPage from './pages/DataPage';
import WalletPage from './pages/WalletPage';
import TransactionsPage from './pages/TransactionsPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider, useAuth } from './services/authService';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/buy-data" element={<PrivateRoute><DataPage /></PrivateRoute>} />
          <Route path="/wallet" element={<PrivateRoute><WalletPage /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><TransactionsPage /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
