import axios from "axios";
import axiosClient from "./axiosClient";

const HomeApi = {
    getNew: () =>{
        const url = `/home/new-arrival`;
        return axiosClient.get(url);
    },

    getKit: () =>{
        const url = `/home/model-kit`;
        return axiosClient.get(url);
    },

    getStatic: () =>{
        const url = `/home/static-model`;
        return axiosClient.get(url);
    },

    getShf: () =>{
        const url = `/home/shf`;
        return axiosClient.get(url);
    },

    getDetail: (id) =>{
        const url = `/home/`+id;
        return axiosClient.get(url);
    },

    getProductByCategory:(id, params) =>{
        const url = `/home/category/`+id;
        return axiosClient.get(url, {params});
    },

    getProductByParentCate: (id, params) =>{
        const url = `/home/`+id;
        return axiosClient.get(url, {params});
    },

    getTop5: () =>{
        const url = "/home/top5sp";
        return axiosClient.get(url);
    },

    getProductByCategoryParent:(params) =>{
        const url = `/home/parentName`;
        return axiosClient.get(url, {params});
    },

}
export default HomeApi;