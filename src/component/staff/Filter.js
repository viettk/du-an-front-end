import React, { useState } from "react";
import Box from '@mui/material/Box';
import { Button, FormControl, Grid, IconButton, InputBase, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import SearchIcon from '@mui/icons-material/Search';

function Filter({
    params,
    setParams,
}) {
    const [status, setStatus] = useState();
    const [role, setRole] = useState();
    const [search, setSearch] = useState();
    const onChangeRole = (event) => {
        setRole(event.target.value);
    }
    const onChangeStatus = (event) => {
        setStatus(event.target.value);
    }
    const onChangeSearch = (event) => {
        setSearch(event.target.value);
    }
    const handleFilter = () => {
        setParams({
            ...params,
            role: role,
            status: status,
        })
    }
    const handleSearch = () => {
        setParams({
            ...params,
            p: search,
        })
    }
    return (
        <Box mb={2}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={2}>
                    <FormControl variant="filled" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">Chức vụ</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            name="role"
                            label="Chức vụ"
                            size="small"
                            defaultValue=''
                            onChange={onChangeRole}
                        >
                            <MenuItem value=''>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value='1'>Quản lý</MenuItem>
                            <MenuItem value='0'>Nhân viên</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="filled" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">Tráng thái</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            name="status"
                            label="Trạng thái"
                            size="small"
                            defaultValue=''
                            onChange={onChangeStatus}
                        >
                            <MenuItem value=''>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="true">Hoạt động</MenuItem>
                            <MenuItem value="false">Vô hiệu hóa</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Button onClick={handleFilter} sx={{ alignSelf: 'flex-end' }} endIcon={<FilterAltTwoToneIcon />}>
                            Lọc
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Tên, email nhân viên..."
                            inputProps={{ 'aria-label': 'search staff' }}
                            onChange={onChangeSearch}
                        />
                        <IconButton onClick={handleSearch} sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
export default Filter;
