import axiosClient from "./axiosClient";

const CategoryApi = {
    getAll : (params) => {
        const url = "/danh-muc";
        return axiosClient.get(url, { params });
    },

    getParent: () => {
        const url = "/danh-muc/cha";
        return axiosClient.get(url);
    },

    postDm: (params) =>{
        const url = "/danh-muc";
        return axiosClient.post(url);
    },

    putDm: (params) =>{
        const url = "/danh-muc";
        return axiosClient.put(url,{params});
    }
}
export default CategoryApi;