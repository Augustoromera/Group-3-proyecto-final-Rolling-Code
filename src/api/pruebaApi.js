import axios from 'axios';

const pruebaApi = axios.create({
    baseURL: 'https://backendrapiburgers.up.railway.app/',
});

export default pruebaApi;
