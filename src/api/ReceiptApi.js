import axiosClient from "./axiosClient";

const ReceiptApi = {
    getReceipt: (params, month, year) =>{
        const url = `/api/receipt?&month=` + month + `&year=` + year;
        return axiosClient.get(url, {params});
    },

    getReceiptDetail :(id, params, sku, productName) =>{
        const url = `/receiptDetail/`+id+'?sku=' + sku +'&productName=' + productName ;               
        return axiosClient.get(url, {params}); 
    },

    getOneReceipt : (id)=>{
        const url = `/api/receipt/`+id;
        return axiosClient.get(url);
    },

    postReceipt : (params)=>{
        const url = `/api/receipt`;
        return axiosClient.post(url, params);
    },

    putReceipt : (id, params)=>{
        const url = `/api/receipt/`+id;
        return axiosClient.put(url, params);
    },

    postReceiptDetail: (sp)=>{
        const url ='/receiptDetail/add';
        return axiosClient.post(url, sp);
    },

    putReceiptDetail: (idsp, sp)=>{
        const url = '/receiptDetail/'+idsp;
        return axiosClient.put(url, sp);
    },

    deleteReceiptDetail: (id, ma )=>{
        const url = '/receiptDetail/'+ id +'?receiptId=' + ma;
        return axiosClient.delete(url);
    },

    getProductNameOfReceiptDetail:(productName)=>{
        console.log(productName)
        const url = '/receiptDetail/product?name='+productName;
        return axiosClient.get(url);
    }
    
}
export default ReceiptApi;