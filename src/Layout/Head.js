import './css/head.css';
import Carousel from 'react-elastic-carousel';
import { useEffect, useState } from 'react';
import CategoryApi from '../api/CategoryApi';
import axios from 'axios';
import CookieService from '../cookie/CookieService';
import { useHistory } from 'react-router-dom';
import GoogleApi from '../api/GoogleApi';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { LinearProgress } from '@mui/material';
import CartApi from '../api/CartApi';
import logo from './Team_7_Logo.png';

function Head({reload}) {
  const history = useHistory();
  const [result, setResult] = useState([]);
  const [cate, setCate] = useState([]);
  // const [username, setUsername] = useState(name);
  const [number, setNumber] = useState(0);
  const [active, setActive] = useState(false);
  
  const [itemSp, setItemSp] = useState(0);

  const user_name = CookieService.getCookie('name');
  const customerId = CookieService.getCookie('id');
  const emailc = CookieService.getCookie('email');
  console.log(CookieService.getCookie('role'))
  // console.log(document.cookie)
  const [username,setUsername] = useState(user_name);
  // biến load lại trang
  const [load, setLoad] = useState(false);

  const [search, setSearch] = useState({
    productname: ''
  });

  
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await CategoryApi.getAllCateCustomer();
        if (customerId) {
          CartApi.getNumberOfCart(customerId, emailc).then(reps =>{
            // setItemSp(reps);
            console.log(reps)
          });
        } else{
          setItemSp(JSON.parse(localStorage.getItem('cart')).length);
        }
        setResult(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
  }, [reload]);

  const logout = () => {
    if(CookieService.getCookie('accessToken')){
      GoogleApi.logout(CookieService.getCookie("accessToken"))
    }
    CookieService.removeCookie();
    alert('Logout !')
    window.location.replace('http://localhost:3000/login')
  }

  const getValue = (e) => {

    try {
      CategoryApi.getAllCateCustomerByParent_name(e.currentTarget.textContent).then(reps => {
        setCate(reps);
        if(reps.length > 0){
          setActive(true)
        } else{
          setActive(false)
        }
      });   
    } catch (error) {
      console.log(error);
    }
  }
  const changeValue = () => {
    setCate([])
  }

  const changeActivate = () => {
    setActive(false);
  }

  const [acmobie, setAcmobie] = useState(false);
  const openMobie = () =>{ 
    if(acmobie == false){
      setAcmobie(true);
    } else {
      setAcmobie(false);
    }
  }

  const searchProduct = (e) =>{
    setSearch({
      ...search,
      productname: e.target.value
    })
  }

  const submitform = ()=>{
    history.push("/all-product/query="+search.productname+'/page=1&sort=1' );
  }

  return (
    <header id="header">
      {/* <LinearProgress variant="determinate" value={progress} /> */}
      {/*header*/}
      <div className="header_top">
        {/*header_top*/}
        <h6> Mở cửa: 8h30 - 22h00, thứ 2 - CN hàng tuần</h6>
        {username ? (<span style={{color:'white'}}>
        <a className="login-item" >{username}
          <ul className="hover-login">
            <li  className="login-item"><Link to=""> Lịch sử <span  className='an-di'> mua hàng</span></Link></li>
            </ul>
          </a>
          
          <b>|</b>
          {/* <a onClick={logout}  >Đăng xuất</a> */}
          <a onClick={logout}  >Đăng xuất</a>
        </span>) : (<span>
          <Link to="/login" style={{cursor: "pointer"}}>Đăng nhập</Link>
          <b>|</b>
          <Link to="/register" style={{cursor: "pointer"}}>Đăng ký</Link>
        </span>)}
      </div>

      <div className="header-mid">
        <img className='logo-header' src={logo} style={{width:"100px", height:"80px", margin:"auto"}}/>
        <div className="header-mid-search ">
          <input onChange={(e)=>searchProduct(e) } type="search" className="input-search form-control" placeholder="Bạn đang tìm sản phẩm nào ..." aria-label="Search" aria-describedby="search-addon" />
          <button onClick={() => submitform()} className="btn btn-warning" type="button">
            <i className="fa fa-search" />
          </button>
        </div>
        <div className="head-cart_template">
          
          <div className="cart-view">
            <i className="icon-tow fa fa-shopping-cart" />
            <Link to="/cart" className="head-midd-linkto-cart" >({itemSp}) Giỏ hàng</Link>
          </div>
        </div>
      </div>

      {/*header-bottom*/}
      <div className="header-bottom">
      <ul className="header-menu-ul-main" style={{width:'1px'}}>
          <li className="head-dropdown" style={{margin:'0'}}>
            <p className="cate"> <i className="fa fa-align-justify"/> Danh mục <span className="title-sp">sản phẩm</span></p> 
            <ul className="header-category-show" >
              {
                result.map((result) =>
                  <li className="head-parent-name" key={result} value={result} onMouseOver={(e) => getValue(e)} >
                    <Link className="head-cate-parent" key={result} to={'/' + result + '/page=1/sort=0'}>{result}</Link>
                    <i class="fa fa-angle-right viet-li-arrow-cate"></i>
                  </li>
                )
              }
            </ul>
            <ul className={active == true > 0 ? "head-menu-cate-all-child active" : "head-menu-cate-all-child"}>
              {
                cate.map((result, index) =>
                  <li key={index}><Link className="head-cate-name" key={result.id} to={'/' + result.name + '/' + result.id + '/page=1/sort=0'}>{result.name}</Link></li>
                )
              }
            </ul>
          </li>
      </ul>
      <nav className="menu">
        <ul>
          <li className="menu-item"><Link>Trang chủ</Link></li>
          <li className="menu-item"><Link to="/gioi-thieu">Yêu thích</Link></li>
          <li className="menu-item"><Link to="/chinh-sach-doi-tra-hoan-tien">Chính sách</Link></li>
          <li className="menu-item"><Link to="/gioi-thieu">Giới thiệu</Link></li>
          <li className="menu-item">
            <a href="#">Hướng dẫn</a>
            <ul className="sub-menu">
            <li className="menu-item"><Link to="/huong-dan-mua-hang"><span className='an-di'>Hướng dẫn </span> mua hàng</Link></li>
              <li className="menu-item"><Link><span className='an-di'>Hướng dẫn </span> thanh toán</Link></li>
              <li className="menu-item"><Link to="/huong-dan-doi-tra"><span className='an-di'>Hướng dẫn </span> đổi trả</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
        
      </div>

    </header>

  );
}
export default Head;