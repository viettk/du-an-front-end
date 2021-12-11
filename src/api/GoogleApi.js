import axiosClient from "./axiosClient";
const GoogleApi = {
    logout: (access_token)=>{
        let url = 'https://accounts.google.com/o/oauth2/revoke?token='+ access_token;
        return axiosClient.post(url);
    },
    login: (access_token)=>{
        let url = '/login-google';
        return axiosClient.post(url,access_token);
    }

}
export default GoogleApi;