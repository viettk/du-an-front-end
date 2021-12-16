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
import CategoryApi from "../../api/CategoryApi";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useParams, useLocation, useHistory } from "react-router-dom";
import { height } from "@mui/system";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid, InputBase } from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotInterestedIcon from '@mui/icons-material/NotInterested'


function Khachhang(){
    const initValues = [];
const initParams= {
    _field: 'name',
    _known: 'up',
    _limit : '5',
    _page : 0,
};

const [ params, setParams] = useState(initParams);
const [ result, setResult] = useState(initValues);
const [ page, setPage] = useState(initParams._page + 1);
const [ count, setCount] = useState(0);

const [search, setSearch] = useState({
    name: '',
    parent_name: ''
});

// lấy id danh mục
const [ma, setMa] = useState(0);
const [reload, setReload] = useState(true);
// Mở modal
const [show, setShow] = useState(false);

useEffect(() => {
    const fetchList = async () =>{
      try{
        const response = await CategoryApi.getAll(params, search.name, search.parent_name);
        setResult(response.content); 
        setCount(response.totalPages);
      }catch (error){
        console.log(error);
      }
    }
    fetchList();
  }, [params,search, page, reload]);

  const handleChange = (event, value) => {
    setPage(value);
    setParams({
            ...params,
            _limit : '5',
            _page : value-1,
        });       
  };
  
  const getMa = (id) =>{
    setShow(true);
    setMa(id);
  }

  const getSearchName = (e) => {
    const newvalue = e.target.value;
    setSearch({
        ...search,
        name: newvalue,
    });         
    setParams({
        ...params,
        _page: 0
    });
    setPage(1)
}

const getSearchParent_name = (e) => {      
    const newvalue = e.target.value;
    setSearch({
        ...search,
        parent_name: newvalue,
    });
    setParams({
        ...params,
        _page: 0
    });
    setPage(1)
}
const them = () =>{
    setShow(true);
}
const sort = () =>{
    if(params._known == 'up'){
        setParams({
            ...params,
            _known: 'down'
        })
    } else {
        setParams({
            ...params,
            _known: 'up'
        })
    }
}

    return(
        <React.Fragment>
        <h3 style={{marginTop: 10}}>Danh sách Khách hàng</h3>
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
                                    placeholder="Tìm kiếm khách hàng ...."
                                    name="name"
                                    onChange={(e) => getSearchName(e)}
                                />
                            </Box>
                        </Grid>
        <TableContainer component={Paper}>
        
        <table className="table table-striped dm">
                <tbody>
                    <tr>
                        <td scope="col">STT</td>
                        <td scope="col">Tên khách hàng <i class={params._known == 'up' ? "fa fa-angle-up searh-icon" : "fa fa-angle-down searh-icon"} onClick={sort}></i></td>
                        <td scope="col">SĐT</td>
                        <td scope="col">Email</td>
                        <td scope="col">Sửa</td>
                    </tr>
                </tbody>
                
                <tfoot style={{height: "10px"}}>
                        <tr>
                            <td>1</td>
                            <td>Trần Khắc Việt</td>
                            <td>0987654321</td>
                            <td>Viettkph09818@gmail.com</td>
                            <td>
                            <Button variant="contained"><NotificationsActiveIcon/></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Trần Trung Quân</td>
                            <td>0123443122</td>
                            <td>ccns8@gmail.com</td>
                            <td>
                            <Button variant="contained"><NotInterestedIcon/></Button>
                            </td>
                        </tr>

                        <tr>
                            <td>3</td>
                            <td>Lưu Hoai Thu</td>
                            <td>0345611121</td>
                            <td>hoai@gmail.com</td>
                            <td>
                            <Button variant="contained"><NotificationsActiveIcon/></Button>
                            </td>
                        </tr>

                        <tr>
                            <td>4</td>
                            <td>Lưu Văn Dũng</td>
                            <td>019874321</td>
                            <td>Dung@gmail.com</td>
                            <td>
                            <Button variant="contained"><NotificationsActiveIcon/></Button>
                            </td>
                        </tr>
                </tfoot>
            </table>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination className="d-flex justify-content-center" count={count}  page={page} onChange={handleChange}  color="secondary"/>
            </Stack>
    </React.Fragment>
    );
}
export default Khachhang;