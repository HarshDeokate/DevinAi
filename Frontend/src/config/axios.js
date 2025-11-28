import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // always fresh
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;        