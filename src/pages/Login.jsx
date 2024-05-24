import React, { useState } from 'react';

// assets
import image from '../assets/help-desk.png'

const Login = () => {
  const [formValues, setFormValues] = useState({ name: '', password: '' });
  const [errors, setErrors] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  // Function to show/hide password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Function to validate form
  const validate = () => {
    if (!formValues.name && !formValues.password) {
      setErrors('Por favor, insira um nome e uma senha');
      return false;
    } else if (!formValues.name) {
      setErrors('Por favor, insira um nome');
      return false;
    } else if (!formValues.password) {
      setErrors('Por favor, insira uma senha');
      return false;
    }

    setErrors('');
    return true;
  };

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Login realizado com sucesso!');
    }
  };

  return (
    <article className="flex justify-center align-center bg-slate-300 h-screen">
      <form 
        className="flex flex-col self-center gap-2 p-[5%] md:bg-white md:rounded-2xl md:p-[2%] md:h-auto md:w-[400px]"
        onSubmit={handleLogin}
      >
        <img className="md:h-[200px]" src={image} alt="person help-desk" />

        <div className="flex flex-col">
          <label class="mb-1" htmlFor="name">Nome:</label>
          <input 
            className={`h-[40px] pl-2 focus:outline-none border-[0.2px] border-gray-300 rounded-md ${!formValues.name && errors ? 'border-red-500' : ''}`}
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label class="mb-1" htmlFor="password">Senha:</label>
          <input 
            className={`h-[40px] pl-2 focus:outline-none border-[0.2px] border-gray-300 rounded-md ${!formValues.password && errors ? 'border-red-500' : ''}`}
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>

        <span className="mb-2 text-red-500">{errors}</span>

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
