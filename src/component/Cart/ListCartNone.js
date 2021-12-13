import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CartApi from "../../api/CartApi";
import { useHistory } from "react-router-dom";
import './cart.css';
import { Link } from 'react-router-dom';
import SyncLoader from "react-spinners/SyncLoader";

function ListCartNone() {
    const history = useHistory();
    let storage = localStorage.getItem('cart');
    const [result, setResult] = useState([]);
    const [totalf, setTotalf] = useState(0);
    const [loading, setLoading] = useState(false);
    const [mess, setMess] = useState({
        errorMessage: ''
    });
    const [loi, setLoi] = useState({
        name: '',
        parent_name: ''
    });

    useEffect(() => {
        const fetchList = async () => {
            try {
                if(storage){
                    setResult(JSON.parse(storage));
                    setTotalf((JSON.parse(storage).reduce((a, v) => a = a + v.total, 0)));
                }
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, []);


    // localStorage.removeItem('cart');
    const giamSl = (e, id) => {
        // productId là productId trong localStorage
        let item = result.find(c => c.product_id == id);
        item.number -= 1;
        if (item.number <= 0) {
            item.number = 1;
        }
        item.total = item.price * item.number
        localStorage.setItem('cart', JSON.stringify(result));
        let reload = localStorage.getItem('cart');
        setResult(JSON.parse(reload));
        setTotalf((result.reduce((a, v) => a = a + v.total, 0)));
    }

    const tangSl = (e, id) => {
        let item = result.find(c => c.product_id == id)
        item.number += 1;
        item.total = item.price * item.number
        localStorage.setItem('cart', JSON.stringify(result));
        let reload = localStorage.getItem('cart');
        setResult(JSON.parse(reload));
        setTotalf((result.reduce((a, v) => a = a + v.total, 0)))
    }

    const checkNumber = (e, idsp) => {
        if (e.target.value < 1) {
            e.target.value = 1;
        }
        let item = result.find(c => c.product_id == idsp);
        item.number = Math.round(e.target.value);
        item.total = item.price * item.number
        localStorage.setItem('cart', JSON.stringify(result));
        let reload = localStorage.getItem('cart');
        setResult(JSON.parse(reload));
        setTotalf((result.reduce((a, v) => a = a + v.total, 0)))
    }

    let cart = [];
    const xoa = (e, idsp) => {
        let storage = localStorage.getItem('cart');
        if (storage) {
            cart = JSON.parse(storage);
        }
        cart = cart.filter(c => c.product_id != idsp);
        cart.total = cart.price * cart.number;
        localStorage.setItem('cart', JSON.stringify(cart));
        let reload = localStorage.getItem('cart');
        setResult(JSON.parse(reload));
        setTotalf((cart.reduce((a, v) => a = a + v.total, 0)));
    }

    const checkCart = () => {
        const demo = JSON.parse(localStorage.getItem('cart'));
        CartApi.dathangnotlogin(demo).then(resp => {
            history.push('/order');
        }).catch((error) => {
            if (error.response) {
                setLoi(error.response.data);
                setMess(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });
    }

    const returnAll = () => {
        history.push('/all-product');
    }

    return (
        <React.Fragment>
            {loading
                ?
                <div className="screenn-load">
                    <SyncLoader loading={loading} color={'#8DD344'} />
                </div> :
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <Link style={{ textDecoration: 'none' }} to='/home'>Home</Link>
                            <span className="span-link"><i class="fa fa-angle-right"></i></span>
                            <span>Giỏ hàng</span>
                        </ol>
                    </nav>
                    <TableContainer component={Paper}>
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <td scope="col">STT</td>
                                    <td scope="col">Hình ảnh</td>
                                    <td scope="col">Tên Sản phẩm</td>
                                    <td scope="col">Giá</td>
                                    <td scope="col">Số lượng</td>
                                    <td scope="col">Tổng tiền</td>
                                    <td scope="col">Xóa</td>
                                </tr>
                            </tbody>
                            <tfoot style={{ height: "10px", position: "relative" }}>
                                {
                                    result.length > 0 ? result.map(
                                        (result) =>
                                            <tr key={result.product_id}>
                                                <td>{result.product_id}</td>
                                                <td>{result.photo}</td>
                                                <td>{result.name}</td>
                                                <td>{String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.') }</td>
                                                <td key={result.number}>
                                                    <button className="button-sl" onClick={e => giamSl(e, result.product_id)} >-</button>
                                                    <input style={{ border: "1px solid #ddd", width: "60px", textAlign: "center", padding: "2px 0" }} type="number" defaultValue={result.number} onBlur={(e) => checkNumber(e, result.product_id)} />
                                                    <button className="button-sl1" onClick={e => tangSl(e, result.product_id)}>+</button>
                                                </td>
                                                <td>{String(Math.round(result.total)).replace(/(.)(?=(\d{3})+$)/g, '$1.') }</td>
                                                <td>
                                                    <button style={{ border: "none" }} className="btn btn-outline-danger" onClick={(e) => xoa(e, result.product_id)} ><i class="fa fa-trash"></i></button>
                                                </td>
                                            </tr>
                                    ) : <span style={{ fontWeight: 500, position: "absolute", top: "5px", textAlign: "center", width: "100%" }}>Giỏ hàng của bạn không có Sản phẩm nào</span>
                                }
                            </tfoot>
                        </table>
                        <span style={{ color: "red", fontSize: "13px", marginLeft: "10px" }}>{loi.parent_name}</span>
                        <span style={{ color: "red", fontSize: "13px", marginLeft: "10px" }}>{mess.errorMessage}</span>
                        <span style={{ float: "right", margin: "0 65px 20px 0" }}>Tổng tiền: <span style={{ fontWeight: " 500" }}>{String(Math.round(totalf)).replace(/(.)(?=(\d{3})+$)/g, '$1.') }</span> VNĐ</span>
                    </TableContainer>
                    {
                        result.length > 0 ?
                            <div id="select-cart">
                                <div className="cart-hidden"></div>
                                <div className="cart-contact">
                                    <button onClick={returnAll} style={{ backgroundColor: "#3d4356" }} >Tiếp tục mua hàng</button>
                                    <button onClick={checkCart} >Thực hiện thanh toán</button>
                                </div>
                            </div> : <div></div>
                    }
                </div>}
        </React.Fragment>
    );
}
export default ListCartNone;