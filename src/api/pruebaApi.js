import axios from 'axios';

const pruebaApi = axios.create({
    baseURL: 'http://backendrapuburgers.up.railway.app',
});

export default pruebaApi;
