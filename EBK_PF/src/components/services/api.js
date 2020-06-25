import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.11.224.135:3001/api'
});

export default api;