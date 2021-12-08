import React, { Fragment, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Button, Grid, Typography } from "@mui/material";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
const StatusOrder = (
    {
        filter,
        setFilter,
    }
) => {
    const [order, setOrder] = useState('');
    const [pay, setPay] = useState('');
    const handleChangeOrder = (event) => {
        setOrder(event.target.value);
    };
    const handleChangePay = (event) => {
        setPay(event.target.value);
    };
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const handlerdateRender = (date) => {
        const dateRender = new Date(date);
        console.log(dateRender.getDate());
        return `${dateRender.getFullYear()}-${dateRender.getMonth() + 1}-${dateRender.getDate() - 1}`;
    }
    const handlerSetFilter = () => {
        if (start === null && end === null) {
            setFilter({
                ...filter,
                order: order,
                pay: pay,
            });
        } else {
            setFilter({
                ...filter,
                order: order,
                pay: pay,
                start: handlerdateRender(start),
                end: handlerdateRender(end),
            });
        }
    }
    return (
        <Fragment>
            <Box mb={2}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Từ ngày"
                                value={start}
                                onChange={(newValue) => {
                                    setStart(newValue);
                                }}
                                renderInput={(params) => <TextField
                                    id="first"
                                    variant="filled"
                                    size="small"
                                    {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Đến ngày"
                                value={end}
                                onChange={(newValue) => {
                                    setEnd(newValue);
                                }}
                                renderInput={(params) => <TextField
                                    id="last"
                                    variant="filled"
                                    size="small"
                                    {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="demo-simple-select-label">Trạng thái đơn hàng</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={order}
                                label="Trạng thái đơn hàng"
                                onChange={handleChangeOrder}
                                size="small"
                            >
                                <MenuItem value={null}>Trạng thái đơn hàng</MenuItem>
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
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="demo-simple-select-label">Trạng thái thanh toán</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={pay}
                                label="Trạng thái thanh toán"
                                onChange={handleChangePay}
                                size="small"
                            >
                                <MenuItem value={null}>Trạng thái thanh toán</MenuItem>
                                <MenuItem value={'Chưa thanh toán'}>Chưa thanh toán</MenuItem>
                                <MenuItem value={'Đã thanh toán'}>Đã thanh toán</MenuItem>
                                <MenuItem value={'Đã hoàn trả'}>Đã hoàn trả</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignContent: 'center',
                                flexDirection: 'row-reverse',
                                bgcolor: 'background.paper',
                            }}
                        ><Button onClick={handlerSetFilter}><FilterAltTwoToneIcon /><Typography variant="inherit">Lọc</Typography></Button></Box>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}
export default StatusOrder;