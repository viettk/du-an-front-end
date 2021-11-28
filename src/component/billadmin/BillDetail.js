import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import BillAdminApi from '../../api/BillAdminApi';

export default function BillDetail({
    id,
    formDataBill,
}) {

    const [billDetail, setBillDetail] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        const fetchListBillDetail = async () => {
            const params = {
                _field: 'id',
                _known: 'up',
            };
            try {
                const respose = await BillAdminApi.getBillDetailByBill(id, params);
                setBillDetail(respose);
            } catch (error) {
                console.log(error);
            }
        }
        fetchListBillDetail();
    }, [id])

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen}>
                <i className="fas fa-eye"></i>
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Chi tiết hóa đơn</DialogTitle>
                <DialogContent>
                    <p>Họ tên: {formDataBill.name}</p>
                    <p>Email: {formDataBill.email}</p>
                    <p>SĐT: {formDataBill.phone}</p>
                    <p>Địa chỉ: {formDataBill.address + ', ' + formDataBill.district + ', ' + formDataBill.city}</p>
                    <p>Mã hóa đơn: {formDataBill.id_code}</p>
                    <p>Trạng thái giao hàng: {formDataBill.status_order}</p>
                    <p>Trạng thái thanh toán: {formDataBill.status_pay}</p>
                    <p>Tổng tiền: {formDataBill.total}</p>
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
                                {billDetail.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{row.product.name}</TableCell>
                                        <TableCell><img src={`url/${row.product.photo}`} alt="ảnh"></img></TableCell>
                                        <TableCell>{row.number}</TableCell>
                                        <TableCell>{row.price}</TableCell>
                                        <TableCell>{row.total}</TableCell>
                                    </TableRow>
                                ))}
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
