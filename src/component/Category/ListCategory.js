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
import './Category.css';
import { useParams, useLocation, useHistory } from "react-router-dom";
import Modaldm from "./Modaldm";
import { height } from "@mui/system";
import { Add } from "@mui/icons-material";
import { Box, Grid, InputBase } from "@mui/material";

function ListCategory() {
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
             <Modaldm show={show} setShow={setShow} ma={ma} setMa={setMa} reload={reload} setReload={setReload} />
        <h3 style={{marginTop: 10}}>Danh sách Danh mục Sản phẩm</h3>
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
                                    placeholder="Tên danh mục ...."
                                    name="name"
                                    onChange={(e) => getSearchName(e)}
                                />
                            </Box>
                        </Grid>
        <TableContainer component={Paper}>
        <button style={{margin: "5px 0"}} className="btn btn-primary" onClick={() => them()}>Thêm mới <Add /></button>
        
        <table className="table table-striped dm">
                <tbody>
                    <tr>
                        <td scope="col">STT</td>
                        <td scope="col">Tên Danh mục <i class={params._known == 'up' ? "fa fa-angle-up searh-icon" : "fa fa-angle-down searh-icon"} onClick={sort}></i></td>
                        <td scope="col">Danh mục cha</td>
                        <td scope="col">Sửa</td>
                    </tr>
                </tbody>
                
                <tfoot style={{height: "10px"}}>
                    {
                        result.length > 0 ? result.map(
                            (result, index) =>
                                <tr key={index+1}>
                                    <td>{index+1}</td>
                                    <td>{result.name}</td>
                                    <td>{result.parent_name}</td>
                                    <td>                                     
                                        <i onClick={() => getMa(result.id)} className="fa fa-edit"></i> 
                                    </td>    
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
export default ListCategory;