import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThongkeApi from "../../api/ThongkeApj";
import './thongke2.css';

function PieChartComponent() {
  const initValues = [];
  const initParams = {
    _limit: '1',
    _page: 0,
  };

  const [known, setKnown] = useState('up');
  const [field, setField] = useState('day');

  let newDate = new Date();
  const [day, setDay] = useState(newDate.getDate());
  const [month, setMonth] = useState(newDate.getMonth() + 1);
  const [year, setYear] = useState(newDate.getFullYear());
  const [params, setParams] = useState(initParams);
  const [result, setResult] = useState(initValues);
  const [pp, setPp] = useState(0);
  const [page, setPage] = useState(pp + 1);
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState(true);

  const [openday, setOpenday] = useState({
    date: (year+'-'+month+'-'+day)
  });

  const [endday, setEndday] = useState({
    date: (year+'-'+month+'-'+day)
  });

  const [tongdonhang, setTongdonhang] = useState(0);
  const [tongsptk, setTongsptk] = useState(0);
  const [doanhthutong, setDoanhthutong] = useState(0);
  

  // lấy id danh mục
  // Mở modal
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fetchList = async () => {
      console.log(params)
      try {
        const response = await ThongkeApi.getAllThongke(params, openday.date, endday.date, pp, field, known);
        setResult(response.content);
        let sum  = 0;
        let sp = 0;
        let dt = 0;
        for(let i = 0;  i < response.content.length; i++ ){
          sum = sum + Number(response.content[0][1]);
          sp = sp + Number(response.content[i][3]);
          dt = dt + Number(response.content[i][2]);
        }
        
        setCount(response.totalPages);
        
        setTongdonhang(sum);
        setTongsptk(sp);
        setDoanhthutong(dt);
      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
  }, [pp, reload , known, field]);

  

  const handleChange = (event, value) => {
    setPage(value);
    setPp(value - 1);
  };

  const sort1 = () => {
    if (known == 'up') {
      setKnown('down');
      setField('day');
    } else {
      setField('day');
      setKnown('up');
    }
  }

  const sort2 = () => {
    if (known == 'up') {
      setKnown('down');
      setField('total');
    } else {
      setField('total');
      setKnown('up');
    }
  }

  const updateopen_day = (e) => {
    const newvalue = e.target.value;
    setOpenday({
      ...openday,
      date: newvalue 
    })
}

const updateend_day = (e)=>{
  const newvalue = e.target.value;
  setEndday({
    ...endday,
    date: newvalue 
  })
}
const tim =() =>{
  if(reload){
    setReload(false);
  } else{
    setReload(true);
  }
}

  return (
    <React.Fragment>
      <h3 style={{ marginTop: 10 }}>Thống kê bán hàng</h3>
      <TableContainer component={Paper}>
        <div className="thong-ke-ngay-input">
          <div>
            <label>Ngày bắt đầu:</label>
            <input type="date" onChange={(e) => updateopen_day(e)} value={openday.date}  />
          </div>
          <div>
            <label>Ngày kết thúc</label>
            <input type="date" onChange={(e) => updateend_day(e)} value={endday.date} />
            <button onClick={()=>tim()}>Tìm</button>
          </div>
        </div>
        <table className="table table-striped-k-dm">
          <tbody>
            <tr>
              <td scope="col">STT</td>
              <td scope="col">Ngày <i class={(known == 'up' && field == 'day') ? "fa fa-angle-up searh-icon" : "fa fa-angle-down searh-icon"} onClick={sort1}></i></td>
              <td scope="col">Số hóa đơn bán được</td>
              <td scope="col">Doanh thu <i class={(known == 'up' && field == 'total') ? "fa fa-angle-up searh-icon" : "fa fa-angle-down searh-icon"} onClick={sort2}></i></td>
              <td scope="col">Số lượng sản phảm bán được</td>
            </tr>
          </tbody>

          <tfoot style={{ height: "10px" }}>
            {
              (result.length == 0 || result[0] == 0 && result[1] == 0 && result[2] == 0) ? (
                <tr><td>Không có dữ liệu</td></tr>
              ) : (result.map(
                (result, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result[0]}</td>
                    <td className="viet-tk-hd" value={result[1]}>{result[1]}</td>
                    <td className="viet-tk-dt" value={result[2]}>{String(Math.round(result[2])).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' VNĐ'}</td>
                    <td className="viet-tk-sp" value={result[3]}>{result[3]}</td>
                  </tr>

              ))
            }      
            <tr>
              <td style={{fontWeight: "600"}}>Tổng</td>
              <td></td>
              <td style={{fontWeight: "600"}}>{tongdonhang}</td>
              <td style={{fontWeight: "600"}}>{String(Math.round(doanhthutong)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' VNĐ'}</td>
              <td style={{fontWeight: "600"}}>{tongsptk}</td>
            </tr>   
          </tfoot>
        </table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination className="d-flex justify-content-center" count={count} page={page} onChange={handleChange} color="secondary" />
      </Stack>
    </React.Fragment>
  );
}
export default PieChartComponent;
