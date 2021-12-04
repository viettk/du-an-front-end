import './css/head.css';
import Carousel from 'react-elastic-carousel';
import { useEffect, useState } from 'react';
import CategoryApi from '../api/CategoryApi';
import axios from 'axios';
import CookieService from '../cookie/CookieService';
import { useHistory } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { LinearProgress } from '@mui/material';
import CartApi from '../api/CartApi';

function Head() {
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

  // console.log(document.cookie)
  const [username,setUsername] = useState(user_name)
  // biến load lại trang
  const [load, setLoad] = useState(false);

  let getStorage = localStorage.getItem('cart');
  const [demo, setDemo] = useState(JSON.parse(getStorage));
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await CategoryApi.getAllCateCustomer();
        if (customerId) {
          const numberOfCart = await CartApi.getNumberOfCart(customerId, emailc);
          // setItemSp(numberOfCart);

        } else{
          setItemSp(demo.length);
        }
        
        setResult(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
  }, []);
  const logout = () => {
    CookieService.removeCookie();
    window.location.replace('http://localhost:3000/login')
  }


  const getValue = (e) => {

    try {
      CategoryApi.getAllCateCustomerByParent_name(e.currentTarget.textContent).then(reps => {
        setCate(reps)
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

  return (
    <header id="header">
      {/* <LinearProgress variant="determinate" value={progress} /> */}
      {/*header*/}
      <div className="header_top">
        {/*header_top*/}
        <h6> Mở cửa: 8h30 - 22h00, thứ 2 - CN hàng tuần</h6>
        {username ? (<span>
          <a >{username}</a>
          <b>|</b>
          {/* <a onClick={logout}  >Đăng xuất</a> */}
          <a onClick={logout}  >Đăng xuất</a>
        </span>) : (<span>
          <Link to="/login">Đăng nhập</Link>
          <b>|</b>
          <Link to="/register">Đăng ký</Link>
        </span>)}
      </div>


      <div className="header-mid">
        <img />
        <div className="header-mid-search">
          <input />
          <button><i class="fa fa-search" aria-hidden="true"></i></button>
        </div>
        <div className="head-cart_template">
          <i className="icon-tow fa fa-shopping-cart" />
          <Link to="/cart" className="head-midd-linkto-cart" >({itemSp}) Giỏ hàng</Link>
        </div>
      </div>

      {/*header-bottom*/}
      <div className="header-bottom">
        <ul className="header-menu-ul-main">
          <li className="head-dropdown">
              <i className="fa fa-align-justify" style={{ margin: "0 5px 0 5px" }} />
              Danh mục <span>sản phẩm</span>
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
            <ul className={active == true > 0 ? "head-menu-cate-all-child active" : "head-menu-cate-all-child" }>
                {
                  cate.map((result, index) =>
                    <li key={index}><Link className="head-cate-name" key={result.id} to={'/' + result.name + '/' + result.id + '/page=1/sort=0'}>{result.name}</Link></li>
                  )
                }
              </ul> 
          </li>
          <li><Link className="head-menu-bottom">Trang chủ</Link></li>
          <li><Link className="head-menu-bottom">Khiếu Nại</Link></li>
          <li><Link className="head-menu-bottom">Giới thiệu</Link></li>
          <li class="head-menu-huong-dan" style={{ position: "relative" }}>
            <a className="head-menu-bottom">Hướng dẫn</a>
            <ul className="drop-menu-hidden-vi">
              <li><Link>hahah</Link></li>
              <li><Link>csdv</Link></li>
              <li><Link>vndskhk</Link></li>
            </ul>
          </li>
        </ul>
        <span className="head-cong" onClick={openMobie} >+</span>
        <ul className={acmobie == true ? "head-menu-hidden-bottom acitve" : "head-menu-hidden-bottom"}>
          <li><Link className="head-menu-bottom">Khiếu nại</Link></li>
          <li><Link className="head-menu-bottom">Giới thiệu</Link></li>
          <li><Link className="head-menu-bottom">Hướng dẫn</Link></li>
        </ul>
      </div>
    </header>
  );
}
export default Head;