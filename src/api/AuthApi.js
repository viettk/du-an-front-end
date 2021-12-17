import axiosClient from "./axiosClient";

const AuthApi = {
    changePW:(data)=>{
        const url = "/api/change-password";
        return axiosClient.post(url,data);
    },
    sendMail:(data)=>{
        const url = "/api/sendmail";
        return axiosClient.post(url,data);
    },
    logout:(data)=>{
        const url = "/api/logout";
        return axiosClient.put(url,data);
    }

}
export default AuthApi