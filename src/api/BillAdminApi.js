import axiosClient from "./axiosClient";

const BillAdminApi = {
    getAll : (params) => {
        const url = "/admin/bill";
        return axiosClient.get(url, { params });
    },
    getDone : (params) => {
        const url = "/bill/done";
        return axiosClient.get(url, { params });
    },
    getById : (id) => {
        const url = `/admin/bill/${id}`;
        return axiosClient.get(url);
    },
    updateStatusOrder : (id, data) => {
        const url = `/admin/bill/status-order/${id}`;
        return axiosClient.put(url, data);
    },
    getBillDetailByBill : (id, params) => {
        const url = `/admin/bill-detail/bill/${id}`;
        return axiosClient.get(url, { params });
    },
    getByStatus : (params) => {
        const url = "/admin/bill/by-status";
        return axiosClient.get(url, { params });
    },
    getByEmail : (email, params) => {
        const url = `/admin/bill/email/${email}`;
        return axiosClient.get(url, { params });
    },
    updateBillDetail : (id, data) => {
        const url = `/admin/bill-detail/${id}`;
        return axiosClient.put(url, data);
    },
    getByEmailPay : (email, params) => {
        const url = `/admin/bill/email-pay/${email}`;
        return axiosClient.get(url, { params });
    },
}
export default BillAdminApi;