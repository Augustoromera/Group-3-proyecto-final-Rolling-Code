import axios from 'axios';

const pruebaApi = axios.create({
    baseURL: 'https://rc-grupo3-backend.onrender.com',
});

export default pruebaApi;
