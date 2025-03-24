
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Inject token from localStorage
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
