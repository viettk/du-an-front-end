import axiosClient from "./axiosClient";

const CategoryApi = {
    getAll : (params) => {
        const url = "/danh-muc";
        return axiosClient.get(url, { params });
    },

    getIdCategory: (id) =>{
        const url = "/danh-muc/" + id;
        return axiosClient.get(url, {id});
    },

    getParent: () => {
        const url = "/danh-muc/cha";
        return axiosClient.get(url);
    },

    postDm: (params) =>{
        const url = "/danh-muc";
        return axiosClient.post(url, {params});
    },

    putDm: (id, params) =>{
        const url = `/danh-muc/${id}`;
        return axiosClient.put(url, {params});
    }
}
export default CategoryApi;