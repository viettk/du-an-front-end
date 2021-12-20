import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useHistory, useParams } from "react-router";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import ProductApi from "../../api/ProductApi";
import axios from "axios";
import FavoriteApi from "../../api/FavoritApi";
import CookieService from "../../cookie/CookieService";
import './favorite.css';

function Favorite(){
    const customerid = CookieService.getCookie('id');

    const initValues = [];
    const initParams= {
        _limit : '5',
        _page : 0,
        _field: 'id',
        _known: 'up'
    };

    const [reload, setReload] = useState(true);
    const [ params, setParams] = useState(initParams);
    const [ result, setResult] = useState(initValues);
    const [ page, setPage] = useState(initParams._page + 1);
    const [ count, setCount] = useState(0);
    const [search, setSearch] = useState({
        name: '',
        parent_name: ''
    });



    useEffect(() => {
        const fetchList = async () =>{
          try{
            const response = await ProductApi.getFavorite(customerid, params);
            setResult(response.content);    
          }catch (error){
            console.log(error);
          }
        }
        fetchList();
      }, [params, reload]);

      const handleChange = (event, value) => {
        setPage(value);
        setParams(
            {
                _limit : '5',
                _page : value-1,
            }
        );       
      };

      const xoa = (idpr) =>{
          let datasp = {
            productId: idpr,
            customerId: 1
          }
        FavoriteApi.deleteYeuthich(datasp).then(resp=>{
            onReload();
        })
       
      }

      const onReload = () =>{
          if(reload){
              setReload(false);
          } else{
              setReload(true);
          }
      }

      const addToCart = (idsp, price, photo, name, weight) => {
        const detail = {
            productId: idsp,
            number: 1,
          }
      }
      const src_img = process.env.REACT_APP_URL_IMAGE;
    return(
        <div className="yeu-thich-product">
            <h3 style={{ marginTop: 10 }}>Danh sách Sản phẩm yêu thích</h3>
            <div className="container">
                <div className="yeuthich-table">
                {
                    result.map((result, index) =>
                        <div className="yeuthich-pro-body" key={index}>
                            
                            <div className="yeuthich-infor-product">
                            <img src={src_img + result.photo} className="f-img" />
                                <div className="yeuthich-first">
                                    <p>{result.name}</p>
                                    <p>Giá <span>{String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} VNĐ</span></p>
                                </div>
                            </div>
                            <div className="yeuthich-second">
                                    <p>{String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} VNĐ</p>
                                    <p>{result.number > 0 && result.staus == true ? "Còn hàng" : "Hết hàng" }</p>
                                    <button type="button" onClick={() => addToCart(result.id, result.price, result.photo, result.name, result.weight)} ><i class="fa fa-shopping-cart"></i></button>
                                    {/* disabled={result.number <= 0 && result.staus == false ? false : true } */}
                                    <br/>
                                    <button onClick={(e) => xoa(e, result.product_id)} type="button"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
            <Stack spacing={2}>
                <Pagination className="d-flex justify-content-center" count={count}  page={page} onChange={handleChange}  color="secondary"/>
            </Stack>
        </div>
    );
}
export default Favorite; 