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

    getThongke_typepay: ()=>{
        const url = '/api/thong-ke/thongkeTypepay';
        return axiosClient.get(url);
    }

}
export default ThongkeApi;