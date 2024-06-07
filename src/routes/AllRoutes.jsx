import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/Auth';
import Home from '../pages/Home';
import Login from '../pages/Login';
import LoginRoute from './LoginRoute';
import PrivateRoute from '../routes/PrivateRoutes';

const AllRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<LoginRoute> <Login/> </LoginRoute>} />
        <Route path="/home" element={<PrivateRoute> <Home/> </PrivateRoute>} />
        {/* Adicione outras rotas protegidas aqui */} 
      </Routes>
    </AuthProvider>
  );
};

export default AllRoutes;