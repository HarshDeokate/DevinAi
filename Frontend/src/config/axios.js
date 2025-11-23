import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    
});


export default instance;        