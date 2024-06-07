import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const PrivateRoutes = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoutes;
