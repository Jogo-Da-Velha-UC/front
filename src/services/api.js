import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-java-production-006a.up.railway.app',
});

export default api;