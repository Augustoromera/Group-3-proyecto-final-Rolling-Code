import axios from './axios';

export const API = 'https://rc-grupo3-backend.onrender.com/api';

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);

let authToken = null;

export const setAuthToken = (token) => {
    authToken = token;
};
export const getAuthToken = () => {
    return authToken;
};

export const verifyTokenRequest = () => {
    if (!authToken) {  return Promise.reject(new Error("Token JWT no está presente"));
    }

    return axios.get('/verify', {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
};
