
import axios from 'axios';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import CookieService from '../cookie/CookieService';

const token = CookieService.getCookie('token');
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    paramsSerializer: params => queryString.stringify(params),
});

// axiosClient.interceptors.request.use(async (config) => {
//     config.headers.Authorization = 'Bearer '+localStorage.getItem('token');
//     return config;
// });

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
// if(error.response.status===403){
//     CookieService.removeCookie();
//     window.location.replace('http://localhost:3000/login')
//   } 
    throw error;
});

export default axiosClient;