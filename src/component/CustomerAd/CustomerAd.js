import React, { useEffect, useState } from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CustomerApi from "../../api/CustomerApi";
import './customer.css';
import { useParams, useLocation, useHistory } from "react-router-dom";
import { height } from "@mui/system";
import { ChangeCircle } from "@mui/icons-material";

function CustomerAd() {
    const initValues = [];
    const initParams = {
        _limit: '5',
        _page: 0,
        name: '',
        email: '',
        status: 1
    };

    const [reload, setReload] = useState(true);
    const [params, setParams] = useState(initParams);
    const [result, setResult] = useState(initValues);
    const [page, setPage] = useState(initParams._page + 1);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await CustomerApi.getAll(params);
                setResult(response.content);
                setCount(response.totalPages);
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [params, page, reload]);

    const handleChange = (event, value) => {
        setPage(value);
        setParams(
            {
                _limit: '5',
                _page: value - 1,
            }
        );
    };

    const onReload = () =>{
        if(reload == true){
            setReload(false)
        } else {
            setReload(true);
        }
    }

    const update = (id) => {
        console.log(id)
        axios({
            url: 'https://tranhoangmaianh.herokuapp.com/admin/customer/' + id,
            method: 'PUT',
            type: 'application/json',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => {

        }).catch((error) => {
            // if (error.response) {
            //     setLoi(error.response.data);
            //     setMess(error.response.data);
            // } else if (error.request) {
            //     console.log(error.request);
            // } else {
            //     console.log('Error', error.message);
            // }
        });
        onReload();
    }

    const getSearchName_Email = (e) => {
        const newvalue = e.target.value;
        setParams({
            ...params,
            name: newvalue,
        });
    }

    const getEmail =(e)=>{
        const newvalue = e.target.value;
        setParams({
            ...params,
            email: newvalue,
        });
    }

    const ChangeStatus = (e) =>{
        setParams({
            ...params,
            status: e.target.value
        });
    }
    console.log(params.status)

    return (
        <React.Fragment>
            <h3 style={{ marginTop: 10 }}>Quản lý khách hàng</h3>

            <TableContainer component={Paper}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td></td>
                            <td><input  onChange={(e) => getSearchName_Email(e)} type='text' /></td>
                            <td><input  onChange={(e)=> getEmail(e)} /></td>
                            <td>
                                <select onChange={(e) => ChangeStatus(e)} value={params.status} >
                                    <option value="1" >Vô hiệu</option>
                                    <option value="0">Tất cả</option>
                                </select>
                            </td>
                        </tr>
                    </thead>
                    <tbody className="table-dark">
                        <tr>
                            <td scope="col">STT</td>
                            <td scope="col">Name</td>
                            <td scope="col">Email</td>
                            <td scope="col">Trạng thái</td>
                        </tr>
                    </tbody>
                    <tfoot style={{ height: "10px" }}>
                        {
                            result.map(
                                (result, index) =>
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{result.name}</td>
                                        <td>{result.email}</td>
                                        <td><button style={{backgroundColor: result.status == true ? "#007bff" : "red" }} className="btn btn-light" onClick={() => update(result.id)}>
                                        {result.status == true ? 'Hoạt động' : 'Vô hiệu hóa'}
                                        </button></td>
                                    </tr>
                            )
                        }
                    </tfoot>
                </table>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination className="d-flex justify-content-center" count={count} page={page} onChange={handleChange} color="secondary" />
            </Stack>
        </React.Fragment>
    );
}
export default CustomerAd;