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
import { Add } from "@mui/icons-material";
import { Box, Grid, InputBase } from "@mui/material";

function ListDiscount() {
    
    const initValues = [];
    const initParams= {
        _limit : '5',
        _page : 0,
        name: '',
        valueDiscount: 0,
        _field: 'name',
        _known: 'up'
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
                ...params,
                _limit : '5',
                _page : value-1,
            }
        );       
      };
      console.log(params._page);
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

    const nameSort = () =>{
        if(params._known == 'up'){
            setParams({
                ...params,
                _field: 'name',
                _known: 'down'
            })
        } else {
            setParams({
                ...params,
                _field: 'name',
                _known: 'up'
            })
        }
    }

    const valueDiscountSort = () =>{
        if(params._known == 'up'){
            setParams({
                ...params,
                _field: 'valueDiscount',
                _known: 'down'
            })
        } else {
            setParams({
                ...params,
                _field: 'valueDiscount',
                _known: 'up'
            })
        }
    }

    return(
        <React.Fragment>
             <Discountdm show={show} setShow={setShow} ma={ma} setMa={setMa} reload={reload} setReload={setReload} />
        <h3 style={{marginTop: 10}}>Danh sách phiếu giảm giá</h3>
        <Grid item xs={6}>
                            <Box
                                component="form"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 ,background: '#f0f0f0', pt:0.7 ,pb:0.7, pl: 0.7 }}
                                    placeholder="Tên mã giảm giá ...."
                                    name="name"
                                    onChange={getSearch}
                                />
                            </Box>
                        </Grid>
        <TableContainer component={Paper}>
        <button style={{margin: "5px 0"}} className="btn btn-primary"  onClick={() => getMa()} >Thêm mới <Add /></button>
        <table className="table table-striped">
                <tbody>
                    <tr>
                        <td scope="col">Tên <i class={ params._known == 'up' && params._field =='name' ? "fa fa-angle-up searh-icon" : "fa fa-angle-down searh-icon"  } onClick={nameSort}></i></td>
                        <td scope="col">Giá giảm <i class={ params._known == 'up' && params._field =='valueDiscount' ? "fa fa-angle-up searh-icon" : "fa fa-angle-down searh-icon"  } onClick={valueDiscountSort}></i></td>
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
                                    <td>{String(Math.round(result.valueDiscount)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' VNĐ'}</td>
                                    <td>{result.number}</td>
                                    <td>{(result.open_day.split('T')[0]).split('-').reverse().join('-')}</td>
                                    <td>{result.end_day}</td>
                                    <td><button type="button" className="xem-receipt" onClick={() => getMa(result.id)}><i class="fa fa-edit"></i></button></td>    
                                </tr>

                        ) : (         
                            <div style={{textAlign:"center" ,position: 'absolute' ,left: "50%",  transform: `translate(${-50}%, ${0}px)` }}>Không có dữ liệu</div>
                        )                
                    }
                </tfoot>
            </table>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination className="d-flex justify-content-center" count={count}  page={page} onChange={handleChange}  color="secondary"/>
            </Stack>
    </React.Fragment>
    );
}
export default ListDiscount;