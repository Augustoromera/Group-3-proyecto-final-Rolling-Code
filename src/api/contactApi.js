import axios from 'axios';

const contactApi = axios.create({
    baseURL: 'http://localhost:9090',
});

export default contactApi;