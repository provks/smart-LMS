import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.NODE_ENV === 'prod' ? 'smart-lms-1ysdr.onrender.com' : 'http://localhost:3002'

})

export default api;