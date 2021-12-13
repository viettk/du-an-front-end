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
import { useDispatch, useSelector } from 'react-redux';
import * as type from '../../redux/const/type';
import './bill.css';

export default function BillDetail({
    id,
    formDataBill,
}) {

    const param = {
        _field: 'id',
        _known: 'up',
    };
    const dispatch = useDispatch();
    const response = useSelector((state) => state.bill.detail);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        dispatch({ type: type.FETCH_BILL_DETAIL_ACTION, payload: { id, param } });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const EmlementDate = (props) => {
        const date = new Date(props.date);
        return (<>{date.getDate() - 1}/{date.getMonth() + 1}/{date.getFullYear()}</>);
    }
console.log(response.product)
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
                                        Trạng thái thanh toán: {formDataBill.status_pay}
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Tổng tiền: {formDataBill.total}VNĐ
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {response.length > 0 ? response.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{row.product.name}</TableCell>
                                        <TableCell><img src={'https://tranhoangmaianh.herokuapp.com/images/' +row.product.photo} className='bdt-img-pro' /></TableCell>
                                        <TableCell>{row.number}</TableCell>
                                        <TableCell>{row.price}</TableCell>
                                        <TableCell>{row.total}</TableCell>
                                    </TableRow>
                                )) : (<div>Không có Sản phẩm</div>)}
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
