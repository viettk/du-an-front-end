import React, { memo, useState } from "react";
import TablePagination from '@mui/material/TablePagination';
import UpdateStaff from "./UpdateStaff";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Edit } from "@mui/icons-material";

function ModelStaff(
    {
        params,
        setParams,
        staff,
        count,
    }
) {
    const formDataInitValue = {
        id: '',
        email: '',
        password: '',
        token: '',
        name: '',
        role: '',
        status: 1,
        phone: '',
    };
    const [clicked, setClicked] = useState(-1);
    const [formDataStaff, setFormDataStaff] = useState(formDataInitValue);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    //phân trang
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
        console.log(parseInt(event.target.value, 10));
    };
    const onClickHandler = (event, value, index) => {
        setClicked(index);
        setFormDataStaff(value);
    }
    return (
        <React.Fragment>
            {staff.length > 0 ? (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ minHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead style={{ background: "#ccc" }}>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Họ và tên</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Số điện thoại</TableCell>
                                    <TableCell>Vai trò</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell>Hoạt động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {staff.map((row, index) => (
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
                                        <TableCell>{row.role ? 'Quản lý' : 'Nhân viên'}</TableCell>
                                        <TableCell>{row.status ? 'Hoạt động' : 'Vô hiệu hóa'}</TableCell>
                                        <TableCell><UpdateStaff
                                            clicked={clicked}
                                            formDataStaff={formDataStaff}
                                            setFormDataStaff={setFormDataStaff}
                                            staff={staff}
                                            icon={(<Edit />)}
                                        /></TableCell>
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
            ) : (<Box sx={{ textAlign: "center", marginTop: "50px" }}>
                <Typography variant="subtitle1">Không có dữ liệu!</Typography>
            </Box>)}
        </React.Fragment>
    );
}
export default memo(ModelStaff);