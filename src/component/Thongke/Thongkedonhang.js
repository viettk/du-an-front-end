import * as React from 'react';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  PieSeries
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from "@devexpress/dx-react-chart";
import { useState, useEffect } from 'react';
import ThongkeApi from '../../api/ThongkeApj';
import './thongke.css';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { Pie } from 'react-chartjs-2';

function Thongkedonhang() {

  let newDate = new Date()
  const [month, setMonth] = useState(newDate.getMonth() + 1)
  const [year, setYear] = useState(newDate.getFullYear());
  const [topsp, setTopsp] = useState([]);
  const [result, setResult] = useState([]);
  const [doanhthu, setDoanhthu] = useState([]);
  const [tktp, setTktp] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const respone = await ThongkeApi.getAll(month, year);
        const top5 = await ThongkeApi.getTop5Admin(month, year);
        const sltop5 = await ThongkeApi.getSLTop5Admin(month, year);
        const respdoanhthu = await ThongkeApi.getDoanhthu(year);
        const thongke_typay = await ThongkeApi.getThongke_typepay();

        const type_pay = [
          { type_p: 'COD', value: thongke_typay[0] },
          { type_p: 'VNP', value: thongke_typay[1] }
        ]

        const data = [
          { status_order: 'Đã thanh toán', value: respone[2] },
          { status_order: 'Đã hủy', value: respone[0] },
          { status_order: 'Đã hoàn trả', value: respone[1] },
        ]
        const num = [];
        for (var i = 0; i < top5.length; i++) {
          num.push({ year: top5[i].name + top5[i].id, population: sltop5[i] });
        }

        const doanhThuData = [];
        for (var x = 1; x < respdoanhthu.length; x++) {
          doanhThuData.push({ ketqua: x, value: respdoanhthu[x] });
        }

        setTktp(type_pay);
        setResult(data);
        setTopsp(num);
        setDoanhthu(doanhThuData);

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
          <AddAlertIcon/>
        </span>
          <div className='thong-ke-dv'>
            <p className='tk-sdh'>50</p>
            <p>Chờ xác nhận</p>
          </div>
        </div>
        <div className='thong-ke-head' style={{backgroundColor:"lightskyblue"}}>
        <span>
        <HourglassEmptyIcon/>
        </span>
          <div className='thong-ke-dv'>
            <p className='tk-sdh'>30</p>
            <p>Đang chuẩn bị</p>
          </div>
        </div>
        <div className='thong-ke-head' style={{backgroundColor:"lightgreen"}}>
        <span>
        <AirlineSeatReclineNormalIcon/>
        </span>
          <div className='thong-ke-dv'>
            <p className='tk-sdh'>10</p>
            <p>Đang giao</p>
          </div>
        </div>
        </div>
      </div>
      <br/>
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
            <Chart data={result} >
              {result.length == 0 || (result[0].value == 0 && result[1].value == 0 && result[2].value == 0) ?
                <span className="don-hang-span">Không có dữ liệu</span>
                : <PieSeries valueField="value" argumentField="status_order" />}
              <Title text="Thống kê đơn hàng" />
            </Chart>
          </div>

          <div style={{ position: "relative" }}>
            <Chart data={topsp}>
              <ArgumentAxis />
              <ValueAxis max={5} />
              {
                topsp.length == 0 ? <span className="don-hang-span">Không có dữ liệu</span> :
                  <BarSeries valueField="population" argumentField="year" />
              }
              <Title text="Top sản phẩm bán chạy" />
              <Animation />
            </Chart>
          </div>


          <div className="don-hang-thong-ke">
            <Chart data={tktp} >
              {tktp.length == 0 || (tktp[0].value == 0 && tktp[1].value == 0) ?
                <span className="don-hang-span">Không có dữ liệu</span>
                : <PieSeries valueField="value" argumentField="type_p" />}
              <Title text="Phương thức thanh toán" />
            </Chart>
          </div>


          <div style={{ position: "relative" }}>
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Thongkedonhang;