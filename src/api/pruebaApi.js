import axios from 'axios';

const pruebaApi = axios.create({
    baseURL: 'http://localhost:4008',
});

export default pruebaApi;
