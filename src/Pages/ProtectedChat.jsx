import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProtectedChat = ({ allowedRoles, children }) => {
  const { profile } = useSelector((state) => state.user);

  if (!profile) {
    return null;
  }

  if (allowedRoles.includes(profile?.role)) {
    return children;
  }

  toast.warn(`Only buyers can initiate chat.`);
  return <Navigate to='/login' replace />;
};

export default ProtectedChat;
