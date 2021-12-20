import React, { useEffect, useState } from "react";
import DatePicker from '@mui/lab/DatePicker';
import TableContainer from '@mui/material/TableContainer';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CustomerApi from "../../api/CustomerApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Modal } from 'react-bootstrap';
import { useParams, useLocation, useHistory } from "react-router-dom";
import { height } from "@mui/system";
import { Add, ConstructionOutlined } from "@mui/icons-material";
import { Box, Button, Grid, InputBase } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Slide from '@mui/material/Slide';
import Checkbox from '@mui/material/Checkbox';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



function KhachHangModal({ show, setShow ,setShowMail,setIds }) {
    const initValues = [];
    const initParams = {
        field: 'sumBill',
        known: 'down',
        page: 0,
        email: '',
        name: '',
        statusCustomer: '',
        statusOrder: 0,
        year: '',
        month: '',

    };
    var thang = [1,2,3,4,5,6,7,8,9,10,11,12];
    const [month, setMonth] = useState(thang);
    const [onCheck, setOnCheck] = useState(false);
    const [allID, setAllID] = useState([]);
    //biến lưu các id các tài khoản
    const [ids, setIdsModal] = useState([]);
    const [idCustom, setIdCustom] = useState(0);
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
                await CustomerApi.fillAll(params).then((response)=>{
                    setResult(response.content);
                    setCount(response.totalPages);
                    CustomerApi.findAllID(params).then(i=>{
                        setAllID(i)
                    })
                });
              
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

    const hide = async () => {
        await CustomerApi.hideCustomer(idCustom.id).then(() => {
            onLoad();
            setLog(false);
        }
        )
    }
    const tong = () => {
        let tong = 0;
        result.forEach((value)=>{
            tong = tong + value.total;
        }
        )
        return tong;
    }
    // hàm add id sản phẩm vào mảng ids
    const addID = (id, status) => {
        let nhanID = ids;
        // kiểm tra mảng tồn tại mã sp 
        if (ids.includes(id)) {
            // tìm vị trí 
            let index = ids.indexOf(id);
            // xóa khỏi mảng
            nhanID.splice(index, 1);
        } else {
            nhanID.push(id);
        }
        setIdsModal(nhanID);
        console.log(ids);
    }
    //check 
    const check=()=>{
        if(onCheck){
            setOnCheck(false)
            setIdsModal([])
        }else{
            setOnCheck(true)
            setIdsModal(allID)
        }
    }

    return (
        <div>
            <Modal size="lg" show={show} onHide={() =>{ setShow(false);setIdsModal([])}}   >
                <Modal.Header>
                    <h2>Danh sách tài khoản đã mua hàng tại web</h2>
                    <button type="button" class="btn-close" aria-label="Close" onClick={() => {setShow(false)}}></button>
                </Modal.Header>
                <Modal.Body>
                    <Box sx={{ marginBottom: 2 }}>
                        <Box mb={2}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                <Grid item xs={3}>
                                    <Box
                                        component="form"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1, background: '#f0f0f0', pt: 0.7, pb: 0.7, pl: 0.7 }}
                                            placeholder="Email ...."
                                            name="email"
                                            onChange={paramsChange}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl variant="filled" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label" >Trạng thái</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            size="small"
                                            value={params.statusOrder}
                                            label="Trạng thái hóa đơn"
                                            name="statusOrder"
                                            onChange={paramsChange}
                                        >
                                            <MenuItem value=''>Tất cả</MenuItem>
                                            <MenuItem value={0}>Giao hàng thành công</MenuItem>
                                            <MenuItem value={1}>Giao hàng thất bại</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                <FormControl variant="filled" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label" >Năm</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            size="small"
                                            value={params.year}
                                            label="Năm"
                                            name="year"
                                            onChange={paramsChange}
                                        >
                                            <MenuItem value=''>Tất cả</MenuItem>
                                            <MenuItem value={2021}>2021</MenuItem>
                                        </Select>
                                    </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControl variant="filled" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label" >Tháng</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            size="small"
                                            value={params.month}
                                            label="Tháng"
                                            name="month"
                                            onChange={paramsChange}
                                        >
                                            <MenuItem value=''>Tất cả</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={11}>11</MenuItem>
                                            <MenuItem value={9}>9</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={11}>11</MenuItem>
                                            <MenuItem value={12}>12</MenuItem>
                                            {
                                               month.forEach(t=>{
                                                <MenuItem value={t} >{t}</MenuItem>
                                               }) 
                                            }
                                        </Select>
                                    </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                            <button className="btn btn-primary" onClick={() => {setShow(false);setShowMail(true);setIds(ids)}} >Gửi Mail </button>
                            </Grid>
                             </Grid>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>

                        <table className="table table-striped dm">
                            <thead>
                                <tr>
                                    <td scope="col">STT</td>
                                    <td scope="col">Email</td>
                                    <td scope="col"><Button variant="text" onClick={() => upDown("sumBill")} >Số HD {params.statusOrder !== '' ? (params.statusOrder === 0 ? 'thành công' : 'thất bại') : ''}{params.field === 'sumBill' ? (params.known === 'up' ? <ArrowUpwardIcon color="primary" /> : <ArrowDownwardIcon color="primary" />) : ''}</Button></td>
                                    <td scope="col"><Button variant="text" onClick={() => upDown("tongSP")} >Tổng số sản phẩm đặt{params.field === 'tongSP' ? (params.known === 'up' ? <ArrowUpwardIcon color="primary" /> : <ArrowDownwardIcon color="primary" />) : ''}</Button></td>
                                    <td scope="col"><Button variant="text" onClick={() => upDown("total")} >Tổng số tiền đã mua {params.field === 'total' ? (params.known === 'up' ? <ArrowUpwardIcon color="primary" /> : <ArrowDownwardIcon color="primary" />) : ''}</Button></td>
                                    <td><Checkbox key={Math.random()} className="checkbox" color="secondary" defaultChecked={onCheck} onChange={() => check()} /></td>
                                </tr>
                            </thead>

                            <tbody style={{ height: "10px" }}>
                                {
                                    result.length > 0 ? result.map(
                                        (r, index) =>

                                            <tr>
                                                <td>{(index + 1) + Number(page - 1) * 10}</td>
                                                <td>{r.email}</td>
                                                <td>{r.sumBill}</td>
                                                <td>{r.tongSP}</td>
                                                <td>{String(Math.round(r.total / 1000) * 1000).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' VNĐ'}</td>
                                                <td><Checkbox key={Math.random()} className="checkbox" color="secondary" defaultChecked={ids.includes(r.id)} onChange={() => addID(r.id)} /></td>
                                            </tr>
                                    ) : (

                                        <div style={{ textAlign: "center", position: 'absolute', left: "50%", transform: `translate(${-50}%, ${0}px)` }}>Không có dữ liệu</div>
                                    )
                                }

                            </tbody>
                            <tfoot>
                                <td colSpan={6} >Tổng số tiền bản ghi : {String(Math.round(tong() / 1000) * 1000).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' VNĐ'}
                                </td>
                            </tfoot>
                        </table>
                    </TableContainer>
                    <Stack spacing={2}>
                        <Pagination className="d-flex justify-content-center" count={count} page={page} onChange={pageChange} color="secondary" />
                    </Stack>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default KhachHangModal;