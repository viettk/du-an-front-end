import React, { useEffect, useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductApi from "../../api/ProductApi";
import CategoryApi from "../../api/CategoryApi";
import ProductModal from "./ProductModal";
import Button from '@mui/material/Button';
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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ProductAd() {
    const initValues = [];
    const initParams = {
        _limit: '5',
        _page: 0,
        _field: 'id',
        _known: 'up'
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
    const [parent, setParent] = useState([]);
    const [search, setSearch] = useState({
        categoryName: '',
        name: '',
        create_date: '',
        price: '',
        status: ''
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
                const response = await ProductApi.getAll(params, search.name, search.price, search.categoryName, search.create_date, search.status);
                setResult(response.content);
                if (response.totalPages === 0) {
                    setCount(response.totalPages);
                    console.log(null)
                    return;
                }
                if (response.totalPages < count) {
                    setPage(response.totalPages)
                    setCount(response.totalPages);
                    handleChange(null, response.totalPages)
                } else {
                    setCount(response.totalPages);
                }
                const resp = await CategoryApi.getParent();
                setParent(resp);

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
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={thongBao.id === '' ? anHienNSP : anHienSP}>Agree</Button>
                </DialogActions>
            </Dialog>
            {/* snackbar thành công */}
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>

            <ProductModal show={show} setShow={setShow} ma={ma} setMa={setMa} onLoad={onLoad} setOpen={setOpen} />
            <h3 style={{ marginTop: 10 }}>Danh sách Danh mục Sản phẩm</h3>
            <TableContainer component={Paper}>
                <button className="btn btn-primary" onClick={() => create()} >Thêm mới</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td></td>
                            <td></td>
                            <td> <TextField label="Tên sản phẩm" name="name" onChange={paramsChange} variant="outlined" /></td>
                            <td>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={search.categoryName}
                                        label="Danh mục"
                                        name="categoryName"
                                        onChange={paramsChange}
                                    >
                                        <MenuItem value=''>Tất cả</MenuItem>
                                        {
                                        parent.map(parent => (
                                            <MenuItem value={parent}>{parent}</MenuItem>
                                        ))
                                        }                                       
                                    </Select>
                                </FormControl>
                                </Box>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ textAlign: "center" }}>
                            <th scope="col">STT</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tên Sản phẩm</th>
                            <th scope="col">Danh mục</th>
                            <th scope="col"><Button variant="text" onClick={() => upDown("price")} >Giá{params._field === 'price' ? (params._known === 'up' ? <ArrowDownwardIcon color="primary" /> : <ArrowUpwardIcon color="primary" />) : ''}</Button></th>
                            <th scope="col">Giám giá</th>
                            <th scope="col"><Button variant="text" onClick={() => upDown("id")}>Ngày tạo{params._field === 'id' ? (params._known === 'up' ? <ArrowDownwardIcon color="primary" /> : <ArrowUpwardIcon color="primary" />) : ''}</Button></th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Thao tác nhanh {search.status !== '' ? <Button variant="contained" color={search.status ? 'error' : 'warning'} onClick={() => dialog('', 'đã chọn', search.status)}>{search.status ? 'Vô hiệu' : 'Hoạt động'}</Button> : ''}</th>
                        </tr>
                    </tbody>
                    <tfoot style={{ height: "10px" }}>
                        {
                            result.length > 0 ? result.map(
                                (result, index) =>
                                    <tr className="sp" key={result.id} >
                                        <td>{(index + 1)+Number(page-1)*5}</td>
                                        <td><img src={'https://tranhoangmaianh.herokuapp.com/images/' + result.photo} style={{ width: 100 }} /></td>
                                        <td>{result.name}</td>
                                        <td>{result.category.name}</td>
                                        <td>{String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' đ'}</td>
                                        <td>{(result.value_extra) ? result.value_extra : '0'}%</td>
                                        <td>{(result.createDate.split('T')[0]).split('-').reverse().join('-')}</td>
                                        <td>{result.number}</td>
                                        <td>
                                            <Button variant="contained" color="success" onClick={() => xemChitiet(result.id)}>
                                                Xem
                                            </Button>

                                            <Button variant="contained" disabled={search.status !== ''} color={result.status ? 'warning' : 'error'} onClick={() => dialog(result.id, result.name, result.status)}>{result.status ? 'Hoạt động' : 'Vô hiệu'}</Button>
                                        </td>
                                        <td><Checkbox key={Math.random()} className="checkbox" color="secondary" defaultChecked={ids.includes(result.id)} onChange={() => addID(result.id, result.status)} /></td>
                                    </tr>

                            ) : (

                                <div style={{ textAlign: "center", position: 'absolute', left: "50%", transform: `translate(${-50}%, ${0}px)` }}>Không có dữ liệu</div>
                            )
                        }
                    </tfoot>
                </table>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination className="d-flex justify-content-center" count={count} page={page} onChange={handleChange} color="secondary" />
            </Stack>
        </React.Fragment>
    );
}
export default ProductAd;