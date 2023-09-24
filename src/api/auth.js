import axios from './axios';

export const API = 'http://backendrapuburgers.up.railway.app/api';

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const verifyTokenRequest = () => axios.get('/verify');