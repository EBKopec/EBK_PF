import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

export default api;