import { Add } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import * as type from '../../redux/const/type';

function CreateStaff({
    formDataStaff,
    setFormDataStaff,
}) {
    const dispatch = useDispatch();
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormDataStaff({
            ...formDataStaff,
            [name]: value,
        });
    }
    const onCreateStaff = (data) => {
        data = {
            ...formDataStaff,
        };
        console.log(data);
        dispatch({ type: type.CREATE_STAFF_ACTION, payload: data });
        handleClose();
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Fragment>
            <IconButton color="primary" onClick={handleClickOpen}>
                <Add />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>thêm nhân viên</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Thêm thông tin nhân viên
                    </DialogContentText>
                    <TextField
                        autoFocus
                        sx={{ marginTop: '20px' }}
                        label="Họ và tên..."
                        type="text"
                        fullWidth
                        variant="standard"
                        name='name'
                        onChange={onChangeHandler}
                    />
                    <TextField
                        sx={{ marginTop: '20px' }}
                        name='email'
                        type="email"
                        label="Email..."
                        fullWidth
                        variant="standard"
                        onChange={onChangeHandler}
                    />
                    <TextField
                        sx={{ marginTop: '20px' }}
                        label="Mật khẩu..."
                        type="password"
                        fullWidth
                        variant="standard"
                        name='password'
                        onChange={onChangeHandler}
                    />
                    <TextField
                        sx={{ marginTop: '20px' }}
                        label="Nhập lại mật khẩu..."
                        type="password"
                        fullWidth
                        variant="standard"
                        name='repassword'
                        onChange={onChangeHandler}
                    />
                    <TextField
                        sx={{ marginTop: '20px' }}
                        name='phone'
                        label="Số điện thoại..."
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={onChangeHandler}
                    />
                    <Box sx={{ marginTop: '20px' }}>
                        <FormControl variant="filled" sx={{ marginRight: '20px', minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Chức vụ</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                name="role"
                                label="Chức vụ"
                                size="small"
                                defaultValue='0'
                                onChange={onChangeHandler}
                            >
                                <MenuItem value='1'>Quản lý</MenuItem>
                                <MenuItem value='0'>Nhân viên</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" sx={{ marginRight: '20px', minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Tráng thái</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                name="status"
                                label="Trạng thái"
                                size="small"
                                defaultValue='true'
                                onChange={onChangeHandler}
                            >
                                <MenuItem value="true">Hoạt động</MenuItem>
                                <MenuItem value="false">Vô hiệu hóa</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={onCreateStaff}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    );
}
export default CreateStaff;