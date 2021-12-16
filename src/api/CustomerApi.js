import axiosClient from "./axiosClient";

const CustomerApi = {

    getAll:(params)=>{
        const url = "/admin/customer";
        return axiosClient.get(url,{params});
    },
    putCustomer: (id) =>{
        const url = `/admin/customer/`+id;
        return axiosClient.put(url);
    },

    getCustomer:(emailc)=>{
        const url = '/account/get-email?email=' + emailc;
        return axiosClient.get(url);
    }

}
export default CustomerApi;