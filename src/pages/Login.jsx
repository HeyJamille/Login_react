import React, { useState, useEffect } from 'react';
import image from '../assets/help-desk.png';
import { Api } from '../services/api';
import { useAuth } from '../context/Auth';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();  // Used to access authentication context

  // Function to show/hide password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to validate form
  const validate = () => {
    if (!email && !password) {
      setError('Por favor, insira um nome e uma senha');
      return false;
    } else if (!email) {
      setError('Por favor, insira um nome');
      return false;
    } else if (!password) {
      setError('Por favor, insira uma senha');
      return false;
    }

    setError('');
    return true;
  };

  // Function to handle form submission
  const handlesignIn = async (e) => {
    e.preventDefault();
  
    try {
      if (validate()) {
        const response = await Api.post('/session', { email, password });
        console.log(response.data);
        signIn(response.data); // Atualiza o estado de autenticação
      }
    } catch (err) {
      setError('E-mail ou senha incorretos. Tente novamente!');
      console.error(err);
    }
  };

  return (
    <article className="flex justify-center align-center bg-slate-300 h-screen">
      <form 
        className="flex flex-col self-center gap-2 p-[5%] md:bg-white md:rounded-2xl md:p-[2%] md:h-auto md:w-[400px]"
        onSubmit={handlesignIn}
      >
        <img className="md:h-[200px]" src={image} alt="person help-desk" />

        <div className="flex flex-col">
          <label className="mb-1" htmlFor="email">Nome:</label>
          <input 
            className={`h-[40px] pl-2 focus:outline-none border-[0.2px] border-gray-300 rounded-md ${!email && error ? 'border-red-500' : ''}`}
            type="text"
            id="email"
            name="email"
            placeholder="Digite seu nome"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1" htmlFor="password">Senha:</label>
          <input 
            className={`h-[40px] pl-2 focus:outline-none border-[0.2px] border-gray-300 rounded-md ${!password && error ? 'border-red-500' : ''}`}
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <span className="mb-2 text-red-500">{error}</span>

        <div>
          <input
            type="checkbox"
            id="show_password"
            name="show_password"
            onClick={togglePassword}
          />
          <label className="pl-2" htmlFor="show_password">Mostrar senha</label>
        </div>

        <input 
          className="mt-1 h-[40px] w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer"
          type="submit"
          value="Enviar"
        />
      </form>
    </article>
  );
}

export default Login;
