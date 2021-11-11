import axiosClient from "./axiosClient";

const AddressApi = {
    getAddress: (id) =>{
        const url = `/all/dia-chi/${id}`;
        return axiosClient.get(url);
    },
}
export default AddressApi;