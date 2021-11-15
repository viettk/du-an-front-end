import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useHistory, useParams } from "react-router";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import ReceiptApi from "../../../api/ReceiptApi";
import { create } from "@mui/material/styles/createTransitions";
import axios from "axios";
import ReceiptDetail from "../ReceiptDetal/ReceiptDetail";


function Receipt() {

    const initValues = [];
    const initParams = {
        _limit: '5',
        _page: 0,
        _field: 'id',
        _known: 'up'
    };

    let newDate = new Date()
    const [params, setParams] = useState(initParams);
    const [result, setResult] = useState(initValues);
    const [page, setPage] = useState(initParams._page + 1);
    const [count, setCount] = useState(0);
    const [month, setMonth] = useState(newDate.getMonth() + 1 );
    const [year, setYear] = useState(newDate.getFullYear());
    // const [search, setSearch] = useState({
    //     name: '',
    //     parent_name: ''
    // });

    const [ma, setMa] = useState(0);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await ReceiptApi.getReceipt(params, month, year);
                setResult(response.content);
                setCount(response.totalPages);
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [params, result, page, month, year]);

    const handleChange = (event, value) => {
        setPage(value);
        setParams(
            {
                _limit: '5',
                _page: value - 1,
                _field: 'id',
                _known: 'up'
            }
        );
    };

    const create = () => {
        const reipt = {
            staffId: 1,
            describe: describe.mota
        }
        axios({
            url: 'http://localhost:8080/api/receipt',
            method: 'POST',
            type: 'application/json',
            data: reipt,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    const [describe, setDescribe] = useState({
        mota: ''
    });
    const update = (e) => {
        setDescribe({
            ...describe,
            mota: e.target.value
        })
    }

    const updateDescripbe = (e, id) => {
        axios({
            url: 'http://localhost:8080/api/receipt/' + id,
            method: 'get',
            type: 'application/json',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp => {
            const data = {
                staffId: 1,
                describe: e.target.value
            }
            axios({
                url: 'http://localhost:8080/api/receipt/' + id,
                method: 'put',
                type: 'application/json',
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        })
    }

    const getMa = (id) => {
        setShow(true);
        setMa(id);
    }

    const changeMonth = (e) =>{
        var index = e.target.value;
        setMonth(index);
    }
    const changyear = (e) =>{
        var index = e.target.value;
        setYear(index);
    }
    return (
        <React.Fragment>
            <h3 style={{ marginTop: 10 }}>Danh sách Phiếu nhập</h3>
            <ReceiptDetail show={show} setShow={setShow} ma={ma} setMa={setMa} />
            <TableContainer component={Paper}>
                <div>
                    <div>
                        <label>Tạo phiếu nhập mới</label>
                        <textarea name="describecreate" onChange={update}>Ghi chú</textarea>
                        <button onClick={() => create()}>Tạo</button>
                    </div>
                    <div>
                    <select value={month} onChange={(e) => changeMonth(e)} >
                            <option value="1" >Tháng 1</option>
                            <option value="2" >Tháng 2</option>
                            <option value="3" >Tháng 3</option>
                            <option value="4" >Tháng 4</option>
                            <option value="5" >Tháng 5</option>
                            <option value="6" >Tháng 6</option>
                            <option value="7" >Tháng 7</option>
                            <option value="8" >Tháng 8</option>
                            <option value="9" >Tháng 9</option>
                            <option value="10" >Tháng 10</option>
                            <option value="11" >Tháng 11</option>
                            <option value="12" >Tháng 12</option>
                        </select>
                        <select value={year} onChange={(e) => changyear(e) } >
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>
                </div>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td scope="col">Mã Phiếu nhập</td>
                            <td scope="col">Ngày tạo</td>
                            <td scope="col">Mô tả</td>
                            <td scope="col">Thành tiền</td>
                            <td scope="col">Sửa</td>
                        </tr>
                    </tbody>
                    <tfoot style={{ height: "10px" }}>
                        {
                            result.length > 0 ? result.map(
                                (result) =>
                                    <tr key={result.id}>
                                        <td>{result.id_code}</td>
                                        <td>{result.create_date}</td>
                                        <td><input name="describe" defaultValue={result.describe} onChange={(e) => updateDescripbe(e, result.id)} /></td>
                                        <td>{result.total}</td>
                                        <td>
                                            <button type="button" class="btn btn-primary" onClick={() => getMa(result.id)} >Chỉnh sửa</button>
                                        </td>
                                    </tr>

                            ) : <tr>Không có dữ liệu</tr>
                        }
                    </tfoot>
                </table>
            </TableContainer>
            <Stack spacing={2}>
                <Pagination className="pagination" style={{bottom: ""}} count={count} page={page} onChange={handleChange} color="secondary" />
            </Stack>
        </React.Fragment>
    );
}
export default Receipt;            