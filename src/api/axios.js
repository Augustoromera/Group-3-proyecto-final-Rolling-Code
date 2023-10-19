import axios from 'axios';


const instance = axios.create({
    baseURL:'https://backendrapiburgers.up.railway.app/api',
    withCredentials:true,
})


export default instance;