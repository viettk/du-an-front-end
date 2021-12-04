import axiosClient from "./axiosClient";

const FavoriteApi = {
    getOne: (id, prid) =>{
        const url = '/yeu-thich/san-pham-yeu-thich?id='+ id + '&product_id=' + prid;
        return axiosClient.get(url);
    },

    postYeuthich: (data)=>{
        const url = '/yeu-thich';
        return axiosClient.post(url, data);
    },

    deleteYeuthich: (data) => {
        const url = '/yeu-thich';
        return axiosClient.delete(url, data);
    }
    
}
export default FavoriteApi;