import axiosClient from "./axiosClient";

const GiamgiaApi = {
    giamAll: (giamValue) =>{
        const url = '/home/giamgia?value=' + giamValue;
        return axiosClient.post(url);
    },

    giamTheoDanhMuc: (giamdm, iddm)=>{
        const url = '/home/giamgiabydm?value=' + giamdm + '&categoryId=' + iddm;
        return axiosClient.post(url);
    },

    giamTheoTungSP: (id, giamdm, iddm)=>{
        const url = '/home/giamgia/' + id + '?value=' + giamdm + '&categoryId=' + iddm ;
        return axiosClient.post(url);
    },

    laythongtin: (value) =>{
        const url = '/home/product?name='+ value;
        return axiosClient.get(url);
    },

    khoiphuc: ()=>{
        const url = '/home/giamgia';
        return axiosClient.put(url);
    }
    
}
export default GiamgiaApi;