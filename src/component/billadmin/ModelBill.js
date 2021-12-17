import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, memo, useState } from "react";
import { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as type from '../../redux/const/type';
import { useSnackbar } from 'notistack';
//lazy gọi đến mới load componet
const BillDetail = lazy(() => import("./BillDetail"));

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
        status_pay: null,
        address: '',
        city: '',
        district: '',
        status_order: null,
        thema: '',
        themb: '',
        themc: '',
        staff_id: '',
        discount_id: '',
        id_code: '',
    }
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [formDataBill, setFormDataBill] = useState(initBill);
    const [clicked, setClicked] = useState(-1);
    const success = useSelector((state) => state.bill.success);
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
    const onClickUpdateHandler = (id, data) => {
        id = bill[clicked].id;
        const value = bill[clicked].status_order;
        let order = null;
        let pay = null;
        switch (value) {
            case 0:
                order = 1;
                break;
            case 1:
                order = 2;
                break;
            case 2:
                order = 3;
                pay = 1;
                break;
            default:
                break;
        }
        data = {
            ...formDataBill,
            status_order: order,
            status_pay: pay,
        }
        dispatch({ type: type.UPDATE_BILL_STATUS_ORDER_ACTION, payload: { id, data } });
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
        handleClose();
    }
    // hủy giao hàng chờ giao lại
    const onCanceBill = async (id, data) => {
        id = bill[clicked].id;
        const value = bill[clicked].status_order;
        let order = null;
        switch (value) {
            case 2:
                order = 4;
                break;
            case 0:
                order = 5;
                break;
            default:
                break;
        }
        data = {
            ...formDataBill,
            status_order: order,
        }
        dispatch({ type: type.UPDATE_BILL_STATUS_ORDER_ACTION, payload: { id, data } });
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
        handleCloseCB();
    }
    const onSwitchFunction = ((value) => {
        switch (value) {
            case 0:
                return (
                    <div>
                        <Button size="small" variant="text" onClick={handleClickOpen}>Xác nhận</Button>
                        <Button size="small" variant="text" onClick={handleClickOpenCB}>Hủy</Button>
                    </div>);
            case 1:
                return (<Button size="small" variant="text" onClick={handleClickOpen}>Giao hàng</Button>);
            case 2:
                return (<div>
                    <Button size="small" variant="text" onClick={handleClickOpen}>Nhận hàng</Button>
                    <Button size="small" variant="text" onClick={handleClickOpenCB}>Hủy</Button>
                </div>);
            case 3:
                return 'Thành công';
            case 4:
                return 'Thất bại';
            case 5:
                return 'Đã từ chối';
            default:
                return 'Không cập nhật được';
        }
    });
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

    function format(n, currency) {
        if (n) {
            return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + currency;
        } else {
            return ("null");
        }
    }
    return (
        <Fragment>
            {bill.length > 0 ? (
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
                                        <TableCell>{onSwitchOrder(row.status_order)}</TableCell>
                                        <TableCell>{row.status_pay === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</TableCell>
                                        <TableCell>{row.id_code}</TableCell>
                                        <TableCell>{format(row.total, 'VNĐ')}</TableCell>
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