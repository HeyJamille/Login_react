import { React, useState } from 'react';

// assets
import image from '../assets/help-desk.png'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (    
    <article class="flex justify-center align-center bg-slate-300 h-screen">
      <form class="flex flex-col self-center gap-5 p-[5%] md:bg-white md:rounded-2xl md:p-[2%] md:h-[500px] md:w-[400px] ">
        <img class="md:h-[200px]" src={image} alt="person help-desk"/>

        <div class="flex flex-col">
          <label htmlFor="name">Nome:</label>
          <input 
            class="h-[40px] pl-2 focus:outline-none border-[0.2px] border-gray-300 rounded-md" 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Digite seu nome" />
        </div>

        <div class="flex flex-col">
          <label htmlFor="password">Senha:</label>
          <input 
            class="h-[40px] pl-2 focus:outline-none border-[0.2px] border-gray-300 rounded-md"  
            type={showPassword ? 'text' : 'password'} 
            id="password" 
            name="password" 
            placeholder="Digite sua senha" />
        </div>

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
          class="h-[40px] w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer" 
          type="submit" 
          value="Enviar"
        />
      </form>
    </article>
  );
}

export default Login;
