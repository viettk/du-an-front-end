import axiosClient from "./axiosClient";

const ReceiptApi = {
    getReceipt: (params, month, year) =>{
        const url = `/api/receipt?&month=` + month + `&year=` + year;
        return axiosClient.get(url, {params});
    },

    getReceiptDetail :(id, params, sku, productName) =>{
        const url = `/api/receiptDetail/`+id+'?sku=' + sku +'&productName=' + productName ;               
        return axiosClient.get(url, {params}); 
    },
    
}
export default ReceiptApi;