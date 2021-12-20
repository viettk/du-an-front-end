import axiosClient from "./axiosClient";

const CustomerApi = {

    getAll:(params)=>{
        const url = "/admin/customer";
        return axiosClient.get(url,{params});
    },
    putCustomer: (id) =>{
        const url = `/admin/customer/`+id;
        return axiosClient.put(url);
    },

    getCustomer:(emailc)=>{
        const url = '/account/get-email?email=' + emailc;
        return axiosClient.get(url);
    },
    fillAll:(param)=>{
        const url = '/account/admin?email='+param.email+'&status='+param.status+'&known='+param.known+'&field='
        +param.field+'&name='+param.name+'&page='+param.page;
        return axiosClient.get(url);
    },
    hideCustomer:(id)=>{
        const url = '/account/admin/hide?id=' + id;
        return axiosClient.delete(url);
    },
    fillAllByBill:(params)=>{
        const url = '/account/admin/bybill';
        return axiosClient.get(url,{params});
    },
    fillAllID:(param)=>{
        const url = '/account/admin/list-id?email='+param.email+'&status='+param.status+'&name='+param.name;
        return axiosClient.get(url);
    },
    fillAllID_ByBill:(params)=>{
        const url = '/account/admin/list-id-bybill';
        return axiosClient.get(url,{params});
    },

}
export default CustomerApi;