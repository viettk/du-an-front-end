import axiosClient from "./axiosClient";

const ProductApi = {
    getAll : (params, name,price, categoryName, create_date,status) => {
        const url = "/api/product?name=" + name+ "&categoryName="+categoryName +"&status="+status;
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
    },

    getFavorite: (id, params) =>{
        const url =  '/yeu-thich/1?known=up&field=id';
        return axiosClient.get(url, {params});
    },

    xoaFavorite: ( params) =>{
        const url =  '/yeu-thich';
        return axiosClient.delete(url, {params});
    },

    postProduct: (data) =>{
        const url = "/api/product/create";
        return axiosClient.post(url,data);
    },
    postImage: (id,data) =>{
        const url = `/api/product/insert/image/${id}`;
        return axiosClient.post(url,data);
    },
    putProduct: (data) =>{
        const url = "/api/product/update";
        return axiosClient.put(url,data);
    },
    putImage: (id,data) =>{
        const url = `/api/product/update/image/${id}`;
        return axiosClient.put(url,data);
    },
    hideProduct: (params)=>{
        const url = `/api/product/delete/${params}`;
        return axiosClient.delete(url);
    },
    putReturn : (id, params) => {
        const url = `/home/return/${id}`;
        return axiosClient.get(url, {params});
    },
}
export default ProductApi;