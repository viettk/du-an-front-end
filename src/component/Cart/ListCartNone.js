import React, { useCallback, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CartApi from "../../api/CartApi";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { height } from "@mui/system";
import axios from "axios";

function ListCartNone(){
    let storage = localStorage.getItem('cart');
    const [result, setResult] = useState(JSON.parse(storage));
    const [totalf, setTotalf] =useState((result.reduce((a,v) =>  a = a + v.total , 0 )));

    // localStorage.removeItem('cart');
    const giamSl = (e, id) =>{
        // productId là productId trong localStorage
        let item = result.find(c => c.product_id == id );
          item.number -= 1;
          item.total = item.price * item.number
        localStorage.setItem('cart', JSON.stringify(result));
        let reload = localStorage.getItem('cart');
        setResult(JSON.parse(reload));
        setTotalf((result.reduce((a,v) =>  a = a + v.total , 0 )));
    }

    const tangSl = (e, id) => {
        let item = result.find(c => c.product_id == id)
        item.number += 1;
        item.total = item.price * item.number
        localStorage.setItem('cart', JSON.stringify(result));
        let reload = localStorage.getItem('cart');
        setResult(JSON.parse(reload));
        setTotalf((result.reduce((a,v) =>  a = a + v.total , 0 )))
    }

    const checkNumber = (e, idsp) => {
        let item = result.find(c => c.product_id == idsp);
        item.number = Math.round(e.target.value);
        item.total = item.price * item.number
        localStorage.setItem('cart', JSON.stringify(result));
        let reload = localStorage.getItem('cart');
        setResult(JSON.parse(reload));
        setTotalf((result.reduce((a,v) =>  a = a + v.total , 0 )))
    }

    let cart =[];
    const xoa = (e, idsp) =>{
        let storage = localStorage.getItem('cart');
        if(storage){
          cart = JSON.parse(storage);
        }
        cart = cart.filter(c => c.product_id != idsp);
        cart.total = cart.price * cart.number;
        localStorage.setItem('cart', JSON.stringify(cart));
        let reload = localStorage.getItem('cart');
        setResult(JSON.parse(reload));
        setTotalf((cart.reduce((a,v) =>  a = a + v.total , 0 )));
    }

    return(
        <React.Fragment>
        <h3 style={{marginTop: 10}}>Giỏ hàng của bạn</h3>
        <TableContainer component={Paper}>
        <table className="table table-striped">
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
                <tfoot style={{height: "10px"}}>
                    {
                        result.map(
                            (result) =>
                                <tr key={result.product_id}>
                                    <td>{result.product_id}</td>
                                    <td>{result.photo}</td>
                                    <td>{result.name}</td>
                                    <td>{result.price}</td>
                                    <td key={result.number}>
                                        <button onClick={e=> tangSl(e, result.product_id)}>+</button>
                                        <input className="num" type="number" defaultValue={result.number} onBlur={(e)=>checkNumber(e,result.product_id)} />
                                            {/* {result.number} */}
                                        <button onClick={e=> giamSl(e, result.product_id)} >-</button>
                                    </td>
                                    <td>{result.total}</td>
                                    <td>
                                        <button onClick={(e) => xoa(e, result.product_id) } >X</button>
                                    </td>
                                </tr>
                        )              
                    }
                </tfoot>
            </table>
            <span>{totalf} VNĐ</span>

            <div>
                <a >Đặt hàng</a>
            </div>
            </TableContainer>
    </React.Fragment>
    );
}
export default ListCartNone;