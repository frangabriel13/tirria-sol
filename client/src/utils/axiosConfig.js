import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const imageInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
