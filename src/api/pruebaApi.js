import axios from 'axios';

const pruebaApi = axios.create({
    baseURL: 'https://backendrapuburgers.up.railway.app',
});

export default pruebaApi;
