import axiosClient from "./axiosClient";

const ThongkeApi = {
    getAll :(month, year) =>{
        const url =  "/thong-ke?month="+month +"&year=" +year;
        return axiosClient.get(url);
    },

    getTop5: () =>{
        const url = "/home/top5sp";
        return axiosClient.get(url);
    },

    getTop5Admin: (month, year)=>{
        const url = "/thong-ke/top5spbanchay?month=" +month+ "&year=" + year;
        return axiosClient.get(url);
    },

    getSLTop5Admin: (month, year)=>{
        const url = "/thong-ke/soluongtop5banchay?month=" +month+ "&year=" + year;
        return axiosClient.get(url);
    },

    getDoanhthu:(year)=>{
        const url  = "/thong-ke/doanhthu1nam?year=" + year ;
        return axiosClient.get(url);
    }

}
export default ThongkeApi;