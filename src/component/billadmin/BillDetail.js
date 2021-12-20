import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import BillAdminApi from '../../api/BillAdminApi';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as type from '../../redux/const/type';

const validation = yup.object().shape({
    name: yup.string().required("Họ và tên không được để trống!"),
    address: yup.string().required("Địa chỉ chi tiết không được để trống!"),
    phone: yup.string().required("Số điện thoại không được để trống!").matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, "Số điện thoại sai định dạng!"),
});

export default function BillDetail({
    fetchData,
}) {

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const bill = useSelector((state) => state.bill.form);
    const [form, setForm] = React.useState({});
    const [number, setNumber] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const success = useSelector((state) => state.bill.success);
    const data = useSelector((state) => state.bill.detail);
    const [tinh, setTinh] = React.useState({});
    const [huyen, setHuyen] = React.useState({});
    const [xa, setXa] = React.useState({});
    const [formAddress, setFormAddress] = React.useState({
        city: '',
        district: '',
        wards: '',
    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const changeNumber = (event) => {
        setNumber(event.target.value);
    }
    const onClickHandler = (event, value) => {
        setForm(value);
        console.log('value', value);
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validation)
    });

    const onSubmit = (params) => {
        const id = bill.id;
        let data = null;
        if (formAddress.city === null) {
            data = {
                ...bill,
                name: params.name,
                phone: params.phone,
                address: params.address,
            }
        } else {
            data = {
                ...bill,
                name: params.name,
                phone: params.phone,
                address: params.address,
                city: formAddress.city,
                district: formAddress.district,
                wards: formAddress.wards,
            }
        }

        console.log(data);
        dispatch({ type: type.UPDATE_BILL_STATUS_ORDER_ACTION, payload: { id, data } });
        if (success === true) {
            const message = 'Cập nhật thành công!';
            enqueueSnackbar(message, {
                variant: 'success',
            });
        } else {
            const message = 'Cập nhật thất bại!';
            enqueueSnackbar(message, {
                variant: 'error',
            });
        }
        const param = {
            _field: 'id',
            _known: 'up',
        };
        fetchData(id, param);
        setHuyen({});
        setXa({});
    };
    const updateBillDetail = async (id, data) => {
        id = form.id;
        data = {
            ...form,
            number: number,
        }
        console.log('form bill detail', data, id);
        if (number < 0 || number % 1 !== 0) {
            const message = 'Vui lòng nhập lại số lượng!';
            enqueueSnackbar(message, {
                variant: 'warning',
            });
            setNumber(null);
            return null;
        }
        if (!number) {
            const message = 'Nhập số lượng sản phẩm mới!';
            enqueueSnackbar(message, {
                variant: 'warning',
            });
            setNumber(null);
        }
        else {
            const param = {
                _field: 'id',
                _known: 'up',
            };
            try {
                const idBill = bill.id
                await BillAdminApi.updateBillDetail({ id, data });
                const message = 'Cập nhật thành công!';
                enqueueSnackbar(message, {
                    variant: 'success',
                });
                fetchData(idBill, param);
            } catch (error) {
                if (error.response.data.errorMessage) {
                    enqueueSnackbar(error.response.data.errorMessage, {
                        variant: 'warning',
                    });
                }
            }
            setNumber(null);
        }
    }
    const handleClose = () => {
        setOpen(false);
    };

    const EmlementDate = (props) => {
        const date = new Date(props.date);
        return (<>{date.getDate() - 1}/{date.getMonth() + 1}/{date.getFullYear()}</>);
    }
    function format(n, currency) {
        if (n) {
            return String(Math.round(n)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' đ';
            // return n.toFixed(0).replace(/(\d)(?=(\d{3}))/g, '$1,') + ' ' + currency;
        } else {
            return ("null");
        }
    }
    const onSwitchOrder = ((value) => {
        switch (value) {
            case 0:
                return 'Chờ xác nhận';
            case 1:
                return 'Đã xác nhận';
            case 2:
                return 'Đang giao hàng';
            case 3:
                return 'Hoàn thành';
            case 4:
                return 'Thất bại';
            case 5:
                return 'Từ chối';
            default:
                return (<p>Không có trạng thái</p>);
        }
    });

    // quận huyện, thành phố

    React.useEffect(() => {
        const fetchList = () => {
            axios({
                method: 'get',
                url: 'https://provinces.open-api.vn/api/?depth=2',
            })
                .then(function (response) {
                    setTinh(response.data);
                });
        }
        fetchList();
    }, []);

    const handleChangeTinh = (event) => {
        axios({
            method: 'get',
            url: `https://provinces.open-api.vn/api/p/${event.target.value}/?depth=2`,
        })
            .then(function (response) {
                setHuyen(response.data.districts);
                setFormAddress({
                    ...formAddress,
                    city: response.data.name,
                });
            });
    };
    const handleChangeHuyen = (event) => {
        axios({
            method: 'get',
            url: `https://provinces.open-api.vn/api/d/${event.target.value}/?depth=2`,
        })
            .then(function (response) {
                setXa(response.data.wards);
                setFormAddress({
                    ...formAddress,
                    district: response.data.name,
                });
            });
    };
    const handleChangeXa = (event) => {
        setFormAddress({
            ...formAddress,
            wards: event.target.value,
        });
    };

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChangePanel = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <React.Fragment>
            <IconButton color="primary" onClick={handleClickOpen}>
                <VisibilityIcon />
            </IconButton>
            <Dialog
                maxWidth={"md"}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Chi tiết hóa đơn</DialogTitle>
                <DialogContent>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="h5">
                                        Khách hàng
                                    </Typography>
                                    {bill.status_order === 0 ? <TextField mt={2} label='Tên khách hàng' fullWidth variant="standard" defaultValue={bill.name}
                                        {...register("name")}
                                        error={errors.name ? true : false}
                                        helperText={errors.name ? errors.name.message : false}
                                    /> :
                                        <Typography variant="body1" mt={2}>
                                            Họ tên: {bill.name}
                                        </Typography>}
                                    <Typography variant="body1" mt={2}>
                                        Email: {bill.email}
                                    </Typography>
                                    {bill.status_order === 0 ? <TextField mt={2} label='Số điện thoại' fullWidth variant="standard" defaultValue={bill.phone}
                                        {...register("phone")}
                                        error={errors.phone ? true : false}
                                        helperText={errors.phone ? errors.phone.message : false}
                                    /> :
                                        <Typography variant="body1" mt={2}>
                                            SĐT: {bill.phone}
                                        </Typography>}
                                    <Typography variant="body1" mt={2}>
                                        Địa chỉ: {bill.address + ', ' + bill.wards + ', ' + bill.district + ', ' + bill.city}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5">
                                        Đơn hàng
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Ngày tạo: <EmlementDate date={bill.create_date} />
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Ngày cập nhật: <EmlementDate date={bill.update_date} />
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Mã hóa đơn: {bill.id_code}
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Trạng thái giao hàng: {onSwitchOrder(bill.status_order)}
                                    </Typography>
                                    {bill.status_order === 5 || bill.status_order === 4 ? (
                                        <Typography variant="body2" mt={2}>
                                            Lý do: {bill.describe}
                                        </Typography>
                                    ) : null}
                                    <Typography variant="body2" mt={2}>
                                        Trạng thái thanh toán: {bill.status_pay === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Tổng tiền: {format(bill.total, 'VNĐ')}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {bill.status_order === 0 ?
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChangePanel('panel1')}>
                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                        <Typography>Đổi địa chỉ</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <FormControl fullWidth variant='filled'>
                                                    <InputLabel id="city">Tỉnh</InputLabel>
                                                    <Select
                                                        labelId="city"
                                                        label="Tỉnh"
                                                        size='small'
                                                        onChange={handleChangeTinh}
                                                    >
                                                        {tinh.length ? tinh.map((item) => (
                                                            <MenuItem key={item.code} value={`${item.code}`}>{item.name}</MenuItem>
                                                        )) : <MenuItem>Tỉnh</MenuItem>}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FormControl fullWidth variant='filled'>
                                                    <InputLabel id="district">Quận/Huyện</InputLabel>
                                                    <Select
                                                        labelId="district"
                                                        label="Quận/Huyện"
                                                        size='small'
                                                        onChange={handleChangeHuyen}
                                                    >
                                                        {huyen.length ? huyen.map((item) => (
                                                            <MenuItem key={item.code} value={`${item.code}`}>{item.name}</MenuItem>
                                                        )) : <MenuItem>Huyện</MenuItem>}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FormControl fullWidth variant='filled'>
                                                    <InputLabel id="wards">Xã</InputLabel>
                                                    <Select
                                                        labelId="wards"
                                                        label="Xã"
                                                        size='small'
                                                        onChange={handleChangeXa}
                                                    >
                                                        {xa.length ? xa.map((item) => (
                                                            <MenuItem key={item.code} value={`${item.name}`}>{item.name}</MenuItem>
                                                        )) : <MenuItem>Xã</MenuItem>}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <TextField label='Địa chỉ chi tiết' fullWidth variant="standard" defaultValue={bill.address}
                                            multiline
                                            margin='dense'
                                            rows={2}
                                            {...register("address")}
                                            error={errors.address ? true : false}
                                            helperText={errors.address ? errors.address.message : false}
                                        />
                                    </AccordionDetails>
                                </Accordion> : null}
                        </CardContent>
                    </Card>
                    <TableContainer>
                        <h4>Mặt hàng đã mua</h4>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell>Ảnh</TableCell>
                                    <TableCell>Số lượng</TableCell>
                                    <TableCell>Đơn giá</TableCell>
                                    <TableCell>Tổng</TableCell>
                                    {bill.status_order === 0 ? <TableCell>Hoạt động</TableCell> : null}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.length > 0 ? data.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        onClick={
                                            (event) => {
                                                onClickHandler(event, row, index);
                                            }
                                        }
                                    >
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{row.product.name}</TableCell>
                                        <TableCell><img src={`url/${row.product.photo}`} alt="ảnh"></img></TableCell>
                                        <TableCell>
                                            {bill.status_order === 0 ?
                                                (<input type='number' onChange={changeNumber} defaultValue={row.number} style={{ maxWidth: "56px" }}></input>) :
                                                row.number}
                                        </TableCell>
                                        <TableCell>{format(row.price, 'VNĐ')}</TableCell>
                                        <TableCell>{format(row.total, 'VNĐ')}</TableCell>
                                        {bill.status_order === 0 ? <TableCell><Button size='small' onClick={updateBillDetail}>cập nhật</Button></TableCell> : null}
                                    </TableRow>
                                )) : (<div>null</div>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Đóng</Button>
                    <Button onClick={handleSubmit(onSubmit)}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    '&:before': {
        display: 'none',
    },
    padding: '0px',
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        {...props}
    />
))(({ theme }) => ({
    flexDirection: 'row-reverse',
    padding: '0px',
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
}));
