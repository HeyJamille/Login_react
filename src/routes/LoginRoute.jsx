import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const LoginRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/home" /> : children;
};

export default LoginRoute;
