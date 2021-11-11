import axiosClient from "./axiosClient";

const CategoryApi = {
    getCart: (params) =>{
        const url = `/cart/${params}`;
        return axiosClient.get(url);
    },

    getCartDetail:(cartId) =>{
        const url = "/cart-detail"+"?cartId="+cartId ;
        return axiosClient.get(url);
    },

    getOne: (id) => {
        const url = "/cart-detail/"+ id;
        return axiosClient.get(url, {id});
    },

    postDm: (params) =>{
        const url = "/danh-muc";
        return axiosClient.post(url, {params});
    },

    putDm: (id, params) =>{
        const url = `/danh-muc/${id}`;
        return axiosClient.put(url, {params});
    },

    getAddress: (id) =>{
        const url = `/dia-chi/all/${id}`;
        return axiosClient.get(url);
    },

    getOnAddress: (id) =>{
        const url = `/dia-chi/${id}`;
        return axiosClient.get(url);
    }
}
export default CategoryApi;