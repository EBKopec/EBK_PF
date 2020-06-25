import axios from 'axios';


const api = axios.create(
    {baseURL: 'E:/Projetos/Portal/PF/EBK_PF/EBK_PF/src/components/pages/reports/billing/data.json'});

export default api;