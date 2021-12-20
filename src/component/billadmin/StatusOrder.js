import React, { Fragment, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
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
    // const [start, setStart] = useState(null);
    // const [end, setEnd] = useState(null);
    // const handlerdateRender = (date) => {
    //     const dateRender = new Date(date);
    //     var dd = String(dateRender.getDate()).padStart(2, '0');
    //     var mm = String(dateRender.getMonth() + 1).padStart(2, '0'); //January is 0!
    //     var yyyy = dateRender.getFullYear();
    //     return `${dd}/${mm}/${yyyy}`;
    // }
    const handlerSetFilter = () => {
        setFilter({
            ...filter,
            order: order,
            pay: pay,
        });
        // var today = new Date();
        // if (!start || !end) {
        //     setFilter({
        //         ...filter,
        //         order: order,
        //         pay: pay,
        //         start: '01/01/1000',
        //         end: handlerdateRender(today),
        //     });
        // } else {
        //     setFilter({
        //         ...filter,
        //         order: order,
        //         pay: pay,
        //         start: handlerdateRender(start),
        //         end: handlerdateRender(end),
        //     });
        // }
    }
    return (
        <Fragment>
            <Box mb={2}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* <Grid item xs={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Từ ngày"
                                value={start}
                                onChange={(newValue) => {
                                    setStart(newValue);
                                    console.log(newValue);
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
                    </Grid> */}
                    <Grid item xs={4}>
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
                                <MenuItem value={''}>Trạng thái đơn hàng</MenuItem>
                                <MenuItem value={'0'}>Chờ xác nhận</MenuItem>
                                <MenuItem value={'1'}>Đã xác nhận</MenuItem>
                                <MenuItem value={'5'}>Từ chối</MenuItem>
                                <MenuItem value={'2'}>Đang giao hàng</MenuItem>
                                <MenuItem value={'3'}>Hoàn thành</MenuItem>
                                <MenuItem value={'4'}>Thất bại</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
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
                                <MenuItem value={''}>Trạng thái thanh toán</MenuItem>
                                <MenuItem value={'0'}>Chưa thanh toán</MenuItem>
                                <MenuItem value={'1'}>Đã thanh toán</MenuItem>
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