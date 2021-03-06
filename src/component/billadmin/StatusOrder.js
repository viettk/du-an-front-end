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
                                label="T??? ng??y"
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
                                label="?????n ng??y"
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
                            <InputLabel id="demo-simple-select-label">Tr???ng th??i ????n h??ng</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={order}
                                label="Tr???ng th??i ????n h??ng"
                                onChange={handleChangeOrder}
                                size="small"
                            >
                                <MenuItem value={null}>Tr???ng th??i ????n h??ng</MenuItem>
                                <MenuItem value={'Ch??? x??c nh???n'}>Ch??? x??c nh???n</MenuItem>
                                <MenuItem value={'???? x??c nh???n'}>???? x??c nh???n</MenuItem>
                                <MenuItem value={'??ang chu???n b??? h??ng'}>??ang chu???n b??? h??ng</MenuItem>
                                <MenuItem value={'??ang gia h??ng'}>??ang giao h??ng</MenuItem>
                                <MenuItem value={'Ho??n th??nh'}>Ho??n th??nh</MenuItem>
                                <MenuItem value={'Th???t b???i'}>Th???t b???i</MenuItem>
                                <MenuItem value={'???? h???y'}>???? h???y</MenuItem>
                                <MenuItem value={'??ang ho??n tr???'}>??ang ho??n tr???</MenuItem>
                                <MenuItem value={'???? ho??n tr???'}>???? ho??n tr???</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="demo-simple-select-label">Tr???ng th??i thanh to??n</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={pay}
                                label="Tr???ng th??i thanh to??n"
                                onChange={handleChangePay}
                                size="small"
                            >
                                <MenuItem value={null}>Tr???ng th??i thanh to??n</MenuItem>
                                <MenuItem value={'Ch??a thanh to??n'}>Ch??a thanh to??n</MenuItem>
                                <MenuItem value={'???? thanh to??n'}>???? thanh to??n</MenuItem>
                                <MenuItem value={'???? ho??n tr???'}>???? ho??n tr???</MenuItem>
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
                        ><Button onClick={handlerSetFilter}><FilterAltTwoToneIcon /><Typography variant="inherit">L???c</Typography></Button></Box>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}
export default StatusOrder;