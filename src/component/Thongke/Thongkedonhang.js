import * as React from 'react';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  PieSeries
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { useState, useEffect } from 'react';
import ThongkeApi from '../../api/ThongkeApj';

function Thongkedonhang() {

  let newDate = new Date()
  const [month, setMonth] = useState(newDate.getMonth() + 1)
  const [year, setYear] = useState(newDate.getFullYear());
  const [topsp, setTopsp] = useState([]);
  const [result, setResult] = useState([]);
  const [doanhthu, setDoanhthu] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const respone = await ThongkeApi.getAll(month, year);
        const top5 = await ThongkeApi.getTop5Admin(month, year);
        const sltop5 = await ThongkeApi.getSLTop5Admin(month, year);
        const respdoanhthu = await ThongkeApi.getDoanhthu(year);
        
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
        for(var x = 1 ; x < respdoanhthu.length; x++){
          doanhThuData.push({ ketqua: x, value: respdoanhthu[x] });
        }
        
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
  return (
    <React.Fragment>
      <div>
        <div style={{ left: "45%", transition: "translateX(-50%);", position: "absolute" }}>
          <select value={month} onChange={(e) => changeMonth(e)} >
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
          <select value={year}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <div>
          <Chart data={result} >
            <PieSeries valueField="value" argumentField="status_order" />
            <Title text="Thống kê đơn hàng" />
          </Chart>
        </div>
        <div>
          <Chart data={topsp}>
            <ArgumentAxis />
            <ValueAxis max={5} />

            <BarSeries valueField="population" argumentField="year" />
            <Title text="Top sản phẩm bán chạy" />
            <Animation />
          </Chart>
        </div>

        <div>
          <Chart data={doanhthu}>
            <ArgumentAxis />
            <ValueAxis max={12} />

            <BarSeries valueField="value" argumentField="ketqua" style={{width: "30px"}} />
            <Title text="Top sản phẩm bán chạy" />
            <Animation />
          </Chart>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Thongkedonhang;