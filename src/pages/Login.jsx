import React, { useState } from 'react';
import image from '../assets/help-desk.png';
import { Api } from '../services/api';
import { useAuth } from '../context/Auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();  // Usado para acessar o contexto de autenticação

  // Função para mostrar/ocultar senha
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Função para validar email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Função para validar senha
  const validatePassword = (password) => {
    return password.length >= 9;
  };

  // Função para validar formulário
  const validate = () => {
    if (!email && !password) {
      setError('Por favor, insira um e-mail e uma senha.');
      return false;
    } else if (!email) {
      setError('Por favor, insira um e-mail.');
      return false;
    } else if (!password) {
      setError('Por favor, insira uma senha.');
      return false;
    } else if (!validateEmail(email)) {
      setError('Formato de e-mail inválido.');
      return false;
    } else if (!validatePassword(password)) {
      setError('A senha deve ter no mínimo 9 caracteres.');
      return false;
    }

    setError('');
    return true;
  };

  // Função para lidar com envio do formulário
  const handleSignIn = async (e) => {
    e.preventDefault();
  
    if (validate()) {
      try {
        const response = await Api.post('/session', { email, password });
        console.log(response.data);
        signIn(response.data); // Atualiza o estado de autenticação
      } catch (err) {
        setError('E-mail ou senha incorreta. Tente novamente!');
        console.error(err);
      }
    }
  };

  return (
    <article className="flex justify-center align-center bg-slate-300 h-screen">
      <form 
        className="flex flex-col self-center gap-2 p-[5%] md:bg-white md:rounded-2xl md:p-[2%] md:h-auto md:w-[400px]"
        onSubmit={handleSignIn}
      >
        <img className="md:h-[200px]" src={image} alt="person help-desk" />

        <div className="flex flex-col">
          <label className="mb-1" htmlFor="email">E-mail:</label>
          <input 
            className={`h-[40px] pl-2 focus:outline-none border-[0.2px] border-gray-300 rounded-md ${(!email && error.includes('e-mail')) || (error && !validateEmail(email)) ? 'border-red-500' : ''}`}
            type="text"
            id="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1" htmlFor="password">Senha:</label>
          <input 
            className={`h-[40px] pl-2 focus:outline-none border-[0.2px] border-gray-300 rounded-md ${(!password && error.includes('senha')) || (error && !validatePassword(password)) ? 'border-red-500' : ''}`}
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <span className="text-red-500">{error}</span>}

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
