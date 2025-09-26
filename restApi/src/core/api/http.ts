import axios from 'axios';

// Configuração da instância do Axios
export const http = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',  // API real
});
