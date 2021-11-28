import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { Fragment, memo, useEffect, useState } from "react";
import BillAdminApi from "../../../api/BillAdminApi";
import ProductApi from "../../../api/ProductApi";

const ReturnProduct = (
    {
        id,
        formDataBill,
    }
) => {
    const [clicked, setClicked] = useState(-1);
    const [billDetail, setBillDetail] = useState([]);
    const [number, setNumber] = useState(0);
    const [formDataBillDetail, setFormDataBillDetail] = useState(0);
    const [reload, setReload] = useState(true);

    const onReload = () =>{
        setReload(reload?false:true);
    }
    useEffect(() => {
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
    }, [id, reload])
    const onClickHandlerReturn = async (id, value) => {
        id = billDetail[clicked].product.id;
        const idbd = billDetail[clicked].id;
        let a = billDetail[clicked].number;
        const idBill=billDetail[clicked].bill.id;
        const billForm = {
            ...billDetail[clicked].bill,
            status_order: 'Hoàn trả',
        }
        value = {
            number: number
        };
        const tong = (a - number) * (formDataBillDetail.price);
        console.log(tong);
        const data = {
            ...formDataBillDetail,
            number :a - number,
            total: tong,
        }
        if ((value.number > a)===true) {
            alert('Số lượng bản hoàn trả phải nhỏ hơn hoặc bằng số đã mua');
        } else {
            try {
                await ProductApi.putReturn(id, value);
                await BillAdminApi.updateBillDetail(idbd, data);
                await BillAdminApi.updateStatusOrder(idBill, billForm);
                alert('Cảm ơn bạn đã mua sản phẩm');
            } catch (error) {
                console.error(error);
            }
        }
        handleClosea();
        onReload();
    }
    const onClickHandler = (event, value, index) => {
        setClicked(index);
        setFormDataBillDetail(value);
    }
    const handleChangeNumber = (event) => {
        setNumber(event.target.value);
    };
    const [open, setOpen] = useState(false);

    const handleClickOpena = () => {
        setOpen(true);
    };

    const handleClosea = () => {
        setOpen(false);
    };
    return (
        <Fragment>
            <p>Họ tên: {formDataBill.name}</p>
                    <p>Email: {formDataBill.email}</p>
                    <p>SĐT: {formDataBill.phone}</p>
                    <p>Địa chỉ: {formDataBill.address + ', ' + formDataBill.district + ', ' + formDataBill.city}</p>
                    <p>Mã hóa đơn: {formDataBill.id_code}</p>
                    <p>Trạng thái giao hàng: {formDataBill.status_order}</p>
                    <p>Trạng thái thanh toán: {formDataBill.status_pay}</p>
                    <p>Tổng tiền: {formDataBill.total}</p>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell>Số lượng</TableCell>
                            <TableCell>Đơn giá</TableCell>
                            <TableCell>Tổng</TableCell>
                            <TableCell>Số lượng trả</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billDetail.map((row, index) => (
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
                                    {index+1}
                                </TableCell>
                                <TableCell>{row.product.name}</TableCell>
                                <TableCell>{row.number}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{row.total}</TableCell>
                                <TableCell><input onChange={handleChangeNumber} type="number" max={row.number} style={{maxWidth: "50px"}}></input></TableCell>
                                <TableCell><Button onClick={handleClickOpena}>Trả hàng</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClosea}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Xác nhận trả hàng
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Admin sẽ liên hệ với bạn sớm nhất!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClosea}>
                        Hủy bỏ
                    </Button>
                    <Button onClick={onClickHandlerReturn}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
export default memo(ReturnProduct);