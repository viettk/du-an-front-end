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
import CustomerApi from "../../api/CustomerApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {  FormControl,  InputLabel, MenuItem, Select } from "@mui/material";

import { useParams, useLocation, useHistory } from "react-router-dom";
import { height } from "@mui/system";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid, InputBase } from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



function Khachhang() {
    const initValues = [];
    const initParams = {
        field: 'id',
        known: 'down',
        page: 0,
        email: '',
        name: '',
        status: ''
    };
    const [idCustom ,setIdCustom]=useState(0);
    const [params, setParams] = useState(initParams);
    const [result, setResult] = useState(initValues);
    const [page, setPage] = useState(initParams.page + 1);
    const [count, setCount] = useState(0);
    const [log, setLog] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLog(false);
    };

    // lấy id danh mục
    const [ma, setMa] = useState(0);
    const [reload, setReload] = useState(true);
    // Mở modal
    const [show, setShow] = useState(false);
    const onLoad = () => {
        if (reload) {
            setReload(false)
        } else {
            setReload(true)
        }
    }

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await CustomerApi.fillAll(params);
                setResult(response.content);
                setCount(response.totalPages);
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [params, page, reload]);

    const pageChange = (event, value) => {
        setPage(value);
        setParams({
            ...params,
            page: value - 1,
        });
    };
    const paramsChange = (event) => {
        const { name, value } = event.target;
        setParams({
            ...params,
            [name]: value
        });
    };
    const upDown = (field) => {
        if (field === params.field) {
            let ud = params.known === 'up' ? 'down' : 'up';
            setParams({ ...params, known: ud })
        } else {
            setParams({ ...params, known: 'up', field: field })
        }
        onLoad();
    }

    const hide = async ()=>{
       await CustomerApi.hideCustomer(idCustom.id).then(()=>{
        onLoad();
        setLog(false);
       }
       )
    }

    return (
        <React.Fragment>
             <Dialog
                open={log}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide">{idCustom.status?"Bạn chắc chắn muốn vô hiệu người dùng này":"Bạn chắc chắn muốn kích hoạt người dùng này"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Từ chối</Button>
                    <Button onClick={hide}>Đồng ý</Button>
                </DialogActions>
            </Dialog>
            <h3 style={{ marginTop: 10 }}>Danh sách Khách hàng</h3>
            <Box sx={{ marginBottom: 2 }}>
                <Box mb={2}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3}} sx={{alignItems: 'center'}}>
                        <Grid item xs={4}>
                            <Box
                                component="form"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 ,background: '#f0f0f0', pt:0.7 ,pb:0.7, pl: 0.7 }}
                                    placeholder="Tên khách hàng ...."
                                    name="name"
                                    onChange={paramsChange}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                component="form"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 ,background: '#f0f0f0', pt:0.7 ,pb:0.7, pl: 0.7 }}
                                    placeholder="Email ...."
                                    name="email"
                                    onChange={paramsChange}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">Trạng thái</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    size="small"
                                    value={params.status}
                                    label="Trạng thái"
                                    name="status"
                                    onChange={paramsChange}
                                >
                                    <MenuItem value=''>Tất cả</MenuItem>
                                     <MenuItem value={true}>Hoạt động</MenuItem>
                                     <MenuItem value={false}>Vô hiệu hóa</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <TableContainer component={Paper}>

                <table className="table table-striped dm">
                    <tbody>
                        <tr>
                            <td scope="col">
                            <Button variant="text" onClick={() => upDown("id")} >STT{params.field === 'id' ? (params.known === 'up' ? <ArrowUpwardIcon color="primary" /> : <ArrowDownwardIcon color="primary" />) : ''}</Button></td>
                            <td scope="col">
                            <Button variant="text" onClick={() => upDown("name")} >Tên khách hàng{params.field === 'name' ? (params.known === 'up' ? <ArrowUpwardIcon color="primary" /> : <ArrowDownwardIcon color="primary" />) : ''}</Button></td>
                            <td scope="col">Email</td>
                            <td scope="col">Logout gần đây</td>
                            <td scope="col">Sửa</td>
                        </tr>
                    </tbody>

                    <tfoot style={{ height: "10px" }}>
                        {
                            result.length > 0 ? result.map(
                                (r, index) =>

                                    <tr>
                                        <td>{(params.field === 'id' && params.known ==='down')? result.length+1 - ((index + 1) + Number(page - 1) * 10):( (index + 1) + Number(page - 1) * 10)}</td>
                                        <td>{r.name}</td>
                                        <td>{r.email}</td>
                                        <td>{(r.last_login.split('T')[0]).split('-').reverse().join('-')}</td>
                                        <td>
                                        <Button variant="contained" color={r.status ? 'warning' : 'error'} onClick={() => {setIdCustom({id : r.id,status:r.status});setLog(true);}}>{r.status ? <NotificationsActiveIcon/> : <NotInterestedIcon/>}</Button>
                                        </td>
                                    </tr>
                            ) : (

                                <div style={{ textAlign: "center", position: 'absolute', left: "50%", transform: `translate(${-50}%, ${0}px)` }}>Không có dữ liệu</div>
                            )
                        }
                    </tfoot>
                </table>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination className="d-flex justify-content-center" count={count} page={page} onChange={pageChange} color="secondary" />
            </Stack>
        </React.Fragment>
    );
}
export default Khachhang;