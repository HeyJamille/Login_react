import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      // Se houver um token, define o usuário como autenticado
      setUser({ token });
    }
  }, []);

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString(); // 864e5 é o número de milissegundos em um dia
    document.cookie = `${name}=${value};expires=${expires};path=/`;
  };
  
  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ')
      .map(cookie => cookie.split('='))
      .reduce((accumulated, [key, value]) => ({ ...accumulated, [key]: value }), {});
    return cookies[name] || null;
  };  

  const signIn = (userData) => {
    const { token } = userData;

    setUser({ token });
    setCookie('token', token, 30); // Define o cookie com o nome 'token' e expira em 30 dias
    navigate('/home');
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
