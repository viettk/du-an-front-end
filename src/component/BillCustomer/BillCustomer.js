import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from "react";
import BillApi from '../../api/BillApi';
import { Paper, TableContainer } from '@mui/material';
import BillCustomerModal from './BillCustomerModal';
import CookieService from '../../cookie/CookieService';

function BillCustomer() {
    const [ma, setMa] = useState(0);
    const emailc = CookieService.getCookie('email');

    // Mở modal
    const [show, setShow] = useState(false);
    const [result, setResult] = useState([]);

    const [initParams, setInitParams] = useState(
        {
            email: emailc,
            _limit: 5,
            _page: 0
        }
    );

    const getMa = (id) => {
        setShow(true);
        setMa(id);
    }

    const [params, setParams] = useState(initParams);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const resp = await BillApi.getBillCustomer(params);
                const data = resp.content;
                setResult(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [params]);
    return (
        <React.Fragment>
            <div className="container">
                <h5 style={{ marginTop: 10 }}>Trang khách hàng</h5>
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
                                result.map(
                                    (result) =>
                                        <tr key={result.id}>
                                            <td>{result.id_code}</td>
                                            <td>{(result.create_date.split('T')[0]).split('-').reverse().join('-')}</td>
                                            <td>{result.district}-{result.city}  </td>
                                            <td>{String(Math.round(result.total)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' đ'}</td>
                                            <td>{result.status_pay}</td>
                                            <td>{result.status_order}</td>
                                            <td>
                                                <button style={{ border: "none" }} className="btn btn-outline" onClick={() => getMa(result.id)} ><i class="fa fa-eye"></i></button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tfoot>
                    </table>
                </TableContainer>
            </div>
        </React.Fragment>
    );
}
export default BillCustomer;