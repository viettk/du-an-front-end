import axiosClient from "./axiosClient";

const CategoryApi = {
    getCart: (params, email) =>{
        const url = '/cart/'+params+'?email='+email;
        return axiosClient.get(url);
    },

    getCartDetail:(cartId, email) =>{
        const url = "/cart-detail/list/"+cartId +'?email='+email ;
        return axiosClient.get(url);
    },

    getOne: (id) => {
        const url = "/cart-detail/"+ id;
        return axiosClient.get(url, {id});
    },

    postDm: (params) =>{
        const url = "/danh-muc";
        return axiosClient.post(url, {params});
    },

    putDm: (id, params) =>{
        const url = `/danh-muc/${id}`;
        return axiosClient.put(url, {params});
    },

    getAddress: (id, email) =>{
        const url = '/dia-chi/all/' + id +'?email='+email;
        return axiosClient.get(url);
    },

    getOnAddress: (id, email) =>{
        const url = '/dia-chi/'+id+'?email='+email;
        return axiosClient.get(url);
    },

    postAdress: (detail, email) =>{
        const url = '/dia-chi' + '?email='+email;
        return axiosClient.post(url, detail);
    },

    putAddress: (id, detail, email) =>{
        const url = '/dia-chi/${id}' +'?email='+email ;
        return axiosClient.put(url, detail)
    },

    getAddressStatus: (id, email) =>{
        const url = '/dia-chi/mac-dinh?customerId=' +id+'&email='+email;
        return axiosClient.get(url);
    },

    getShip: (id, email) =>{
        const url= '/cart-detail/get-weight?cartId='+id + '&email='+email;
        return axiosClient.get(url);
    },

    getTotal: (id, email) =>{
        const url = '/cart-detail/totalItem?id=' + id+'&email='+email;
        return axiosClient.get(url);
    },

    getNumberOfCart: (customerId, emailc) =>{
        const url = '/cart-detail/soluongtronggio?idcustomer='+ customerId +'&email=' +emailc ;
        return axiosClient.get(url);
    },


//thao tác cập nhật giỏ hàng
    tangSL: (id, email, data) =>{
        const url = '/cart-detail/up/'+  id +'?email='+ email;
        return axiosClient.put(url, data);
    },

    giamSL: (id, email, data) =>{
        const url = '/cart-detail/down/'+  id +'?email='+ email;
        return axiosClient.put(url, data);
    },

    xoaSP: (id, email, data) =>{
        const url = '/cart-detail/delete/'+  id +'?email='+ email;
        return axiosClient.put(url, data);
    },

    checknumber: (id, email, data) =>{
        const url = '/cart-detail/'+  id +'?email='+ email;
        return axiosClient.put(url, data);
    },

    //đặt hàng
    dathangnotlogin :(demo) =>{
        const url = 'http://localhost:8080/check/checkcart';
        return axiosClient.post(url, demo);
    }


}
export default CategoryApi;