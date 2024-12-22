import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardLayout() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>

      <div className="flex pt-16"> {/* Add padding-top to account for fixed header */}
        {/* Fixed sidebar */}
        <div className="fixed left-0 top-16 bottom-0 w-64 overflow-y-auto bg-white shadow-sm">
          <Sidebar />
        </div>

        {/* Main content area with proper padding and scrolling */}
        <main className="flex-1 ml-64 p-6 min-h-[calc(100vh-4rem)] overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}