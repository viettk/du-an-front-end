import axiosClient from "./axiosClient";

const BillAdminApi = {
    getAll: (params) => {
        const url = "/admin/bill";
        return axiosClient.get(url, { params });
    },
    getById: (id) => {
        const url = `/admin/bill/${id}`;
        return axiosClient.get(url);
    },
    updateStatusOrder: (datas) => {
        const url = `/admin/bill/status-order/${datas.id}`;
        return axiosClient.put(url, datas.data);
    },
    updateStatusPay: (datas) => {
        const url = `/admin/bill/status-pay/${datas.id}`;
        return axiosClient.put(url, datas.data);
    },
    getBillDetailByBill: (props) => {
        const url = `/admin/bill-detail/bill/${props.id}?_filed=${props.param._field}&_known=${props.param._known}`;
        return axiosClient.get(url);
    },
    getByEmail: (email, params) => {
        const url = `/admin/bill/email/${email}`;
        return axiosClient.get(url, { params });
    },
    updateBillDetail: (datas) => {
        const url = `/admin/bill-detail/${datas.id}`;
        return axiosClient.put(url, datas.data);
    },
}
export default BillAdminApi;