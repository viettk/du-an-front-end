import axiosClient from "./axiosClient";
const VnPayApi = {
    createUrl: (data)=>{
        const url = '/thanhtoan/createUrl';
        return axiosClient.post(url,data);
    },
    checkSum: (data)=>{
        const url = '/thanhtoan/checksum'+data;
        return axiosClient.get(url);
    }, checkBill: (id,date)=>{
        const url = '/thanhtoan/find?order_id='+id+'&trans_date'+date;
        return axiosClient.get(url);
    }
}
export default VnPayApi;