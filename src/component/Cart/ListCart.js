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
import { useHistory } from "react-router-dom";
import { height } from "@mui/system";
import axios from "axios";
import './cart.css';
import CookieService from  '../../cookie/CookieService';
import SyncLoader from "react-spinners/SyncLoader";

function ListCart() {
    const history = useHistory();
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
    const [loading, setLoading] = useState(false);
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
            const resp = await CartApi.getCart(customerId);
            setResult(response); 
            SetThanhTien(resp.total);
            setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
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
                    setLoi({
                        ...loi,
                        number:''
                    });
                    setMess({
                        ...mess,
                        errorMessage:''
                    })
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
    const returnAll = () => {
        history.push('/all-product');
    }

    const thanhtoan =() =>{
        CartApi.checkLoginCart(emailc).then(resp=>{
            history.push('/order');
        }).catch((error)=>{
            if (error.response) {
                setLoi(error.response.data);
                setMess(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
        
    }

    return(
        <React.Fragment>
        <h5 style={{marginTop: 10}}>Gi??? h??ng c???a b???n</h5>
        <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <Link style={{ textDecoration: 'none' }} to='/home'>Home</Link>
                            <span className="span-link"><i class="fa fa-angle-right"></i></span>
                            <span>Gi??? h??ng</span>
                        </ol>
                    </nav>
        <TableContainer component={Paper}>
        <table className="table table-striped">
                <tbody>
                    <tr>
                        <td scope="col">STT</td>
                        <td scope="col">H??nh ???nh</td>
                        <td scope="col">T??n S???n ph???m</td>
                        <td scope="col">Gi??</td>
                        <td scope="col">S??? l?????ng</td>
                        <td scope="col">T???ng ti???n</td>
                        <td scope="col">X??a</td>
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
                                    <td>{String(Math.round(result.product.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' ??'}</td>
                                    <td>
                                    <button className="button-sl" onClick={e => giamSl(e, result.product.id,result.number)} >-</button>
                                        <input style={{ border: "1px solid #ddd", width: "60px", textAlign: "center", padding: "2px 0" }} type="number" className="num" type="number" defaultValue={result.number} onBlur={(e)=>checkNumber(e,result.product.id, result.price)} />
                                            {/* {result.number} */}
                                        <button className="button-sl1" onClick={e => tangSL(e, result.product.id,result.number)}>+</button>
                                    </td>
                                    <td>{String(Math.round(result.total)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' ??'}</td>
                                    <td>
                                        <button style={{ border: "none" }} className="btn btn-outline-danger" onClick={() => xoaSP( result.product.id)} ><i class="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                        ) : <span style={{position: "absolute", left: " 48%"}}>Kh??ng c?? s???n ph???m</span>             
                    }
                </tfoot>
            </table>
            <span style={{ color: "red", fontSize: "13px", marginLeft: "10px" }}>{loi.parent_name}</span>
            <span style={{ color: "red", fontSize: "13px", marginLeft: "10px" }}>{mess.errorMessage}</span>
            <span style={{float: "right", margin: "0 65px 20px 0"}}>T???ng ti???n: <span style={{fontWeight: " 500"}}>{thanhTien != undefined ? thanhTien : 0  } VN??</span> VN??</span>
            
            </TableContainer>
            {
                        result.length > 0 ?
                            <div id="select-cart">
                                <div className="cart-hidden"></div>
                                <div className="cart-contact">
                                    <button onClick={returnAll} style={{ backgroundColor: "#3d4356" }} >Ti???p t???c mua h??ng</button>
                                    <button onClick={()=>thanhtoan()} >Th???c hi???n thanh to??n</button>
                                </div>
                            </div> : <div></div>
                    }
                    </div>
    </React.Fragment>
    );
}

export default  ListCart;