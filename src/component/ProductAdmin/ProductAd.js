import React, { useEffect, useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductApi from "../../api/ProductApi";
import CategoryApi from "../../api/CategoryApi";
import ProductModal from "./ProductModal";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Checkbox from '@mui/material/Checkbox';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TableRow from '@mui/material/TableRow';
import { Button, FormControl, Grid, IconButton, InputBase, InputLabel, MenuItem, Select } from "@mui/material";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import CreateIcon from '@mui/icons-material/Create';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Add from "@mui/icons-material/Add";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ProductAd() {
    const initValues = [];
    const initParams = {
        _limit: '10',
        _page: 0,
        _field: 'id',
        _known: ''
    };
    //biến lưu các id sản phẩm ẩn hiện
    const [ids, setIds] = useState([]);
    // biến lấy thông tin sp ghép vào thông báo
    const [thongBao, setThongBao] = useState({ id: '' });
    // biến show dialog
    const [log, setLog] = useState(false);
    // biến show thông báo thực hiện thành công
    const [open, setOpen] = React.useState(false);
    const [params, setParams] = useState(initParams);
    const [result, setResult] = useState(initValues);
    const [page, setPage] = useState(initParams._page + 1);
    const [count, setCount] = useState(0);
    // biến load lại trang
    const [load, setLoad] = useState(false);
    const onLoad = () => {
        if (load) {
            setLoad(false)
        } else {
            setLoad(true)
        }
    }
    

    //lấy danh sách danh mục
    const [danhMuc, setDanhMuc] = useState([]);
    const [search, setSearch] = useState({
        categoryName: '',
        name: '',
        create_date: '',
        price: '',
        status: '',
        categoryId: ''
    });

    const paramsChange = (event) => {
        const { name, value } = event.target;
        // setPage(1)
        // setParams({...params, _page: 0})
        setSearch({
            ...search,
            [name]: value
        });
    };

    // lấy id sản phẩm
    const [ma, setMa] = useState(0);
    // Mở modal
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await ProductApi.getAll(params, search.name, search.price, search.categoryId, search.create_date, search.status);
                setResult(response.content);
                const resp = await CategoryApi.getForProduct();
                setDanhMuc(resp);
                if (response.totalPages === 0) {
                    setCount(response.totalPages);
                    return;
                }
                if (response.totalPages < count) {
                    setPage(response.totalPages)
                    setCount(response.totalPages);
                    handleChange(null, response.totalPages)
                } else {
                    setCount(response.totalPages);
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [search, load]);

    const handleChange = (event, value) => {
        setPage(value);
        setParams(
            {
                ...params,
                _limit: '5',
                _page: value - 1,
            }
        );
        onLoad();
    };

    const create = () => {
        setShow(true);
    }

    const xemChitiet = (id) => {
        setMa(id);
        setShow(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setLog(false);
    };
    // hàm ghép thông báo
    const dialog = (id, name, status) => {
        let trangThai = status ? 'Vô Hiệu' : 'Hoạt Động';
        setThongBao({ id: id, name: name, status: status })
        setLog(true)
    }
    // hàm ẩn hiện 1 sp
    const anHienSP = () => {
        productHide(thongBao.id);
    }
    //hàm ẩn hiện nhiều sp
    const anHienNSP = () => {
        productHide(ids);
    }
    
    //hàm api chung xử lý ẩn hiện sp
    const productHide = async (dsID) => {
        let listId;
        if (Array.isArray(dsID)) {
            listId = dsID.join(',');
        } else {
            listId = dsID
        }
        await ProductApi.hideProduct(listId).then(resp => {
            setThongBao({ id: '' })
            setOpen(true);
            setLog(false)
            if (Array.isArray(dsID)) {
                setIds([]);
                setSearch({ ...search, status: '' })
            } else { onLoad(); }
        }).catch(error => {
            console.log(error)
        })
    }
    // hàm add id sản phẩm vào mảng ids
    const addID = (id, status) => {
        let nhanID = ids;

        if (ids.length === 0) {
            setSearch({ ...search, status: status })
        }
        // kiểm tra mảng tồn tại mã sp 
        if (ids.includes(id)) {
            // tìm vị trí 
            let index = ids.indexOf(id);
            // xóa khỏi mảng
            nhanID.splice(index, 1);
        } else {
            nhanID.push(id);
        }
        if (nhanID.length === 0) {
            setSearch({ ...search, status: '' })
        }

        setIds(nhanID);
    }
    const upDown = (field) => {
        if (field === params._field) {
            let ud = params._known === 'up' ? 'down' : 'up';
            setParams({ ...params, _known: ud })
        } else {
            setParams({ ...params, _known: 'up', _field: field })
        }
        onLoad();
    }

// sét tổng sổ bán ghi muốn trả về 
const handleChangeRowsPerPage = (event) => {
    setParams({...params,_limit: event.target.value})
  };
    return (

        <React.Fragment>
            {/* dialog */}
            <Dialog
                open={log}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide">Bạn muốn {thongBao.status ? 'Vô Hiệu' : 'Hoạt Động'} sản phẩm {thongBao.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {thongBao.status ? 'Khi vô hiệu sản phẩm sẽ không được bán trên trang web nữa' : 'Khi hoạt động sản phẩm sẽ được bán trên trang web'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Không</Button>
                    <Button onClick={thongBao.id === '' ? anHienNSP : anHienSP}>Đồng ý</Button>
                </DialogActions>
            </Dialog>
            {/* snackbar thành công */}
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Thực hiện thành công!
                </Alert>
            </Snackbar>


            <h3 style={{ marginTop: 10 }}>Danh sách Sản phẩm</h3>
            {/* sửa  */}
            <Box sx={{ marginBottom: 2 }}>
                <Box mb={2}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3}} sx={{alignItems: 'center'}}>
                        <Grid item xs={2}>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">Danh mục</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    size="small"
                                    value={search.categoryId}
                                    label="Danh mục"
                                    name="categoryId"
                                    onChange={paramsChange}
                                >
                                    <MenuItem value=''>Tất cả</MenuItem>
                                    {
                                        danhMuc.map(parent => (
                                            <MenuItem value={parent.id}>{parent.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
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
                                    placeholder="Tên sản phẩm ...."
                                    name="name"
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
                                    value={search.status}
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
           
            <button className="btn btn-primary" onClick={() => create()} >Thêm mới <Add/></button>
            
            <Box sx={{ marginBottom: 2 }}>
                <ProductModal show={show} setShow={setShow} ma={ma} setMa={setMa} onLoad={onLoad} setOpen={setOpen} danhMuc={danhMuc} />
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ minHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead style={{ background: "#ccc" }}>
                            <TableRow>
                                <TableCell>Stt</TableCell>
                                <TableCell>Mã sản phẩm</TableCell>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>Ảnh</TableCell>
                                <TableCell>Danh mục</TableCell>
                                <TableCell><Button variant="text" onClick={() => upDown("price")} >Giá{params._field === 'price' ? (params._known === 'up' ? <ArrowUpwardIcon color="primary" /> : <ArrowDownwardIcon color="primary" />) : ''}</Button></TableCell>
                                <TableCell>Giảm giá</TableCell>
                                <TableCell><Button variant="text" onClick={() => upDown("id")}>Ngày tạo{params._field === 'id' ? (params._known === 'up' ? <ArrowUpwardIcon color="primary" /> : <ArrowDownwardIcon color="primary" />) : ''}</Button></TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Hoạt động {(search.status !== '' &&  ids.length > 0 ) ? <Button variant="contained" color={search.status ? 'error' : 'warning'} onClick={() => dialog('', 'đã chọn', search.status)}>{search.status ? 'Vô hiệu' : 'Hoạt động'}</Button> : ''}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                result.length > 0 ? result.map(
                                    (result, index) =>
                                        <TableRow className="sp" key={result.id} >
                                            <TableCell>{(index + 1) + Number(page - 1) * 5}</TableCell>
                                            <TableCell>{result.sku}</TableCell>
                                            <TableCell>{result.name}</TableCell>
                                            <TableCell><img src={'http://localhost:8080/images/' + result.photo} style={{ width: 100 }} /></TableCell>
                                            <TableCell>{result.category.name}</TableCell>
                                            <TableCell>{String(Math.round(result.price/1000)*1000).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' VNĐ'}</TableCell>
                                            <TableCell>{(result.value_extra) ? result.value_extra : '0'}%</TableCell>
                                            <TableCell>{(result.createDate.split('T')[0]).split('-').reverse().join('-')}</TableCell>
                                            <TableCell>{result.number}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="success" onClick={() => xemChitiet(result.id)}>
                                                   <CreateIcon sx ={{fontSize:16}}/>
                                                </Button>

                                                <Button variant="contained" disabled={search.status !== '' && ids.length>0} color={result.status ? 'warning' : 'error'} onClick={() => dialog(result.id, result.name, result.status)}>{result.status ? <NotificationsActiveIcon/> : <NotInterestedIcon/>}</Button>
                                            </TableCell>
                                            <TableCell><Checkbox key={Math.random()} className="checkbox" color="secondary" defaultChecked={ids.includes(result.id)} onChange={() => addID(result.id, result.status)} /></TableCell>
                                        </TableRow>

                                ) : (

                                    <div style={{ textAlign: "center", position: 'absolute', left: "50%", transform: `translate(${-50}%, ${0}px)` }}>Không có dữ liệu</div>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2}>
                <Pagination className="d-flex justify-content-center" count={count} page={page} onChange={handleChange} color="secondary" />
            </Stack>
            </Paper>
            {/* sửa end */}
           
        </React.Fragment>
    );
}
export default ProductAd;