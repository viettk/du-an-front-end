import axiosClient from "./axiosClient";

const ReceiptApi = {
    getReceipt: (params) =>{
        const url = `/api/receipt`;
        return axiosClient.get(url, {params});
    },
    
}
export default ReceiptApi;