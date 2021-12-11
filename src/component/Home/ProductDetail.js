
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import HomeApi from "../../api/HomeApi";
import '../../css/bootstrap.min.css';
import { connect } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CookieService from "../../cookie/CookieService";
import './css/product-detail.css'
import FavoriteApi from "../../api/FavoritApi";
import SyncLoader from "react-spinners/SyncLoader";
import Carousel from 'react-grid-carousel'

function ProductDetail({reload, setReload}) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const customerId = CookieService.getCookie('id');
  const emailc = CookieService.getCookie('email');
  const [loading, setLoading] = useState(false);
  const [imagep, setImagep] = useState([]);
  let storage = localStorage.getItem('yeuthich');
  const [notloginyt, setNotloginyt] = useState(JSON.parse(storage));

  const token = localStorage.token;
  const idpage = useParams();
  const [result, setResult] = useState({});
  const [count, setCount] = useState({
    num: 1
  });
  const [mess, setMess] = useState({
    errorMessage: ''
  });
  const history = useHistory();
  const [y, setY] = useState(false);
  const [goiysp, setGoiysp] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await HomeApi.getDetail(idpage.id);
        if(customerId){
          const resp = await FavoriteApi.getOne(customerId, idpage.id);
          setY(resp);
        } else{
          let item = notloginyt.find(c => c.product_id == idpage.id)
          if (item) {
            setY(true);
          }
        }
        

        const goiy = await FavoriteApi.goiYsanPham(response.price);

        setResult(response);
        setImagep(response.photos)
        setGoiysp(goiy);

      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
  }, [idpage]);

  const upCount = () => {
    setCount({
      ...count,
      num: count.num + 1
    })

  }
  const downCount = () => {
    if (count <= 1) {
      setCount({
        ...count,
        num: 1
      })
    }
    else {
      setCount({
        ...count,
        num: count.num - 1
      })
    }
  }

  const updateCount = (e) => {
    setCount({
      ...count,
      num: e.target.value
    })
  }
  // localStorage.clear();
  const muaNgay = (idsp, price, photo, name, weight) => {
    const detail = {
      productId: idsp,
      number: count.num
    }

    const localDetail = {
      product_id: idsp,
      price: price,
      photo: photo,
      name: name,
      weight: weight,
      total: price * count.num,
      number: count.num,
    }

    if (customerId) {
      axios({
        url: 'https://tranhoangmaianh.herokuapp.com/cart-detail/' + customerId + '?email=' + emailc,
        method: 'post',
        type: 'application/json',
        data: detail,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }).then(r =>{
        onLoad();
        history.push('/cart')
        }).catch((error) => {
        if (error.response) {
          setMess(error.response.data);
          console.log(mess.errorMessage);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
    } else {
      let storage = localStorage.getItem('cart');
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
      history.push('/cart');
    }
  }

  // localStorage.removeItem('cart');

  let cart = [];
  const addToCart = (idsp, price, photo, name, weight) => {
    const detail = {
      productId: idsp,
      number: count.num,
    }

    const localDetail = {
      product_id: idsp,
      price: price,
      photo: photo,
      name: name,
      weight: weight,
      total: price * count.num,
      number: count.num,
    }

    if (customerId) {

      axios({
        url: 'http://tranhoangmaianh.herokuapp.com/cart-detail/' + customerId + '?email=' + emailc,
        method: 'post',
        type: 'application/json',
        data: detail,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }).then(r=>{
        onLoad();
      }).catch((error) => {
        if (error.response) {
          setMess(error.response.data);
          console.log(mess.errorMessage);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })

    } else {
      let storage = localStorage.getItem('cart');
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
    }
  }

  let localyt = [];
  const yeuThich = (idsp, price, photo, name, weight) => {
    const yt = {
      productId: idsp,
      customerId: customerId
    };

    const localyeuthich ={
      product_id: idsp,
      price: price,
      photo: photo,
      name: name,
      weight: weight,
      total: price,
      number: count.num,
    }
    if(customerId){
      if (y) {
        FavoriteApi.deleteYeuthich(yt).then(resp => {
          setY(false);
        })
      } else {
        FavoriteApi.postYeuthich(yt).then(resp => {
          setY(true);
        })
      }
    } else{
      let storageYt = localStorage.getItem('yeuthich');
      if (storageYt) {
        localyt = JSON.parse(storageYt);
      }      

      if(y){
        localyt = localyt.filter(c => c.product_id != idsp);
        localStorage.setItem('yeuthich', JSON.stringify(localyt));
        setY(false)
      } else{
        localyt.push(localyeuthich);
        setY(true)
      }  
      localStorage.setItem('yeuthich', JSON.stringify(localyt));
    }
  }

  const changeimg = (index) => {
    if (index == 0) {
      var a = document.getElementsByClassName('product-detail-image')[0].src;
      document.getElementById('product-detail-image-main').src = a;
    } else if (index == 1) {
      var b = document.getElementsByClassName('product-detail-image')[1].src;
      document.getElementById('product-detail-image-main').src = b;
    } else if (index == 2) {
      var c = document.getElementsByClassName('product-detail-image')[2].src;
      document.getElementById('product-detail-image-main').src = c;
    } else {
      var d = document.getElementById('product-detail-image-main-b').src;
      document.getElementById('product-detail-image-main').src = d;
    }
  }

  const onLoad = () =>{
    if(reload === true){
      setReload(false);
    } else{
      setReload(true);
    }
  }

  return (
    <section>
      {loading ?
        <div className="screenn-load">
          <SyncLoader loading={loading} color={'#8DD344'} />
        </div>
        :
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Sản phẩm chi tiết</li>
            </ol>
          </nav>
          <div className="product-details">
            <div className="product-detail-body">
              <div className="pr-detail-img">
                <img id="product-detail-image-main" src={'/images/' + result.photo} height="400px" />
                <div className="img-detail">
                  {
                    imagep.map((i, index) =>
                      <img key={index} className="product-detail-image" src={'/images/' + i.name} onClick={() => changeimg(index)} />
                    )
                  }
                  <img id="product-detail-image-main-b" src={'/images/' + result.photo} onClick={() => changeimg(3)} />
                </div>
              </div>
              <div className="pr-detail-infor">
                <div className="product-information">

                  <h4 className="fix-line-css">{result.name}</h4>
                  <span>Tình trạng : {result.number > 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                  <span style={{ margin: "0 5px" }}> | </span>
                  <span>SKU: {result.sku}</span>

                  <div style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: 'bold', marginRight: " 20px", fontSize: "25px" }}>
                      {result.price}
                      <u>đ</u>
                    </span>
                    <span style={result.price != result.price_extra ? { display: "inline-block" } : { display: "none" }}>
                      <strike> {result.price_extra} </strike>
                      <u>đ</u>
                    </span>
                  </div>

                  <div className="frames">
                    <p> <i class="fa fa-check-circle" style={{ color: "#64c343", marginRight: "5px" }}></i>Tặng móc chìa khóa cho đơn hàng trên 500K</p>
                    <p> <i class="fa fa-check-circle" style={{ color: "#64c343", marginRight: "5px" }}></i>Mô hình có độ chi tiết tốt, các khớp cử động linh hoạt.</p>
                    <p> <i class="fa fa-check-circle" style={{ color: "#64c343", marginRight: "5px" }}></i>Có thiết kế đẹp mắt, màu sắc tươi sáng, thích hợp để trang trí.</p>
                    <p> <i class="fa fa-check-circle" style={{ color: "#64c343", marginRight: "5px" }}></i> Dễ dàng để chơi, tạo dáng, phù hợp với mọi lứa tuổi.</p>
                  </div>
                  <div className="quantity">
                    <p className="text-quantity"><b>Số lượng:</b></p>
                    <div className="input-group1">
                      <button type="button" className="btn btn-outline-primary btn-number" onClick={() => downCount()}>
                        -
                      </button>
                      <input type="text" className="form-control input-number" onChange={(e) => updateCount(e)} style={{ width: '100%', textAlign: 'center' }} value={count.num} max={15} />
                      <button type="button" className="btn btn-outline-success btn-number" onClick={() => upCount()}>
                        +
                      </button>
                    </div>
                    <i onClick={() => yeuThich(result.id, result.price, result.photo, result.name, result.weight)} style={{color: y ? "red" : "lightgray", cursor: "pointer"}} class="fa fa-heart pr-he"></i>
                  </div>

                  <div className="button-pro-detai">
                    <button onClick={() => addToCart(result.id, result.price, result.photo, result.name, result.weight)} type="button" className="btn btn-outline-primary btn-de"><i className="fa fa-shopping-basket" /> Thêm vào giỏ hàng</button>
                    <button onClick={() => muaNgay(result.id, result.price, result.photo, result.name, result.weight)} type="button" className="btn btn-outline-danger btn-de">Mua ngay </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="category-tab shop-details-tab" style={{ marginTop: "40px" }}>
            {/*category-tab*/}
            <ul className="nav nav-tabs">
              <li className="active"><a className="nav-title" data-toggle="tab">Mô tả sản phẩm</a></li>
              <span className="descriptio">
                <p>
                  <i className="fa fa-angellist " />
                  <span>
                    Khi nhận hàng các bạn nên kiểm tra từ bên ngoài, không bóc túi runner, nếu có vấn đề gì thì báo cho shop. Các vấn đề phát sinh sau khi đã bóc túi ra, shop sẽ không chịu trách nhiệm.
                  </span>
                </p>
                <p><i className="fa fa-angellist " />
                  <span>Tỷ lệ: 1/100</span>
                </p>
                <p><i className="fa fa-angellist " />
                  <span>Dòng: Master Grade (MG)</span>
                </p>
                <p><i className="fa fa-angellist " />
                  <span>Chiều cao sản phẩm: 16cm</span>
                </p>
                <p><i className="fa fa-angellist " />
                  <span>Có base đi kèm: Không</span>
                </p>
                <p><i className="fa fa-angellist " />
                  <span>Cement và Paint (keo và sơn): Không yêu cầu</span>
                </p>
              </span>
            </ul>
          </div>
          <div className="product-name-title">
            <nav className="navbar navbar-expand-sm navbar-dark bg-light">
              <div className="container-fluid">
                <a className="brand" href>Sản phẩm Yêu thích</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                  <span className="navbar-toggler">
                    <i className="fa fa-bars fa-3x" />
                  </span>
                </button>
              </div>
            </nav>

            <div className="product-body-favorite">
                {
                  goiysp.map((goiysp, index) =>
                    <div className="product-body-live" key={index}>
                      <img src={'/images/'+goiysp.photo} className="rounded-like mx-auto d-block goiysp" />
                      <div className="body-pro-buy">
                        <p className="fix-line-css"><b>{goiysp.name}</b></p>
                        <p>SKU: {goiysp.sku}</p>
                        <h6 className="price"><b>{goiysp.price}</b> </h6>
                      </div>
                    </div>
                  )
                }
            </div>
          </div>
        </div>}
    </section>
  );
}

export default ProductDetail;