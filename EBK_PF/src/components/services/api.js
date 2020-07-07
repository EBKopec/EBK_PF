import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.11.224.50:3001/api',
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

export default api;