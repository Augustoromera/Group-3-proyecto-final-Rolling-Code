import axios from 'axios';


const instance = axios.create({
    baseURL:'https://backendrapuburgers.up.railway.app/api',
    withCredentials:true,
})


export default instance;