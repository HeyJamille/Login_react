// Bibliotecas
import axios from 'axios';

// Cria uma instância do Axios com a baseURL especificada
export const Api = axios.create({
  baseURL: 'https://helpdeskapi.vercel.app',
});
