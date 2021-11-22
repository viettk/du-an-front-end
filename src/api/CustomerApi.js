import axiosClient from "./axiosClient";

const CustomerApi = {

    getAll:(params)=>{
        const url = "/admin/customer";
        return axiosClient.get(url,{params});
    },
    putCustomer: (id) =>{
        const url = `/admin/customer/`+id;
        return axiosClient.put(url);
    }

}
export default CustomerApi;