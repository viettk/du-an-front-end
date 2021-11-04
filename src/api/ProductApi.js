import axiosClient from "./axiosClient";

const CategoryApi = {
    getAll : (params, name,price, categoryId, create_date) => {
        const url = "/admin/san-pham?name=" + name+ "&categoryName="+categoryId;
        return axiosClient.get(url, { params });
    },

    getIdProduct: (id) =>{
        const url = "/admin/san-pham/" + id;
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