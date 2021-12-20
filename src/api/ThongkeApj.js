import axiosClient from "./axiosClient";

const ThongkeApi = {
    getAll :(month, year) =>{
        const url =  "/api/thong-ke?month="+month +"&year=" +year;
        return axiosClient.get(url);
    },

    getTop5: () =>{
        const url = "/api/home/top5sp";
        return axiosClient.get(url);
    },

    getTop5Admin: (month, year)=>{
        const url = "/api/thong-ke/top5spbanchay?month=" +month+ "&year=" + year;
        return axiosClient.get(url);
    },

    getSLTop5Admin: (month, year)=>{
        const url = "/api/thong-ke/soluongtop5banchay?month=" +month+ "&year=" + year;
        return axiosClient.get(url);
    },

    getDoanhthu:(year)=>{
        const url  = "/api/thong-ke/doanhthu1nam?year=" + year ;
        return axiosClient.get(url);
    },

    getThongke_typepay: (month, year)=>{
        const url = '/api/thong-ke/thongkeTypepay?month='+month+ '&year=' + year;
        return axiosClient.get(url);
    },

    getChoXacNhan: ()=>{
        const url = '/api/thong-ke/choxacnhan';
        return axiosClient.get(url);
    },

    getDangchuanbi: ()=>{
        const url = '/api/thong-ke/dangchuanbi';
        return axiosClient.get(url);
    },

    getDanggiao: ()=>{
        const url = '/api/thong-ke/danggiao';
        return axiosClient.get(url);
    },

    gettuchoi: ()=>{
        const url = '/api/thong-ke/tuchoi';
        return axiosClient.get(url);
    },

    getthanhcong: ()=>{
        const url = '/api/thong-ke/thanhcong';
        return axiosClient.get(url);
    },

    getThatbai: ()=>{
        const url = '/api/thong-ke/thatbai';
        return axiosClient.get(url);
    },


    // getAllThongke:(param, month, year, pp, field, known)=>{
    //     const url  = '/api/thong-ke/gettongadmin?month='+month+'&year='+year+'&known='+known+'&page=' +pp+'&field='+field;
    //     return axiosClient.get(url, {param});
    // }

    getAllThongke:(param, openday, endday, pp, field, known)=>{
        const url  = '/api/thong-ke/gettongadmin?known='+known+'&page=' +pp+'&field='+field+'&opena='+openday+'&enda='+endday;
        return axiosClient.get(url, {param});
    }
    

}
export default ThongkeApi;