import axiosClient from "./axiosClient";

const AddressApi = {
    getAddress: (id, email) =>{
        const url = '/all/dia-chi/' +id +'?email='+email;
        return axiosClient.get(url);
    },

    xoadc: (id, email) =>{
        const url = '/dia-chi/'+id+'?email='+email;
        return axiosClient.delete(url);
    },

    getAddress: (id) =>{
        const url = `/dia-chi/all/${id}`;
        return axiosClient.get(url);
    },

    getOnAddress: (id, email) =>{
        const url = '/dia-chi/'+id+'?email='+email;
        return axiosClient.get(url);
    },

    postAdress: (detail, email) =>{
        const url = '/dia-chi?email='+email;
        return axiosClient.post(url, detail);
    },

    putAddress: (id, email, detail) =>{
        const url = '/dia-chi/'+id +'?email='+email ;
        return axiosClient.put(url, detail)
    },

    getAddressStatus: (id, email) =>{
        const url = '/dia-chi/mac-dinh?customerId=' +id+'?email='+email;
        return axiosClient.get(url);
    },
}
export default AddressApi;