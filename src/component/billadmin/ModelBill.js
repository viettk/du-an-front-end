import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, memo, useCallback, useState } from "react";
import { lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as type from '../../redux/const/type';
import { useSnackbar } from 'notistack';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//lazy gọi đến mới load componet
const BillDetail = lazy(() => import("./BillDetail"));

const validation = yup.object().shape({
    describe: yup.string().required("Nhập lý do hủy đơn!"),
});
function ModelBill(
    {
        bill,
        params,
        setParams,
        count,
    }
) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(validation)
    });
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [clicked, setClicked] = useState(-1);
    const success = useSelector((state) => state.bill.success);
    const form = useSelector((state) => state.bill.form);
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
    };
    //handler
    const fetchData = useCallback((id, param) => {
        dispatch({ type: type.FETCH_FORM_BILL_ACTION, payload: id });
        dispatch({ type: type.FETCH_BILL_DETAIL_ACTION, payload: { id, param } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onClickHandler = (event, value, index) => {
        setClicked(index);
        const id = value.id;
        const param = {
            _field: 'id',
            _known: 'up',
        };
        if (id && id !== form.id) {
            fetchData(id, param);
        }
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
            ...form,
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
    // hủy
    const onSubmit = (param) => {
        const id = bill[clicked].id;
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
        const data = {
            ...form,
            status_order: order,
            describe: param.describe,
        }
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
        handleCloseCB();
        reset({
            describe: '',
        });
    };
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
            return String(Math.round(n)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' đ';
            // return n.toFixed(0).replace(/(\d)(?=(\d{3}))/g, '$1,') + ' ' + currency;
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
                                    <TableCell>Mã hóa đơn</TableCell>
                                    <TableCell>Họ và tên</TableCell>
                                    <TableCell>Số điện thoại</TableCell>
                                    <TableCell>Địa chỉ</TableCell>
                                    <TableCell>Trạng thái hóa đơn</TableCell>
                                    <TableCell>Trạng thái thanh toán</TableCell>
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
                                        <TableCell>{row.id_code}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell>{onSwitchOrder(row.status_order)}</TableCell>
                                        <TableCell>{row.status_pay === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</TableCell>
                                        <TableCell>{format(row.total, 'VNĐ')}</TableCell>
                                        <TableCell>{onSwitchFunction(row.status_order)}</TableCell>
                                        <TableCell><BillDetail fetchData={fetchData} /></TableCell>
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
                        <TextField multiline
                            rows={4}
                            sx={{ marginTop: 2 }}
                            label='Lý do hủy đơn hàng'
                            variant='filled' fullWidth
                            required
                            {...register("describe")}
                            error={errors.describe ? true : false}
                            helperText={errors.describe ? errors.describe.message : false} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseCB}>
                        Hủy bỏ
                    </Button>
                    <Button onClick={handleSubmit(onSubmit)}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    );
}
export default memo(ModelBill);