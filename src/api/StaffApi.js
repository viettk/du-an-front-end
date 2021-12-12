import axiosClient from "./axiosClient";

const StaffApi = {
    getAll: (params) => {
        const url = "/admin/staff";
        return axiosClient.get(url, { params });
    },
    getById: (id) => {
        const url = `/admin/staff/${id}`;
        return axiosClient.get(url);
    },
    createAccount: (data) => {
        const url = "/admin/staff";
        return axiosClient.post(url, data);
    },
    updateAccount: (values) => {
        const url = `/admin/staff/${values.id}`;
        return axiosClient.put(url, values.data);
    },
    rePassword: (values) =>{
        const url = `/admin/staff/reset-password/${values.id}`;
        return axiosClient.put(url, values.data);
    }
}
export default StaffApi;