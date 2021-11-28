import axiosClient from "./axiosClient";

const BillApi = {
    getBillCustomer: (params) =>{
        const url = `lich-su-mua-hang`;
        return axiosClient.get(url, {params});
    },

    getBillDetailCustomer: (id) =>{
        const url = `/lich-su-mua-hang/detail?id=` + id;
        return axiosClient.get(url);
    },

    dathang: (data) =>{
        const url = `/order/dat`;
        return axiosClient.post(url, data);
    },

    datDetail: (id, data) =>{
        const url = `order/detail/date/${id}`;
        return axiosClient.post(url, data);
    },

    dathangKhachLogin: (data) =>{
        const url = `/order/dat/`;
        return axiosClient.post(url, data);
    }
}
export default BillApi;