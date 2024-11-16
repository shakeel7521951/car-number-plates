import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { profile } = useSelector((state) => state.user);

  if (allowedRoles.includes(profile?.role)) {
    return children;
  }

  return <Navigate to='/' replace />;
};

export default ProtectedRoute;
