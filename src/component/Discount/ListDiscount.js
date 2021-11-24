import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DiscountApi from "../../api/DiscountApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import './discount.css';
import { useParams, useLocation, useHistory } from "react-router-dom";
import { height } from "@mui/system";
import Discountdm from "./Discountdm";

function ListDiscount() {
    
    const initValues = [];
    const initParams= {
        _limit : '5',
        _page : 0,
        name: '',
        valueDiscount: 0
    };

    const [ params, setParams] = useState(initParams);
    const [ result, setResult] = useState(initValues);
    const [ page, setPage] = useState(initParams._page + 1);
    const [ count, setCount] = useState(0);
    const [reload, setReload] = useState(true);

    // lấy id danh mục
    const [ma, setMa] = useState(0);


    // Mở modal
    const [show, setShow] = useState(false);
    

    useEffect(() => {
        const fetchList = async () =>{
          try{
            const response = await DiscountApi.getAllDiscount(params);
            setResult(response.content);      
            setCount(response.totalPages);
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [params, reload, page]);

      const handleChange = (event, value) => {
        setPage(value);
        setParams(
            {
                _limit : '5',
                _page : value-1,
            }
        );       
      };
      
      const getMa = (id) =>{
        setShow(true);
        setMa(id);
      }
    
    const getSearch = (e) =>{
        const { name, value } = e.target;
        setParams({
            ...params,
            [name]: value
        })
    }
    const changeValue = (e) =>{
        setParams({
            ...params,
            valueDiscount: e.target.value
        })
    }
console.log(params)
    return(
        <React.Fragment>
             <Discountdm show={show} setShow={setShow} ma={ma} setMa={setMa} reload={reload} setReload={setReload} />
        <h3 style={{marginTop: 10}}>Danh sách phiếu giảm giá</h3>
        <TableContainer component={Paper}>
<button className="btn btn-primary" onClick={() => getMa(ma)} >Thêm mới</button>
        <table className="table table-striped">
            <thead>
                <tr>
                    <td scope="col"><input onChange={getSearch} name="name" placeholder="Lọc theo Tên" /> </td>
                    <td scope="col"><input onChange={changeValue} namee="valueDiscount" placeholder="Lọc theo Giá giảm" /> </td>
                </tr>
            </thead>
                <tbody>
                    <tr>
                        <td scope="col">Tên</td>
                        <td scope="col">Giá giảm</td>
                        <td scope="col">Số lượng</td>
                        <td scope="col">Ngày bắt đầu</td>
                        <td scope="col">Ngày kết thúc</td>
                        <td scope="col"></td>
                    </tr>
                </tbody>
                <tfoot style={{height: "10px"}}>
                    {
                        result.length > 0 ? result.map(
                            (result, index) =>
                                <tr key={index + 1}>
                                    <td>{result.name}</td>
                                    <td>{result.valueDiscount}</td>
                                    <td>{result.number}</td>
                                    <td>{result.open_day}</td>
                                    <td>{result.end_day}</td>
                                    <td><button type="button" className="xem-receipt" style={{padding: 0}} onClick={() => getMa(result.id)}><i class="fa fa-edit"></i></button></td>    
                                </tr>

                        ) : (         
                            <div style={{textAlign:"center" ,position: 'absolute' ,left: "50%",  transform: `translate(${-50}%, ${0}px)` }}>Không có dữ liệu</div>
                        )                
                    }
                </tfoot>
            </table>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination className="pagination" count={count}  page={page} onChange={handleChange}  color="secondary"/>
            </Stack>
    </React.Fragment>
    );
}
export default ListDiscount;