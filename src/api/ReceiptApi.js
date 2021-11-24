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
        return axiosClient.post(url, params)
    },

    putReceipt : (id, params)=>{
        const url = `/api/receipt/`+id;
        return axiosClient.put(url, params)
    }
    
}
export default ReceiptApi;