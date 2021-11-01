import axiosClient from "./axiosClient";

const StaffApi = {
    getAll : (params) => {
        const url = "/staff";
        return axiosClient.get(url, { params });
    },
    getById : (id) => {
        const url = `/staff/${id}`;
        return axiosClient.get(url);
    },
    createAccount : () => {
        const url = "/staff";
        return axiosClient.post(url);
    },
    updateAccount : (params, id) => {
        const url = `/staff/${id}`;
        return axiosClient.put(url, { params });
    },
    deleteAccount : (params) => {
        const url = `/staff/${id}`;
        return axiosClient.delete(url);
    },
}
export default StaffApi;