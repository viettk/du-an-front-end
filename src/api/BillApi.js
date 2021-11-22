import axiosClient from "./axiosClient";

const BillApi = {
    getBillCustomer: (params) =>{
        const url = `lich-su-mua-hang`;
        return axiosClient.get(url, {params});
    },

    getBillDetailCustomer: (id) =>{
        const url = `/lich-su-mua-hang/detail?id=` + id;
        return axiosClient.get(url);
    }
}
export default BillApi;