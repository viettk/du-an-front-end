import axiosClient from "./axiosClient";

const FavoriteApi = {
    getOne: (id, prid) =>{
        const url = '/yeu-thich/san-pham-yeu-thich?id='+ id + '&product_id=' + prid;
        return axiosClient.get(url);
    },

    postYeuthich: (yt)=>{
        const url = '/yeu-thich';
        return axiosClient.post(url, yt);
    },

    deleteYeuthich: (yt)=>{
        const url = '/yeu-thich/y';
        return axiosClient.post(url, yt);
    },

    goiYsanPham: (priceProduct)=>{
        const url = '/detail/goi-y?priceProduct='+priceProduct;
        return axiosClient.get(url);
    }
    
}
export default FavoriteApi;