import '../css/main.css';
import '../css/bootstrap.min.css';
import Carousel from 'react-elastic-carousel';
import { useEffect, useState } from 'react';
import CategoryApi from '../api/CategoryApi';
import {connect} from 'react-redux';
import {removeUser} from '../redux_user/user-action'
import axios from 'axios';

function Head(props) {
  const [result, setResult] = useState([]); 
  const [cate, setCate] = useState([]);
  const username = localStorage.getItem('name');
  const [number, setNumber] = useState(0);
  const [active, setActive] = useState(false);
  useEffect(() => { 
    const fetchList = async () =>{    
      try{
        
        const response = await CategoryApi.getAllCate();
        setResult(response); 
      }catch (error){
        console.log(error);
      }
    } 
    fetchList();
  }, [username]);
  const logout = (event) => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    props.removeUser('')
  }

  const getValue = (e)=>{
    axios({
      url: 'http://localhost:8080/danh-muc/timtheocha?parentName=' + e.currentTarget.textContent,
      method: 'get',
      type: 'application/json',
      headers: {
          'Content-Type': 'application/json',
      }
  }).then(reps =>{
    setCate(reps.data)
    setActive(true);
  })
  }

  const changeValue = () =>{
    setCate([])
  }

  const changeActivate = () =>{
    setActive(false);
  }
  return (
    <header id="header">
      {/*header*/}
      <div className="header_top">
        {/*header_top*/}
        <h6 style={{ margin: "5px 0 0 125px", fontSize: "13px", fontWeight: "400" }}> Mở cửa: 8h30 - 22h00, thứ 2 - CN hàng tuần</h6>
        {username ?(<span>
          <a >{username}</a>
          <b>|</b>
          {/* <a onClick={logout}  >Đăng xuất</a> */}
          <a href="/cart"  >Đăng xuất</a>
        </span>):(<span>
          <a href="http://localhost:3000/login">Đăng nhập</a>
          <b>|</b>
          <a href="http://localhost:3000/register">Đăng ký</a>
        </span>)}
      </div>
      <div className="header-middle" style={{ margin: 0, backgroundColor: "black" }}>
        <div className="container">
          <div className="row align-items-start center-mid">
            <div className="col-md-3">
              <div className="logo pull-left">
                <a href="index.html"><img src="images/logo.png" alt="" />
                </a>
              </div>
            </div>
            <div className="col-md-5">
              <div className="input-group rounded" style={{ width: "100%" }}>
                <input type="search" className="form-control rounded" style={{ fontSize: '15px', padding: " 10px 0 10px 10px" }} placeholder="Bạn đang tìm sản phẩm nào ..." aria-label="Search" aria-describedby="search-addon" />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" style={{margin: "-1px 0 0 -2px", backgroundColor: "#ffba00"}} >
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
            <div className="col-md-4 fix">
              <div className="hotline">
                <button type="button" className="border-one" style={{backgroundColor: "white"}}>
                  <i className="icon-one fa fa-phone" />
                </button>
                <a className="phone" style={{ padding: " 5px 0 0 5px", color: "white", fontSize: "15px"}}>0123456789 </a>
              </div>
              <div className="shopping">
                <button type="button" className="border-one" style={{backgroundColor: "white"}}>
                  <i className="icon-tow fa fa-shopping-cart" />
                </button>
                <a className="carta" href="cart.html" style={{ padding: "5px 0 0 5px", color: "white", fontSize: "15px" }}> ({number}) Sản phẩm</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/header-middle*/}
      {/*header-bottom*/}
      <div className="header-bottom-b">
        <div className="container" style={{ backgroundColor: "#393a44" }}>
          <nav className="navbar navbar-expand-lg navbar-light center " style={{ padding: 0 }}>
            <div className="mainmenu pull-left ">
              <ul className="nav navbar-nav collapse navbar-collapse menu-drop">
                <li className="dropdown">
                  <a href="#" onMouseOver={changeActivate} >
                    <i className="fa fa-align-justify" style={{ margin: "0 5px 0 5px" }}  />
                    Danh mục sản phẩm
                  </a>
                  <ul role="menu" className="sub-menu all-cate headmenu-cate" >
                    <div style={{position: "relative"}} >
                    {
                      result.map((result) =>
                        <li key={result} value={result} onMouseOver={(e) => getValue(e)}>
                          <a>{result}</a>
                        </li>
                        
                      )
                    }
                    </div>
                    <div className={ active == false ? "head-menu-cate-child" : "head-menu-cate-child active"} >
                        {
                           cate.map(result =>
                            <a key={result.id} href={'/'+ result.name +'/'+result.id+'/1'}>{result.name}</a>
                            )
                        }
                    </div>
                  </ul>
                </li>
                <li><a href="index.html" className="active">Trang chủ</a></li>
                <li><a href>Khuyến Mại</a></li>
                <li><a href>Giới thiệu</a></li>
                <li><a href>Hướng dẫn</a></li>
                <li><a href>Kiểm tra đơn hàng</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>

  );
}
const mapDispatchToProps = dispatch => ({
  removeUser: userInfo => dispatch(removeUser(userInfo))
})
const mapStateToProps = (state) => ({user : state.userReducer});
export default connect(mapStateToProps,mapDispatchToProps) (Head);