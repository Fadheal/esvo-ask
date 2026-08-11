import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AssessmentProvider } from './context/AssessmentContext';
import ClientPortal from './components/client/ClientPortal';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLoginPage from './components/admin/AdminLoginPage';

export default function App() {
  return (
    <AssessmentProvider>
      <BrowserRouter>
        <Routes>
          {/* Client Portal Route (No Navbar) */}
          <Route path="/" element={<ClientPortal />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Dashboard Protected Route (With Admin Sidebar) */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AssessmentProvider>
  );
}
