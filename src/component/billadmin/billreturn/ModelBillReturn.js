import { AppBar, Button, Dialog, IconButton, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from "@mui/material";
import React, { Fragment, memo } from "react";
import ReturnProduct from "./ReturnProduct";
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function ModelBillReturn(
    {
        bill,
        setBill,
        formDataBill,
        setFormDataBill,
        params,
        setParams,
        clicked,
        setClicked,
        count,
        setCount,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        reload,
        setReload,
    }
) {

    const onReload = () => {
        setReload(reload ? false : true);
    }
    //phan trang
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
    const onClickHandler = (event, value, index) => {
        setClicked(index);
        setFormDataBill(value);
    }
    //dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onReload();
    };
    return (
        <Fragment>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead style={{ background: "#ccc" }}>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Họ và tên</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Số điện thoại</TableCell>
                                <TableCell>Địa chỉ</TableCell>
                                <TableCell>Trạng thái hóa đơn</TableCell>
                                <TableCell>Trạng thái thanh toán</TableCell>
                                <TableCell>Mã hóa đơn</TableCell>
                                <TableCell>Tổng tiền</TableCell>
                                <TableCell>Hoạt động</TableCell>
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
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.status_order}</TableCell>
                                    <TableCell>
                                        {row.status_pay}
                                    </TableCell>
                                    <TableCell>{row.id_code}</TableCell>
                                    <TableCell>{row.total}</TableCell>
                                    <TableCell><Button onClick={handleClickOpen}><i className="fas fa-eye"></i></Button></TableCell>
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
            </Paper>
            {/* confirm */}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Chi tiết hóa đơn
                        </Typography>
                    </Toolbar>
                </AppBar>
                <ReturnProduct
                    open={open}
                    setOpen={setOpen}
                    id={formDataBill.id}
                    formDataBill ={formDataBill}
                />
            </Dialog>
        </Fragment>
    );
}
export default memo(ModelBillReturn);