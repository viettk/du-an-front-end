import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, memo, useState } from "react";
import { useDispatch } from "react-redux";
import BillDetail from "./BillDetail";
import * as type from '../../redux/const/type';

function ModelBill(
    {
        bill,
        params,
        setParams,
        count,
    }
) {
    const initBill = {
        id: null,
        email: '',
        create_date: '',
        update_date: '',
        name: '',
        phone: '',
        total: '',
        status_pay: '',
        address: '',
        city: '',
        district: '',
        status_order: '',
        thema: '',
        themb: '',
        themc: '',
        staff_id: '',
        discount_id: '',
        id_code: '',
    }
    const dispatch = useDispatch();
    const [formDataBill, setFormDataBill] = useState(initBill);
    const [clicked, setClicked] = useState(-1);
    //phan trang
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setParams({
            ...params,
            _page: newPage,
        })
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setParams({
            ...params,
            _page: '0',
            _limit: parseInt(event.target.value, 10),
        })
        console.log(parseInt(event.target.value, 10));
    };
    //handler
    const onClickHandler = (event, value, index) => {
        setClicked(index);
        setFormDataBill(value);
    }
    //update
    const onClickUpdateHandler = async (id, data) => {
        id = bill[clicked].id;
        const value = bill[clicked].status_order;
        let order = '';
        let order_pay = '';
        switch (value) {
            case 'Chờ xác nhận':
                order = 'Đã xác nhận';
                break;
            case 'Đã xác nhận':
                order = 'Đang chuẩn bị hàng';
                break;
            case 'Đang chuẩn bị hàng':
                order = 'Đang giao hàng';
                break;
            case 'Đang giao hàng':
                order = 'Giao hàng thành công';
                order_pay = 'Đã thanh toán';
                break;
            case 'Giao hàng thành công':
                order = 'Hoàn thành';
                order_pay = 'Đã thanh toán';
                break;
            case 'Đơn hoàn trả':
                order = 'Hoàn thành';
                order_pay = 'Đã thanh toán';
                break;
            default:
                break;
        }
        data = {
            ...formDataBill,
            status_order: order,
            status_pay: order_pay,
        }
        dispatch({ type: type.UPDATE_BILL_STATUS_ORDER_ACTION, payload: { id, data } });
        handleClose();
    }
    // hủy giao hàng chờ giao lại
    const onCanceBill = async (id, data) => {
        id = bill[clicked].id;
        const value = bill[clicked].status_order;
        let order = '';
        switch (value) {
            case 'Đang giao hàng':
                order = 'Thất bại';
                break;
            case 'Chờ xác nhận':
                order = 'Đã hủy';
                break;
            default:
                break;
        }
        data = {
            ...formDataBill,
            status_order: order,
        }
        dispatch({ type: type.UPDATE_BILL_STATUS_ORDER_ACTION, payload: { id, data } });
        handleCloseCB();
    }
    const onSwitchFunction = ((value) => {
        switch (value) {
            case 'Chờ xác nhận':
                return (
                    <div>
                        <Button size="small" variant="text" onClick={handleClickOpen}>Xác nhận</Button>
                        <Button size="small" variant="text" onClick={handleClickOpenCB}>Hủy</Button>
                    </div>);
            case 'Đã hủy':
                return (<p>Đã hủy</p>);
            case 'Đã xác nhận':
                return (<Button size="small" variant="text" onClick={handleClickOpen}>Chuẩn bị hàng</Button>);
            case 'Đang chuẩn bị hàng':
                return (<Button size="small" variant="text" onClick={handleClickOpen}>Giao hàng</Button>);
            case 'Đang giao hàng':
                return (<div>
                    <Button size="small" variant="text" onClick={handleClickOpen}>Nhận hàng</Button>
                    <Button size="small" variant="text" onClick={handleClickOpenCB}>Hủy</Button>
                        </div>);
            case 'Thất bại':
                return (<p>Thất bại</p>);
            case 'Hoàn thành':
                return (<p>Hoàn thành</p>);
            case 'Giao hàng thành công':
                return (<p>Giao hàng thành công</p>);
            case 'Đơn hoàn trả':
                return (<p>Đơn hoàn trả</p>);
            default:
                return (<p>Không cập nhật được</p>);
        }
    });

    //dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [openCB, setOpenCB] = React.useState(false);

    const handleClickOpenCB = () => {
        setOpenCB(true);
    };

    const handleCloseCB = () => {
        setOpenCB(false);
    };
    return (
        <Fragment>
            {bill ? (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ minHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead style={{ background: "#ccc" }}>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Họ và tên</TableCell>
                                    <TableCell>Số điện thoại</TableCell>
                                    <TableCell>Địa chỉ</TableCell>
                                    <TableCell>Trạng thái hóa đơn</TableCell>
                                    <TableCell>Trạng thái thanh toán</TableCell>
                                    <TableCell>Mã hóa đơn</TableCell>
                                    <TableCell>Tổng tiền</TableCell>
                                    <TableCell>Hoạt động</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bill.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        onClick={
                                            (event) => {
                                                onClickHandler(event, row, index);
                                            }
                                        }
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell>{row.status_order}</TableCell>
                                        <TableCell>{row.status_pay}</TableCell>
                                        <TableCell>{row.id_code}</TableCell>
                                        <TableCell>{row.total}</TableCell>
                                        <TableCell>{onSwitchFunction(row.status_order)}</TableCell>
                                        <TableCell><BillDetail id={row.id} formDataBill={formDataBill} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={count}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>) : (
                <Box sx={{ textAlign: "center", marginTop: "50px" }}>
                    <Typography variant="subtitle1">Không có dữ liệu!</Typography>
                </Box>
            )}
            {/* confirm */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Xác nhận
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lưu ý sau khi thay đổi trạng thái sẽ không quay lại được trạng thái trước đó.
                        Bạn chắc chắn muốn thay đổi trậng thái đơn hàng!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Hủy bỏ
                    </Button>
                    <Button onClick={onClickUpdateHandler}>Lưu</Button>
                </DialogActions>
            </Dialog>
            {/* hủy */}
            <Dialog
                open={openCB}
                onClose={handleCloseCB}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Xác nhận hủy hóa đơn!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lưu ý sau khi thay đổi trạng thái sẽ không quay lại được trạng thái trước đó.
                        Bạn chắc chắn muốn thay đổi trậng thái đơn hàng!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseCB}>
                        Hủy bỏ
                    </Button>
                    <Button onClick={onCanceBill}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    );
}
export default memo(ModelBill);