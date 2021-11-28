import React, { Fragment, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const StatusOrder = (
    {
        params,
        setParams,
    }
) => {
    const [order, setOrder] = useState('');
    const [pay, setPay] = useState('Chưa thanh toán');
    const handleChangeOrder = (event) => {
        setOrder(event.target.value);
        setParams({
            ...params,
            order: event.target.value,
        })
    };
    const handleChangePay = (event) => {
        setPay(event.target.value);
        setParams({
            ...params,
            pay: event.target.value,
        })
    };
    return (
        <Fragment>
            <Box>
                <FormControl sx={{ m: 1, minWidth: 220}}>
                    <InputLabel id="demo-simple-select-label">Trạng thái đơn hàng</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={order}
                        label="Trạng thái đơn hàng"
                        onChange={handleChangeOrder}
                        size="small"
                    >
                        <MenuItem value={'Chờ xác nhận'}>Chờ xác nhận</MenuItem>
                        <MenuItem value={'Đã xác nhận'}>Đã xác nhận</MenuItem>
                        <MenuItem value={'Đang chuẩn bị hàng'}>Đang chuẩn bị hàng</MenuItem>
                        <MenuItem value={'Đang gia hàng'}>Đang giao hàng</MenuItem>
                        <MenuItem value={'Hoàn thành'}>Hoàn thành</MenuItem>
                        <MenuItem value={'Thất bại'}>Thất bại</MenuItem>
                        <MenuItem value={'Đã hủy'}>Đã hủy</MenuItem>
                        <MenuItem value={'Đang hoàn trả'}>Đang hoàn trả</MenuItem>
                        <MenuItem value={'Đã hoàn trả'}>Đã hoàn trả</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">Trạng thái thanh toán</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={pay}
                        label="Trạng thái thanh toán"
                        onChange={handleChangePay}
                        size="small"
                    >
                        <MenuItem value={'Chưa thanh toán'}>Chưa thanh toán</MenuItem>
                        <MenuItem value={'Đã thanh toán'}>Đã thanh toán</MenuItem>
                        <MenuItem value={'Đã hoàn trả'}>Đã hoàn trả</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Fragment>
    );
}
export default StatusOrder;