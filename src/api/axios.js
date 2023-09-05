import axios from 'axios';


const instance = axios.create({
    baseURL:'http://localhost:6707/api',
    withCredentials:true,
})


export default instance;