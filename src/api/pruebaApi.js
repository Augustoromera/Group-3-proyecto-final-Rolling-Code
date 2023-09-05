import axios from 'axios';

const pruebaApi = axios.create({
    baseURL: 'http://localhost:6707',
});

export default pruebaApi;
