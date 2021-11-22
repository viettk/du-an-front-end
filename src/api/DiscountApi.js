import axiosClient from "./axiosClient";

const DiscountApi = {

    getAllDiscount:(params)=>{
        const url = "/admin/discount/";
        return axiosClient.get(url, {params});
    },

    getIdDiscount: (id) =>{
        const url = "/admin/discount/" + id;
        return axiosClient.get(url, {id});
    },


    postDiscount: (params) =>{
        const url = "/admin/discount";
        return axiosClient.post(url, {params});
    },

    putDiscount: (id, params) =>{
        const url = `/admin/discount/${id}`;
        return axiosClient.put(url, {params});
    }

}
export default DiscountApi;
