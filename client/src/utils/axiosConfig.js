import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://tirriasolflores.com/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const imageInstance = axios.create({
    baseURL: 'http://tirriasolflores.com/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

