import './css/head.css';
import Carousel from 'react-elastic-carousel';
import { useEffect, useState } from 'react';
import CategoryApi from '../api/CategoryApi';
import { connect } from 'react-redux';
import { removeUser } from '../redux_user/user-action'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { LinearProgress } from '@mui/material';

function Head(props) {
  const history = useHistory();
  const [result, setResult] = useState([]);
  const [cate, setCate] = useState([]);
  const username = localStorage.getItem('name')
  // const [username, setUsername] = useState(name);
  const [number, setNumber] = useState(0);
  const [active, setActive] = useState(false);

  // biến load lại trang
  const [load, setLoad] = useState(false);
  const onLoad = () => {
    if (load) {
      setLoad(false)
    } else {
      setLoad(true)
    }
  }
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await CategoryApi.getAllCateCustomer();
        setResult(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
  }, [load]);
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    props.removeUser('')
    onLoad()
    history.push("/login")
  }


  const getValue = (e) => {

    try {
      CategoryApi.getAllCateCustomerByParent_name(e.currentTarget.textContent).then(reps => {
        setCate(reps)
        setActive(true);
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
          <Link to="/cart" className="head-midd-linkto-cart" >(0) Giỏ hàng</Link>
        </div>
      </div>

      {/*header-bottom*/}
      <div className="header-bottom">
        <ul className="header-menu-ul-main">
          <li className="head-dropdown">
            <Link href="#"  >
              <i className="fa fa-align-justify" style={{ margin: "0 5px 0 5px" }} />
              Danh mục <span>sản phẩm</span>
            </Link>
            <ul className="header-category-show" >
              <div className="head-category-first" style={{ position: "relative", display: "grid" }} >
                {
                  result.map((result) =>
                    <li className="head-parent-name" key={result} value={result} onMouseOver={(e) => getValue(e)} >
                      <Link className="head-cate-parent" key={result} to={'/' + result + '/page=1/sort=0'}>{result}</Link>
                    </li>

                  )
                }
              </div>
              <div className="head-menu-cate-child" >
                <ul className="head-menu-cate-all-child">
                  {
                    cate.map(result =>
                      <li><Link className="head-cate-name" key={result.id} to={'/' + result.name + '/' + result.id + '/page=1/sort=0'}>{result.name}</Link></li>
                    )
                  }
                </ul>
              </div>
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
const mapDispatchToProps = dispatch => ({
  removeUser: userInfo => dispatch(removeUser(userInfo))
})
const mapStateToProps = (state) => ({ user: state.userReducer });
export default connect(mapStateToProps, mapDispatchToProps)(Head);