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

function ListCart({reload, setReload}) {
    const history = useHistory();
    const token = CookieService.getCookie('token');
    const customerId = CookieService.getCookie('id');
    const emailc = CookieService.getCookie('email');
    const initValues = [];
    const [disablebtn, setDisablebtn] = useState(false);
    const [initParams, setInitParams]= useState(
        {
            productId: '',
            number: ''
        }
    );

    const [number, setNumber] = useState({
        num: ''
    });
    
    const [reCart, setRecart] = useState(true);

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

    const reloadXoa =()=>{
        if(reload){
            setReload(false);
        } else{
            setReload(true);
        }
    }
      
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
      }, [params, reCart,customerId]);

      const tangSL=(e, index, idp, sl)=>{
        const sp = {
            productId: idp,
            number: sl
        }
        CartApi.tangSL(customerId, emailc, sp).then(resp =>{
            document.getElementsByClassName("num")[index].value = resp.number
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

      const giamSl =(e, index, idp, sl)=>{    
        const sp = {
            productId: idp,
            number: sl
        }
        CartApi.giamSL(customerId, emailc, sp).then(resp =>{
            document.getElementsByClassName("num")[index].value = resp.number;
            onReload();
        })
      }

      const xoaSP =(index, idp)=>{
        const sp = {
            productId: idp,
        }
        CartApi.xoaSP(customerId ,emailc, sp).then(reps=>{
            onReload();
            reloadXoa();
        })
        
      }

      const onBlurNumb = () => {
          setLoi({
              ...loi,
              num: ''
          });
          setMess({
              ...mess,
              errorMessage: ''
          })
      }

      const checkNumber = (e, index, idsp, price) =>{
          if(e.target.value <= 0){
            xoaSP(idsp);
          } else{
            const sp = {
                productId: idsp,
                number: Math.round(e.target.value),
            }
            CartApi.checknumber(customerId, emailc, sp).then(respp =>{
                document.getElementsByClassName("num")[index].value = respp.number
                onReload();
                setLoi({
                    ...loi,
                    number:''
                });
                setMess({
                    ...mess,
                    errorMessage:''
                })
                setDisablebtn(false);
            }).catch((error) => {
                setDisablebtn(true);
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
        
      }

      const onReload = () =>{
        if(reCart){
            setRecart(false);
        } else{
            setRecart(true)
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
        <h5 style={{marginTop: 10}}>Giỏ hàng của bạn</h5>
        <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <Link style={{ textDecoration: 'none' }} to='/home'>Home</Link>
                            <span className="span-link"><i class="fa fa-angle-right"></i></span>
                            <span>Giỏ hàng</span>
                        </ol>
                    </nav>
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
                <tfoot style={{height: "10px"}} className="tfoot-cart-index" >
                    {
                        result.length > 0 ? result.map(
                            (result, index) =>
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{result.product.photo}</td>
                                    <td>{result.product.name}</td>
                                    <td>{String(Math.round(result.product.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.') }</td>
                                    <td>
                                    <button className="button-sl" onClick={e => giamSl(e, index, result.product.id,result.number)} >-</button>
                                        <input style={{ border: "1px solid #ddd", width: "60px", textAlign: "center", padding: "2px 0" }} type="number" className="num" type="number" defaultValue={result.number} onBlur={(e)=>checkNumber(e, index,result.product.id, result.price)} />
                                            {/* {result.number} */}
                                        <button className="button-sl1" onClick={e => tangSL(e, index ,result.product.id,result.number)}>+</button>
                                    </td>
                                    <td>{String(Math.round(result.total)).replace(/(.)(?=(\d{3})+$)/g, '$1.')}</td>
                                    <td>
                                        <button style={{ border: "none" }} className="btn btn-outline-danger" onClick={() => xoaSP( index,result.product.id)} ><i class="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                        ) : <span style={{position: "absolute", left: " 48%"}}>Không có sản phẩm</span>             
                    }
                </tfoot>
            </table>
            <span style={{ color: "red", fontSize: "13px", marginLeft: "10px" }}>{loi.parent_name}</span>
            <span style={{ color: "red", fontSize: "13px", marginLeft: "10px" }}>{mess.errorMessage}</span>
            <span style={{float: "right", margin: "0 65px 20px 0"}}>Tổng tiền: <span style={{fontWeight: " 500"}}>{thanhTien != undefined ? String(Math.round(thanhTien)).replace(/(.)(?=(\d{3})+$)/g, '$1.') : 0  } VNĐ</span> VNĐ</span>
            
            </TableContainer>
            {
                        result.length > 0 ?
                            <div id="select-cart">
                                <div className="cart-hidden"></div>
                                <div className="cart-contact">
                                    <button onClick={returnAll} style={{ backgroundColor: "#3d4356" }} >Tiếp tục mua hàng</button>
                                    <button type="button" disabled={disablebtn} onClick={()=>thanhtoan()} >Thực hiện thanh toán</button>
                                </div>
                            </div> : <div></div>
                    }
                    </div>
    </React.Fragment>
    );
}

export default  ListCart;