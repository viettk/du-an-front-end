import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as type from '../../redux/const/type';
import BillAdminApi from '../../api/BillAdminApi';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

export default function BillDetail({
    id,
    formDataBill,
}) {

    const param = {
        _field: 'id',
        _known: 'up',
    };
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [form, setForm] = React.useState({});
    const [number, setNumber] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({});
    const reload = useSelector((state) => state.bill.reload);
    const success = useSelector((state) => state.bill.success);
    const handleClickOpen = () => {
        setOpen(true);
    };

    React.useEffect(() => {
        const fetchListDtail = async () => {
            const value = {
                param: param,
                id: id,
            }
            try {
                const response = await BillAdminApi.getBillDetailByBill(value);
                setData(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchListDtail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload, success]);

    const changeNumber = (event) => {
        setNumber(event.target.value);
    }
    const onClickHandler = (event, value, index) => {
        setForm(value);
    }
    const updateBillDetail = (id, data) => {
        id = form.id;
        data = {
            ...form,
            number: number,
        }
        console.log("số", number);
        if (!number) {
            const message = 'Nhập số lượng sản phẩm mới!';
            enqueueSnackbar(message, {
                variant: 'warning',
            });
            enqueueSnackbar('Cập nhật thất bại!', {
                variant: 'error',
            });
        }
        else {
            dispatch({ type: type.UPDATE_BILL_DETAIL_ACTION, payload: { id, data } });
            setNumber(null);
            if (success) {
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
            return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + currency;
        } else {
            return ("null");
        }
    }
    return (
        <React.Fragment>
            <IconButton color="primary" onClick={handleClickOpen}>
                <VisibilityIcon />
            </IconButton>
            <Dialog
                fullWidth={true}
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
                                    <Typography variant="body1" mt={2}>
                                        Họ tên: {formDataBill.name}
                                    </Typography>
                                    <Typography variant="body1" mt={2}>
                                        Email: {formDataBill.email}
                                    </Typography>
                                    <Typography variant="body1" mt={2}>
                                        SĐT: {formDataBill.phone}
                                    </Typography>
                                    <Typography variant="body1" mt={2}>
                                        Địa chỉ: {formDataBill.address + ', ' + formDataBill.district + ', ' + formDataBill.city}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5">
                                        Đơn hàng
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Ngày tạo: <EmlementDate date={formDataBill.create_date} />
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Ngày cập nhật: <EmlementDate date={formDataBill.update_date} />
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Mã hóa đơn: {formDataBill.id_code}
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Trạng thái giao hàng: {formDataBill.status_order}
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Trạng thái thanh toán: {formDataBill.status_pay === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Tổng tiền: {format(formDataBill.total, 'VNĐ')}
                                    </Typography>
                                </Grid>
                            </Grid>
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
                                    {formDataBill.status_order === 0 ? <TableCell>Hoạt động</TableCell> : null}
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
                                            {formDataBill.status_order === 0 ?
                                                (<input type='number' onChange={changeNumber} defaultValue={row.number} style={{ maxWidth: "56px" }}></input>) :
                                                row.number}
                                        </TableCell>
                                        <TableCell>{format(row.price, 'VNĐ')}</TableCell>
                                        <TableCell>{format(row.total, 'VNĐ')}</TableCell>
                                        {formDataBill.status_order === 0 ? <TableCell><Button size='small' onClick={updateBillDetail}>cập nhật</Button></TableCell> : null}
                                    </TableRow>
                                )) : (<div>null</div>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}
