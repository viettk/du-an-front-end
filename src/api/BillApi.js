import axiosClient from "./axiosClient";

const BillApi = {
    getBillCustomer: (params) =>{
        const url = `/lich-su-mua-hang`;
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

    dathangKhachLogin: (id, data)=>{
        const url = '/order/dat/'+id;
        return axiosClient.post(url, data);
    },

    datDetail: (id, data) =>{
        const url = `order/detail/date/${id}`;
        return axiosClient.post(url, data);
    },

    datHangKhachhangkoLogin: (id, data) =>{
        const url = `/order/detail/date/${id}`;
        return axiosClient.post(url, data);
    },

    getMahoadonThanhCong:(id)=>{
        const url = '/order/dathangthanhcong/'+id;
        return axiosClient.get(url);
    },

    getListBillDetailthanhcong:(id)=>{
        const url = '/hoa-don-chi-tiet-thanh-cong/'+id;
        return axiosClient.get(url);
    },

    getTongCanNang:(id)=>{
        const url = '/order/tongcannag/' + id;
        return axiosClient.get(url);
    },

    getTongTotalSp:(id)=>{
        const url = '/order/tongtienhang/'+id;
        return axiosClient.get(url);
    },

    changeStatus_pay:(id, input)=>{
        const url = '/order/changeStatus_pay/'+id+'?status_pay='+input;
        return axiosClient.put(url);
    },

    getMAGiamGia:(discountName)=>{
        const url ='/discount/apdung?discountName='+ discountName;
        return axiosClient.get(url);
    }
}
export default BillApi;