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

function ListCart() {

    const initValues = [];
    const [initParams, setInitParams]= useState(
        {
            cartId: 2,
            productId: '',
            number: ''
        }
    );

    const [idCustomer, setIdCustomer] = useState({
        customerId: 1
    })

    const [number, setNumber] = useState({
        num: ''
    });

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
          try{
            const response = await CartApi.getCartDetail(params.cartId);
            setResult(response); 
            const resp = await CartApi.getCart(idCustomer.customerId);
            SetThanhTien(resp.total);
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [params, result]);

      const tangSL=(e, idp,sl)=>{
        
        const sp = {
            cartId: 2,
            productId: idp,
            number: sl
        }
        axios({
            url: 'http://localhost:8080/cart-detail/up',
            method: 'PUT',
            type: 'application/json',
            data: sp,
            headers: {
                'Content-Type': 'application/json',
            }
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
        }).then(resp =>{
            setResult([])
        })
      }

      const giamSl =(e, idp, sl)=>{
     
        const sp = {
            cartId: 2,
            productId: idp,
            number: sl
        }
        axios({
            url: 'http://localhost:8080/cart-detail/down',
            method: 'PUT',
            type: 'application/json',
            data: sp,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp =>{
            setResult([])
        })
      }

      const xoaSP =(idp)=>{
        const sp = {
            cartId: 2,
            productId: idp,
        }
        axios({
            url: 'http://localhost:8080/cart-detail/',
            method: 'delete',
            type: 'application/json',
            data: sp,
            headers: {
                'Content-Type': 'application/json',
            }
        })
      }

      const dathang = ()=>{
          console.log('ọ')
      }

      const checkNumber = (e,idsp, price) =>{
          if(e.target.value <= 0){
            xoaSP(idsp);
          } else{
            const sp = {
                cartId: 2,
                productId: idsp,
                number: Math.round(e.target.value),
            }
            axios({
                url: 'http://localhost:8080/cart-detail/',
                method: 'put',
                type: 'application/json',
                data: sp,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch((error) => {
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
                })
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
                        result.map(
                            (result) =>
                                <tr key={result.id}>
                                    <td>{result.id}</td>
                                    <td>{result.product.image}</td>
                                    <td>{result.product.name}</td>
                                    <td>{result.product.price}</td>
                                    <td>
                                        <button onClick={(e) => tangSL(e, result.product.id,result.number)}>+</button>
                                        <input className="num" type="number" defaultValue={result.number} onBlur={(e)=>checkNumber(e,result.product.id, result.price)} />
                                            {/* {result.number} */}
                                        <button onClick={e=> giamSl(e, result.product.id,result.number)}>-</button>
                                    </td>
                                    <td>{result.total}</td>
                                    <td>
                                        <button onClick={() => xoaSP( result.product.id)} >X</button>
                                    </td>
                                </tr>
                        )              
                    }
                </tfoot>
            </table>
            <span>{thanhTien != undefined ? thanhTien : 0  } VNĐ</span>

            <div>
                <a onClick={() =>dathang()}>Đặt hàng</a>
            </div>
            </TableContainer>
    </React.Fragment>
    );
}
export default ListCart;