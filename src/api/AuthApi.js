import axiosClient from "./axiosClient";

const AuthApi = {
    changePW:(data)=>{
        const url = "/api/change-password";
        return axiosClient.post(url,data);
    }
}
export default AuthApi