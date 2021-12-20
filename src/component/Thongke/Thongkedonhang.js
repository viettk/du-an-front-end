import * as React from 'react';
import { useState, useEffect } from 'react';
import ThongkeApi from '../../api/ThongkeApj';
import './thongke.css';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

function Thongkedonhang() {

  let newDate = new Date()
  const [month, setMonth] = useState(newDate.getMonth() + 1)
  const [year, setYear] = useState(newDate.getFullYear());
  const [topsp, setTopsp] = useState([]);
  const [result, setResult] = useState([]);
  const [doanhthu, setDoanhthu] = useState([]);
  const [tktp, setTktp] = useState([]);

  const [choxacnhan, setChoxacnhan] = useState(0);
  const [dangchuanbi, setDangchuanbi] = useState(0);
  const [danggiao, setDanggiao] = useState(0);
  const [tuchoi, setTuchoi] = useState(0);
  const [thatbai, setThatbai] = useState(0);
  const [thanhcong, setThanhcong] = useState(0);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const respone = await ThongkeApi.getAll(month, year);
        const top5 = await ThongkeApi.getTop5Admin(month, year);
        const sltop5 = await ThongkeApi.getSLTop5Admin(month, year);
        const respdoanhthu = await ThongkeApi.getDoanhthu(year);
        const thongke_typay = await ThongkeApi.getThongke_typepay(month, year);

        const choxacnhan = await ThongkeApi.getChoXacNhan();
        const chuanbi = await ThongkeApi.getDangchuanbi();
        const giao = await ThongkeApi.getDanggiao();
        const ht = await ThongkeApi.getthanhcong(); 
        const tb = await ThongkeApi.getThatbai();
        const tc = await ThongkeApi.gettuchoi();
        const type_pay = [
          { name: 'COD', value: thongke_typay[0] },
          { name: 'VNPAY', value: thongke_typay[1] }
        ]

        const data = [
          { name: 'Hoàn thành', value: respone[2] },
          { name: 'Từ chối', value: respone[0] },
          { name: 'Thất bại', value: respone[1] },
        ]
        const num = [];
        for (var i = 0; i < top5.length; i++) {
          num.push({ year: top5[i].name + top5[i].id, sl: sltop5[i] });
        }

        const doanhThuData = [];
        for (var x = 1; x < respdoanhthu.length; x++) {
          doanhThuData.push({ ketqua: x, doanhThu: respdoanhthu[x]} );
        }
        setTktp(type_pay);
        setResult(data);
        setTopsp(num);
        setDoanhthu(doanhThuData);
        if(choxacnhan.data == 0){
          setChoxacnhan(0);
        } else{
          setChoxacnhan(choxacnhan);
        }

        if(chuanbi.data == 0){
          setDangchuanbi(0);
        } else{
          setDangchuanbi(chuanbi);
        }
        
        if(giao.data == 0){
          setDanggiao(0);
        } else{
          setDanggiao(giao);
        }

        if(ht.data == 0){
          setThanhcong(0);
        } else{
          setThanhcong(ht);
        }

        if(tc.data == 0){
          setTuchoi(0);
        } else{
          setTuchoi(tc);
        }

        if(tb.data == 0){
          setThatbai(0);
        } else{
          setThatbai(tc);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchList();
  }, [month, year]);
  const changeMonth = (e) => {
    let index = e.target.value;
    setMonth(index);
  }

  const changeYear = (e) => {
    let index = e.target.value;
    setYear(index);
  }
  return (
    <React.Fragment>
      <div className='thong-ke-cha'>
        <div className='thong-ke-con'>
          <div className='thong-ke-head'>
            <span>
              <AddAlertIcon />
            </span>
            <div className='thong-ke-dv'>
              <p className='tk-sdh'>{choxacnhan}</p>
              <p>Chờ xác nhận</p>
            </div>
          </div>
          <div className='thong-ke-head' style={{ backgroundColor: "lightskyblue" }}>
            <span>
              <HourglassEmptyIcon />
            </span>
            <div className='thong-ke-dv'>
              <p className='tk-sdh'>{dangchuanbi}</p>
              <p>Đang chuẩn bị</p>
            </div>
          </div>
          <div className='thong-ke-head' style={{ backgroundColor: "lightgreen" }}>
            <span>
              <AirlineSeatReclineNormalIcon />
            </span>
            <div className='thong-ke-dv'>
              <p className='tk-sdh'>{danggiao}</p>
              <p>Đang giao</p>
            </div>
          </div>

          <div className='thong-ke-head' style={{backgroundColor: "#7FFF00"}}>
            <span>
              <DoneOutlineIcon />
            </span>
            <div className='thong-ke-dv'>
              <p className='tk-sdh'>{thanhcong}</p>
              <p>Hoàn thành</p>
            </div>
          </div>

          <div className='thong-ke-head' style={{backgroundColor: "#A9A9A9"}}>
            <span>
              <SentimentVeryDissatisfiedIcon />
            </span>
            <div className='thong-ke-dv'>
              <p className='tk-sdh'>{thatbai}</p>
              <p>Thất bại</p>
            </div>
          </div>

          <div className='thong-ke-head'>
            <span>
              <ReportProblemIcon />
            </span>
            <div className='thong-ke-dv'>
              <p className='tk-sdh'>{tuchoi}</p>
              <p>Từ chối</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div style={{ position: "relative" }}>
        <div style={{ textAlign: "center" }}>
          <select value={month} onChange={(e) => changeMonth(e)} style={{ padding: "5px 10px" }} >
            <option value="1">Tháng 1</option>
            <option value="2">Tháng 2</option>
            <option value="3">Tháng 3</option>
            <option value="4">Tháng 4</option>
            <option value="5">Tháng 5</option>
            <option value="6">Tháng 6</option>
            <option value="7">Tháng 7</option>
            <option value="8">Tháng 8</option>
            <option value="9">Tháng 9</option>
            <option value="10">Tháng 10</option>
            <option value="11">Tháng 11</option>
            <option value="12">Tháng 12</option>
          </select>
          <select value={year} onChange={(e) => changeYear(e)} style={{ padding: "5px 10px" }}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <div className="thong-ke">
          <div className="don-hang-thong-ke">
            <h4>Đơn hàng</h4>
            {result.length === 0 || (result[0].value == 0 && result[1].value == 0 && result[2].value == 0) ? <p>Không có dữ liệu</p> :
              <PieChart width={500} height={500}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={result}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>}
          </div>

          <div className="don-hang-thong-ke">
            {/* <Chart data={tktp} >
              {tktp.length == 0 || (tktp[0].value == 0 && tktp[1].value == 0) ?
                <span className="don-hang-span">Không có dữ liệu</span>
                : <PieSeries valueField="value" argumentField="type_p" />}
              <Title text="Phương thức thanh toán" />
            </Chart> */}

            <h4>Phương thức thánh toán</h4>
            {tktp.length == 0 || (tktp[0].value == 0 && tktp[1].value == 0) ? 
            <p>Không có dữ liệu</p> : <PieChart width={500} height={500}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={tktp}
              cx={200}
              cy={200}
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart> }
          </div>

          <div style={{ position: "relative", textAlign: "center" }}>
            <h4>Top sản phẩm bán chạy</h4>
            {topsp.length > 0 ?
              <BarChart
                width={500}
                height={300}
                data={topsp}
                margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis
                  dataKey="year"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="sl" fill="#8884d8" background={{ fill: "#eee" }} />
              </BarChart> : <p>Chưa có dữ liệu</p>}
          </div>

          {/* <div style={{ position: "relative" }}>
            <Chart data={doanhthu}>
              <ArgumentAxis />
              <ValueAxis max={12} />
              {
                doanhthu.length == 0 ? <span className="don-hang-span">Không có dữ liệu</span> :
                  <BarSeries valueField="value" argumentField="ketqua" style={{ width: "30px" }} />
              }
              <Title text="Doanh thu bán hàng" />
              <Animation />
            </Chart>
          </div> */}

<div style={{ position: "relative", textAlign: "center" }}>
            <h4>Doanh thu bán hàng</h4>
            {doanhthu.length > 0 ?
              <BarChart
                width={500}
                height={300}
                data={doanhthu}
                margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis
                  dataKey="ketqua"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="doanhThu" fill="#8884d8" background={{ fill: "#eee" }} />
              </BarChart> : <p>Chưa có dữ liệu</p>}
          </div>

        </div>
      </div>
    </React.Fragment>
  );
}
export default Thongkedonhang;