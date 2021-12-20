import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from "react";
import BillApi from '../../api/BillApi';
import { Pagination, Paper, Stack, TableContainer } from '@mui/material';
import BillCustomerModal from './BillCustomerModal';
import CookieService from '../../cookie/CookieService';
import './history.css';

function BillCustomer() {
    const [ma, setMa] = useState(0);
    const emailc = CookieService.getCookie('email');
    const [st, setSt] = useState(2);

    // Mở modal
    const [show, setShow] = useState(false);
    const [result, setResult] = useState([]);

    const [initParams, setInitParams] = useState(
        {
            email: emailc,
            _limit: 5,
            _page: 0,
        }
    );

    const getMa = (id) => {
        setShow(true);
        setMa(id);
    }
    const [ page, setPage] = useState(initParams._page + 1);
    const [ count, setCount] = useState(0);

    const [params, setParams] = useState(initParams);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const resp = await BillApi.getBillCustomer(params, st);
                const data = resp.content;
                setResult(data);
                setCount(resp.totalPages);
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [params, st]);

    const onSwitchOrder = ((value) => {
        switch (value) {
            case 0:
                return <p style={{color:"#7B68EE", fontStyle: "oblique", fontWeight: "500"}} >Chờ xác nhận</p>;
            case 1:
                return <p style={{color:"#32CD32", fontStyle: "oblique", fontWeight: "500"}}>Đã xác nhận</p>;
            case 2:
                return <p style={{color:"#00FF00",fontStyle: "oblique", fontWeight: "500"}}>Đang giao hàng</p>;
            case 3:
                return <p style={{color:"#D2691E",fontStyle: "oblique", fontWeight: "500"}}>Hoàn thành</p>;
            case 4:
                return <p style={{color:" red", fontStyle: "oblique", fontWeight: "500"}}>Thất bại</p>;
            case 5:
                return <p style={{color:" red", fontStyle: "oblique", fontWeight: "500"}}>Từ chối</p>;
            default:
                return (<p>Không cập nhật được</p>);
        }
    });

    const onSwithStatusOrder=((value)=>{
        switch (value) {
            case 0:
                return 'Chưa thanh toán';
            case 1:
                return 'Đã thanh toán';
            default:
                return (<p>Lỗi hiện thị</p>);
        }
    });

    const handleChange = (event, value) => {
        setPage(value);
        setParams({
                ...params,
                _limit : '5',
                _page : value-1,
            });       
      };

    const changeMonth = (e) =>{
        let index = e.target.value;
        setSt(index);
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className='history-body' style={{ margin: "10px 0" }}>
                    <select value={st} onChange={(e) => changeMonth(e)}>
                        <option value=''>Tất cả</option>
                        <option value='0'>Chờ xác nhận</option>
                        <option value='1'>Đã xác nhận</option>
                        <option value='2'>Đang giao hàng</option>
                        <option value='3'>Hoàn thành</option>
                        <option value='4'>Thất bại</option>
                        <option value='5'>Từ chối</option>
                    </select>
                </div>
                <BillCustomerModal show={show} setShow={setShow} ma={ma} setMa={setMa} />
                <TableContainer component={Paper}>
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td scope="col">Đơn hàng</td>
                                <td scope="col">Ngày</td>
                                <td scope="col">Địa chỉ</td>
                                <td scope="col">Giá trị đơn hàng</td>
                                <td scope="col">Tình trạng thanh toán</td>
                                <td scope="col">Trạng thái</td>
                                <td scope="col">Xem</td>
                            </tr>
                        </tbody>
                        <tfoot style={{ height: "10px" }}>
                            {
                                result.length > 0 ? result.map(
                                    (result) =>
                                        <tr key={result.id}>
                                            <td>{result.id_code}</td>
                                            <td>{(result.create_date.split('T')[0]).split('-').reverse().join('-')}</td>
                                            <td>{result.address}-{result.district}-{result.city}  </td>
                                            <td>{String(Math.round(result.total)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' đ'}</td>
                                            <td>{onSwithStatusOrder(result.status_pay)}</td>
                                            <td>{onSwitchOrder(result.status_order)}</td>
                                            <td>
                                                <button style={{ border: "none" }} className="btn btn-outline" onClick={() => getMa(result.id)} ><i class="fa fa-eye"></i></button>
                                            </td>
                                        </tr>
                                ):<p style={{margin: "20px 30px"}}>Không có đơn hàng để hiện thị</p>
                            }
                        </tfoot>
                    </table>
                </TableContainer>
                <Stack spacing={2} style={{marginTop: "30px"}} >
                <Pagination className="d-flex justify-content-center" count={count}  page={page} onChange={handleChange}  color="secondary"/>
            </Stack>
            </div>
        </React.Fragment>
    );
}
export default BillCustomer;