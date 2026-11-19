import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute = ({ allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          Verifying security credentials...
        </div>
      </div>
    );
  }

  // If not logged in or role doesn't match, redirect to login
  if (!user || (allowedRole && user.role !== allowedRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
