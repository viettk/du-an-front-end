import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import * as type from '../../redux/const/type';

function UpdateStaff({
    formDataStaff,
    setFormDataStaff,
    clicked,
    staff,
    icon,
}) {
    const dispatch = useDispatch();
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormDataStaff({
            ...formDataStaff,
            [name]: value,
        });
    }
    const onUpdateStaff = (id, data) => {
        id = staff[clicked].id;
        console.log(staff[clicked]);
        data = formDataStaff;
        dispatch({ type: type.UPDATE_STAFF_ACTION, payload: { id, data } });
        setFormdata();
        handleClose();
    }
    const onRePasswordStaff = (id, data) => {
        id = staff[clicked].id;
        console.log(staff[clicked]);
        data = formDataStaff;
        dispatch({ type: type.UPDATE_STAFF_ACTION, payload: { id, data } });
        setFormdata();
        handleCloseR();
    }
    const setFormdata = () => {
        setFormDataStaff({
            id: '',
            email: '',
            password: '',
            token: '',
            name: '',
            role: '',
            status: 1,
            phone: '',
        });
    }
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [openR, setOpenR] = useState(false);

    const handleClickOpenR = () => {
        setOpenR(true);
    };

    const handleCloseR = () => {
        setOpenR(false);
    };
    return (
        <Fragment>
            <IconButton color="primary" onClick={handleClickOpen}>
                {icon}
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cập nhật nhân viên</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Cập nhật thông tin nhân viên
                    </DialogContentText>
                    <TextField
                        autoFocus
                        sx={{ marginTop: '20px' }}
                        label="Họ và tên..."
                        type="text"
                        fullWidth
                        variant="standard"
                        name='name'
                        value={formDataStaff.name}
                        onChange={onChangeHandler}
                    />
                    <TextField
                        sx={{ marginTop: '20px' }}
                        name='email'
                        type="email"
                        label="Email..."
                        fullWidth
                        variant="standard"
                        value={formDataStaff.email}
                        onChange={onChangeHandler}
                    />
                    <TextField
                        sx={{ marginTop: '20px' }}
                        name='phone'
                        label="Số điện thoại..."
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formDataStaff.phone}
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
                                defaultValue={`${formDataStaff.role}`}
                                onChange={onChangeHandler}
                            >
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
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
                                defaultValue={`${formDataStaff.status}`}
                                onChange={onChangeHandler}
                            >
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="true">Hoạt động</MenuItem>
                                <MenuItem value="false">Vô hiệu hóa</MenuItem>
                            </Select>
                        </FormControl>
                        <Button size="small" onClick={handleClickOpenR}>
                            Đổi mật khẩu
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={onUpdateStaff}>Lưu</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openR} onClose={handleCloseR}>
                <DialogTitle>Đổi mật khẩu</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Nhân viên: {formDataStaff.name} <br />
                        Tài khoản: {formDataStaff.email} <br />
                    </DialogContentText>
                    <TextField
                        autoFocus
                        sx={{ marginTop: '20px' }}
                        label="Mật khẩu mới"
                        name="password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={onChangeHandler}
                    />
                    <TextField
                        sx={{ marginTop: '20px' }}
                        label="Nhập lại mật khẩu mới"
                        name="repassord"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseR}>Hủy</Button>
                    <Button onClick={onRePasswordStaff}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    );
}
export default UpdateStaff;