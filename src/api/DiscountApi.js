import axiosClient from "./axiosClient";

const DiscountApi = {

    getAllDiscount:(params)=>{
        const url = "/api/discount/";
        return axiosClient.get(url, {params});
    },

    getIdDiscount: (id) =>{
        const url = "/api/discount/" + id;
        return axiosClient.get(url, {id});
    },


    postDiscount: (params) =>{
        const url = "/api/discount";
        return axiosClient.post(url, params);
    },

    putDiscount: (id, params) =>{
        const url = `/api/discount/${id}`;
        return axiosClient.put(url, params);
    }

}
export default DiscountApi;
