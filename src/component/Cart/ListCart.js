import React, { useCallback, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CartApi from "../../api/CartApi";
import {Link } from "react-router-dom";
import { height } from "@mui/system";
import axios from "axios";
import './cart.css';
import CookieService from  '../../cookie/CookieService'

function ListCart() {
    const token = CookieService.getCookie('token');
    const customerId = CookieService.getCookie('id');
    const emailc = CookieService.getCookie('email');
    const initValues = [];
    const [initParams, setInitParams]= useState(
        {
            productId: '',
            number: ''
        }
    );

    const [number, setNumber] = useState({
        num: ''
    });
    
    const [reload, setReload] = useState(true);

    const [thanhTien, SetThanhTien] = useState(0);

    const [ params, setParams] = useState(initParams);
    const [ result, setResult] = useState(initValues);
    const [cartDetail, setCartDetail] = useState();

    const [mess, setMess] = useState({
        errorMessage: ''
    });
    const [loi, setLoi] = useState({
        number:''
    });
    useEffect(() => {
        const fetchList = async () =>{
            if(customerId){
          try{
            const response = await CartApi.getCartDetail(customerId, emailc);
            setResult(response); 
            
            const resp = await CartApi.getCart(customerId);
            SetThanhTien(resp.total);
            
          }catch (error){
            console.log(error);
          }
        }
    }
        fetchList();
      }, [params, reload,customerId]);

      const tangSL=(e, idp,sl)=>{
        const sp = {
            productId: idp,
            number: sl
        }
        CartApi.tangSL(customerId, emailc, sp).then(resp =>{
            setResult(resp);
            onReload();
        }).catch((error) => {
            if (error.response) {
                setLoi(error.response.data);
                setMess(error.response.data);
                alert(mess.errorMessage);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
      }

      const giamSl =(e, idp, sl)=>{
     
        const sp = {
            productId: idp,
            number: sl
        }
        CartApi.giamSL(customerId, emailc, sp).then(resp =>{
            setResult(resp)
            onReload();
        })
      }

      const xoaSP =(idp)=>{
        const sp = {
            productId: idp,
        }
        CartApi.xoaSP(customerId, emailc, sp).then(reps=>{
            setResult([]);
            onReload();
        })
        
      }

      const checkNumber = (e,idsp, price) =>{
          if(e.target.value <= 0){
            xoaSP(idsp);
          } else{
            const sp = {
                productId: idsp,
                number: Math.round(e.target.value),
            }
            CartApi.checknumber(customerId, emailc, sp).catch((error) => {
                    if (error.response) {
                        setLoi(error.response.data);
                        setMess(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                }).then(respp =>{
                    setResult([])
                    onReload();
                })
          }
        
      }

      const onReload = () =>{
        if(reload){
            setReload(false);
        } else{
            setReload(true)
        }
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
                        result.length > 0 ? result.map(
                            (result) =>
                                <tr key={result.id}>
                                    <td>{result.id}</td>
                                    <td>{result.product.photo}</td>
                                    <td>{result.product.name}</td>
                                    <td>{result.product.price}</td>
                                    <td>
                                        <button className="btn btn-outline-primary btn-number" onClick={(e) => tangSL(e, result.product.id,result.number)}></button>
                                        <input className="num" type="number" defaultValue={result.number} onBlur={(e)=>checkNumber(e,result.product.id, result.price)} />
                                            {/* {result.number} */}
                                        <button className="btn btn-outline-success btn-number" onClick={e=> giamSl(e, result.product.id,result.number)}></button>
                                    </td>
                                    <td>{result.total}</td>
                                    <td>
                                        <button onClick={() => xoaSP( result.product.id)} >X</button>
                                    </td>
                                </tr>
                        ) : <span style={{position: "absolute", left: " 48%"}}>Không có sản phẩm</span>             
                    }
                </tfoot>
            </table>
            <span style={{float: "right", margin: "0 65px 20px 0"}}>Tổng tiền: <span style={{fontWeight: " 500"}}>{thanhTien != undefined ? thanhTien : 0  } VNĐ</span> VNĐ</span>
            
            </TableContainer>
            <div id="select-cart">
                <Link to="/" style={{ backgroundColor: "#3d4356" }}>Tiếp tục mua hàng</Link>
                <Link to="/order">Thực hiện thanh toán</Link>
            </div>
    </React.Fragment>
    );
}

export default  ListCart;