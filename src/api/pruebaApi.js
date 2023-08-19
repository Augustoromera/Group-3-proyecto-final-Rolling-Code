import axios from 'axios';

const pruebaApi = axios.create({
    baseURL: 'http://localhost:9090',
});

export default pruebaApi;
