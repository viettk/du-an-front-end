import axiosClient from "./axiosClient";

const BillReturn = {
    getAll: (params) => {
        const url = "/admin/bill-return";
        console.log(params);
        return axiosClient.get(url, { params });
    },
    getStatus: (params) => {
        const url = `/admin/bill-return/status`;
        return axiosClient.get(url, { params });
    },
    createNew: (data) => {
        const url = `/admin/bill-return/`;
        return axiosClient.post(url, data);
    },
    update: (datas) => {
        const url = `/admin/bill-return/${datas.id}`;
        console.log(datas);
        return axiosClient.put(url, datas.data);
    },
    confirm: (id) => {
        const url = `/admin/bill-return-detail/detail/${id}`;
        return axiosClient.post(url);
    },
    undo: (id) => {
        const url = `/admin/bill-return/undo/${id}`;
        return axiosClient.post(url);
    },
    total: (id) => {
        const url = `/admin/bill-return/total/${id}`;
        return axiosClient.get(url);
    },

    //detail
    getDetail: (id) => {
        const url = `/admin/bill-return/detail/${id}`;
        return axiosClient.get(url);
    },
    createDetail: (data) => {
        const url = `/admin/bill-return/detail/`;
        return axiosClient.post(url, data);
    },
    confirmDetail: (datas) => {
        const url = `/admin/bill-return/detail-cf/${datas.id}`;
        return axiosClient.put(url, datas.data);
    },
}
export default BillReturn;