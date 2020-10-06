import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.85.24.32:3001/api',
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

export default api;