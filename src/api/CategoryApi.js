import axiosClient from "./axiosClient";

const CategoryApi = {
    getAll : (params, name, parent_name) => {
        const url = "/danh-muc?name=" + name+ "&parent_name="+parent_name;
        return axiosClient.get(url, { params });
    },

    getAllCate:()=>{
        const url = "/danh-muc/cha";
        return axiosClient.get(url);
    },

    getIdCategory: (id) =>{
        const url = `/danh-muc/${id}`;
        return axiosClient.get(url, {id});
    },

    getParent: () => {
        const url = "/danh-muc/cha";
        return axiosClient.get(url);
    },

    getkit: () => {
        const url = "/danh-muc/kit";
        return axiosClient.get(url);
    },

    postDm: (params) =>{
        const url = "/danh-muc";
        return axiosClient.post(url, {params});
    },

    putDm: (id, params) =>{
        const url = `/danh-muc/${id}`;
        return axiosClient.put(url, {params});
    },

    getCatebyParent: (name)=>{
        const url = `/danh-muc/timtheocha?parentName=`+ name;
        return axiosClient.get(url);
    },

    getListAll :(param)=>{
        const url = `/danh-muc/all/search`;
        return axiosClient.get(url, {param});
    }

}
export default CategoryApi;