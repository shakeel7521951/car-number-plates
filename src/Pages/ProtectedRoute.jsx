import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { profile } = useSelector((state) => state.user);
  // const navigate = useNavigate();
  console.log('User role:', profile?.role);
  console.log('Allowed roles:', allowedRoles);
  if (allowedRoles.includes(profile?.role)) {
    return children;
  }

  // return navigate(-1);
};

export default ProtectedRoute;
