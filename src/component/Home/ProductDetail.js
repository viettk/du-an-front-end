
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

function ProductDetail() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const customerId = CookieService.getCookie('id');
  const emailc = CookieService.getCookie('email');
  const [loading, setLoading] = useState(false);
  const [imagep, setImagep] = useState([]);

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

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await HomeApi.getDetail(idpage.id);
        const resp = await FavoriteApi.getOne(customerId, idpage.id);
        console.log(resp)
        setResult(response);
        setY(resp);
        setLoading(true);
        setImagep(response.photos)
        setTimeout(() => {
          setLoading(false);
        }, 1000);

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
      alert('Số lượng phải lớn hơn 1')
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
      }).then(
        history.push('/cart')
      ).catch((error) => {
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
      localStorage.setItem('cart', JSON.stringify(cart))
      history.push('/cart')
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
        url: 'https://tranhoangmaianh.herokuapp.com/cart-detail/' + customerId + '?email=' + emailc,
        method: 'post',
        type: 'application/json',
        data: detail,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
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
    }
  }

  const yeuThich = (idsp) => {
    const yt = {
      productId: idsp,
      customerId: customerId
    }

    if (y) {
      FavoriteApi.deleteYeuthich(yt).then(resp => {
        setY(false);
      })

    } else {
      FavoriteApi.postYeuthich(yt).then(resp => {
        setY(true);
      })
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
                    {customerId ? <i onClick={() => yeuThich(result.id)} style={{color: y ? "red" : "lightgray", cursor: "pointer"}} class="fa fa-heart pr-he"></i> : <span></span>}
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
                <a className="brand" href>FIGMA &amp; S.H.F</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                  <span className="navbar-toggler">
                    <i className="fa fa-bars fa-3x" />
                  </span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                  <div className="navbar-nav me-auto" />
                  <div className="d-flex">
                    <ul className="navbar-nav me-auto text">
                      <div className="correction">
                        <a className="nav-link" href>Marvel</a>
                      </div>
                      <div className="correction">
                        <a className="nav-link" href>Marvel</a>
                      </div>
                      <div className="correction">
                        <a className="nav-link" href>Marvel</a>
                      </div>
                      <div className="correction">
                        <a className="nav-link" href>Marvel</a>
                      </div>
                      <div className="correction">
                        <a className="nav-link" href>Xem tất cả</a>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="icon">
                  <a href><i className="fa fa-angle-left fa-2x" style={{ marginRight: '5px' }} /></a>
                  <a href><i className="fa fa-angle-right fa-2x" /></a>
                </div>
              </div>
            </nav>
            <div className="product-body-favorite">
              <div className="product-body-live">
                <img src="" style={{ width: "90%", height: "210px" }} className="rounded-like mx-auto d-block" />
                <div className="body-pro-buy">
                  <p className="fix-line-css"><b>Name</b></p>
                  <p>SKU:</p>
                  <h6 className="price"><b>100000</b> </h6>
                </div>
              </div>
              <div className="product-body-live">
                <img src="" style={{ width: "90%", height: "210px" }} className="rounded-like mx-auto d-block" />
                <div className="body-pro-buy">
                  <p className="fix-line-css"><b>Name</b></p>
                  <p>SKU:</p>
                  <h6 className="price"><b>100000</b> </h6>
                </div>
              </div>
              <div className="product-body-live">
                <img src="" style={{ width: "90%", height: "210px" }} className="rounded-like mx-auto d-block" />
                <div className="body-pro-buy">
                  <p className="fix-line-css"><b>Name</b></p>
                  <p>SKU:</p>
                  <h6 className="price"><b>1000</b> </h6>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </section>
  );
}

export default ProductDetail;