import axios from 'axios';

const pruebaApi = axios.create({
    baseURL: 'http://localhost:8080/',
});

export default pruebaApi;
