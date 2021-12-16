import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import './favorite.css';
import axios from "axios";
import CookieService from "../../cookie/CookieService";
import ProductApi from "../../api/ProductApi";
import CartApi from "../../api/CartApi";
import { Alert, Snackbar } from "@mui/material";
import { Link } from 'react-router-dom';
import FavoriteApi from "../../api/FavoritApi";

function FavoriteNotLogin({reload, setReload}){

    const history = useHistory();
    const [mess, setMess] = useState({
        errorMessage: ''
    });

    const [loadx, setLoadx] = useState(true);

    const initParams= {
        _limit : '5',
        _page : 0,
        _field: 'id',
        _known: 'up'
    };

    const [ params, setParams] = useState(initParams);
    const [open, setOpen] = useState(false);
    
    const customerId = CookieService.getCookie('id');
    const emailc = CookieService.getCookie('email');

    const [result, setResult] = useState([]);
    let yt = [];
    const xoa = (e, idsp) => {
      if (customerId) {
        let ytlogin = {
          productId: idsp,
          customerId: customerId
        }
        FavoriteApi.deleteYeuthich(ytlogin).then(r=>{
          onReload();
        });
      } else {
        let storage = localStorage.getItem('yeuthich');
        if (storage) {
          yt = JSON.parse(storage);
        }
        yt = yt.filter(c => c.product_id != idsp);
        localStorage.setItem('yeuthich', JSON.stringify(yt));
        let reloadLocal = localStorage.getItem('yeuthich');
        setResult(JSON.parse(reloadLocal));
      }
    }

    const [count, setCount] = useState({
        num: 1
      });

      const onReload = () =>{
        if(loadx){
            setLoadx(false);
        } else{
            setLoadx(true);
        }
    }

    useEffect(() => {
        const fetchList = async () =>{
          try{
            if(customerId){
                const response = await ProductApi.getFavorite(customerId, params);
                setResult(response.content); 
            } else{
              if (localStorage.getItem("yeuthich") === null) {
                setResult([]);
              } else{
                setResult(JSON.parse(localStorage.getItem('yeuthich')));
              }
                
            }
            
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [params, reload, loadx]);

      const onLoad = () =>{
        if(reload === true){
          setReload(false);
        } else{
          setReload(true);
        }
      }

    let cart=[];
  const addToCart = (index, idsp, price, photo, name, weight) => {
    var x = document.getElementsByClassName('input-number-yt')[index].value;
    const detail = {
      productId: idsp,
      number: x,
    }

    const localDetail = {
      product_id: idsp,
      price: price,
      photo: photo,
      name: name,
      weight: weight,
      total: price * Number(x),
      number: x,
    }

    if (customerId) {
      CartApi.addToCartByUserLogin(customerId, emailc, detail).then(r=>{
        setOpen(true);
        onLoad();
      }).catch((error) => {
        if (error.response) {
          setMess(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })

    } else {
      let storage = localStorage.getItem('cart');
      console.log(localDetail)
      if (storage) {
        cart = JSON.parse(storage);
      }
      let item = cart.find(c => c.product_id == idsp)
      if (item) {
        item.number += count.num;
        item.total = price * item.number
      } else {
        cart.push(localDetail);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      onLoad();
      setOpen(true);
    }
  }

  const upCount = (index) => {
    var x = document.getElementsByClassName('input-number-yt')[index];
    x.value = Number(x.value)+1;
    if(x.value >= 15 ){
        x.value = 15;
    }
  }

  const downCount = (index) => {
    var x = document.getElementsByClassName('input-number-yt')[index];
    x.value = Number(x.value) - 1;
    if(x.value <= 1){
        x.value = 1;
    }
  }

  const handleClose = () =>{
    setOpen(false);  
    }

    const chuyentrang = (id) =>{
      history.push('/product/' + id );
    }

    return (
        customerId ? 
        <div className="yeu-thich-product">
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Cảm ơn Bạn đã đặt hàng !
                </Alert>
            </Snackbar>
            <h3 style={{ marginTop: 10 }}>Danh sách Sản phẩm yêu thích</h3>
            <div className="container">
                <div className="yeuthich-table">
                {
                    result.length > 0 ? result.map((result, index) =>
                        <div className="yeuthich-pro-body" key={index}>
                            
                            <div className="yeuthich-infor-product">
                            <img src={'/images/' + result.product.photo} className="f-img" />
                                <div className="yeuthich-first">
                                    <p onClick={() => chuyentrang(result.product.id)} style={{cursor: "pointer"}} >{result.product.name}</p>
                                    <p>Giá <span>{String(Math.round(result.product.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} VNĐ</span></p>
                                    <div className="input-group2">
                                    <button type="button" className="btn-number-yt" onClick={() => downCount(index)}>
                                        <i class="fa fa-minus"></i>
                                    </button>
                                    <input type="text" disabled={true} className="form-control input-number-yt" value={1} max={15} />
                                    <button type="button" className="btn-number-yt" onClick={() => upCount(index)}>
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                                </div>
                            </div>
                            <div className="yeuthich-second">
                                    <p>{String(Math.round(result.product.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} VNĐ</p>
                                    <p>{result.number > 0 && result.staus == true ? "Còn hàng" : "Hết hàng" }</p>
                                    <button type="button" onClick={() => addToCart(index, result.product.id, result.product.price, result.product.photo, result.product.name, result.product.weight)} ><i class="fa fa-shopping-cart"></i></button>
                                    {/* disabled={result.number <= 0 && result.staus == false ? false : true } */}
                                    <br/>
                                    <button onClick={(e) => xoa(e ,result.product.id)} type="button"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    ) : <span>Danh sách Sản phẩm yêu thích trống</span>
                }
                </div>
            </div>
        </div> :
        <div className="yeu-thich-product">
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Cảm ơn Bạn đã đặt hàng !
                </Alert>
            </Snackbar>
        <h3 style={{ marginTop: 10, textAlign: "center", textTransform: "uppercase"}}>Danh sách Sản phẩm yêu thích</h3>
        <div className="container">
            <div className="yeuthich-table">
            {
                result.length > 0 ? result.map((result, index) =>
                    <div className="yeuthich-pro-body" key={index}>                      
                        <div className="yeuthich-infor-product">
                        <img src={'/images/' + result.photo} className="f-img" />
                            <div className="yeuthich-first">
                                <p><Link to={'/product/'+result.product_id} >{result.name}</Link></p>
                                <p>Giá <span>{String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} VNĐ</span></p>
                                <div className="input-group2">
                                    <button type="button" className="btn-number-yt" onClick={() => downCount(index)}>
                                        <i class="fa fa-minus"></i>
                                    </button>
                                    <input type="text" disabled={true} className="form-control input-number-yt" value={1} max={15} />
                                    <button type="button" className="btn-number-yt" onClick={() => upCount(index)}>
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="yeuthich-second">
                                <p>{String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} VNĐ</p>
                                <p>{result.number > 0 && result.staus == true ? "Còn hàng" : "Hết hàng" }</p>
                                <button type="button" onClick={() => addToCart(index, result.product_id, result.price, result.photo, result.name, result.weight)} ><i class="fa fa-shopping-cart"></i></button>
                                <br/>
                                <button onClick={(e) => xoa(e, result.product_id)} type="button"><i class="fa fa-trash"></i></button>
                        </div>
                    </div>
                ) : <span>Danh sách Sản phẩm yêu thích trống</span>
            }
            </div>
        </div>
    </div>
    );
}
export default FavoriteNotLogin;