import React, { useState } from 'react';
import image from '../assets/help-desk.png';
import { Api } from '../services/api';
import { useAuth } from '../context/Auth';
import SubmitButton from '../components/SubmitButton';

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
      setError('Por favor, insira um e-mail e uma senha');
      return false;
    } else if (!email) {
      setError('Por favor, insira um e-mail');
      return false;
    } else if (!password) {
      setError('Por favor, insira uma senha');
      return false;
    }

    setError('');
    return true;
  };

  const handleSignIn = async () => {
    try {
      if (validate()) {
        const response = await Api.post('/session', { email, password });
        const token = response.data.user;
        //console.log(token);
        signIn(token); 
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (err) {
      setError('E-mail ou senha incorretos. Tente novamente!');
      //console.error(err);
    }
  };
  

  return (
    <article className="flex justify-center align-center bg-slate-300 h-screen">
      <form 
        className="flex flex-col self-center gap-3 p-[5%] md:bg-white md:rounded-2xl md:p-[2%] md:h-auto md:w-[400px]"
      >
        <img className="h-[170px]" src={image} alt="person help-desk" />

        <div className="flex flex-col">
          <label className="mb-1" htmlFor="email">E-mail:</label>
          <input 
            className={`h-[40px] pl-2 focus:outline-none border-[0.2px] border-gray-300 rounded-md ${!email && error ? 'border-red-500' : ''}`}
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
            className={`h-[40px] pl-2 focus:outline-none border-[0.2px] border-gray-300 rounded-md ${!password && error ? 'border-red-500' : ''}`}
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <span className="text-red-500">{error}</span>

        <div>
          <input
            type="checkbox"
            id="show_password"
            name="show_password"
            onClick={togglePassword}
          />
          <label className="pl-2" htmlFor="show_password">Mostrar senha</label>
        </div>

        <SubmitButton onSubmit={handleSignIn} />
      </form>
    </article>
  );
}

export default Login;
