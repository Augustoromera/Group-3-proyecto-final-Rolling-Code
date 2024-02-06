import axios from 'axios';


const instance = axios.create({
    baseURL:'https://rc-grupo3-backend.onrender.com/api',
    withCredentials:true,
})


export default instance;