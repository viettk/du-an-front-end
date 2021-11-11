import '../css/main.css';
import '../css/bootstrap.min.css';
import Carousel from 'react-elastic-carousel';
import { useEffect, useState } from 'react';
import CategoryApi from '../api/CategoryApi';
import {connect} from 'react-redux';

function Head(props) {
  const [result, setResult] = useState([]);
  const [kit, setKit] = useState([]);
  useEffect(() => {
    const fetchList = async () =>{
      try{
        const response = await CategoryApi.getAllCate();
        setResult(response); 
        const respKit = await CategoryApi.getkit();
        setKit(respKit);
      }catch (error){
        console.log(error);
      }
    }
    fetchList();
  }, [result]);

  return (
    <header id="header">
      {/*header*/}
      <div className="header_top">
        {/*header_top*/}
        <h6 style={{ margin: "5px 0 0 125px", fontSize: "13px", fontWeight: "400" }}> Mở cửa: 8h30 - 22h00, thứ 2 - CN hàng tuần</h6>
        <span>
          <a>Đăng nhập</a>
          <b>|</b>
          <a>Đăng ký</a>
        </span>
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
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
            <div className="col-md-4 fix">
              <div className="hotline">
                <button type="button" className="border-one">
                  <i className="icon-one fa fa-phone" />
                </button>
                <a className="phone" style={{ padding: " 7px 0 0 5px", color: "white", fontSize: "15px" }}>0123456789 </a>
              </div>
              <div className="shopping">
                <button type="button" className="border-one">
                  <i className="icon-tow fa fa-shopping-cart" />
                </button>
                <a className="carta" href="cart.html" style={{ padding: "7px 0 0 5px", color: "white", fontSize: "15px" }}> (0) Sản phẩm</a>
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
                  <a href="#">
                    <i className="fa fa-align-justify" style={{ margin: "0 5px 0 5px" }} />
                    Danh mục sản phẩm
                  </a>
                  <ul role="menu" className="sub-menu all-cate">
                   {
                     result.map(result =>
                      <li><a href={'/'+ result.name +'/'+result.id+'/1'}>{result.name}</a></li>
                      )
                   }
                  </ul>
                </li>
                <li><a href="index.html" className="active">Home</a></li>
                <li className="dropdown">
                  <a href="#">Shf</a>
                  <ul role="menu" className="sub-menu">
                    <li><a href="category-product.html">Marvel</a></li>
                    <li>
                      <a href="category-product.html">Dragon ball</a>
                    </li>
                    <li><a href="category-product.html">Naruto</a></li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="#">Model kit</a>
                  <ul role="menu" className="sub-menu">
                    {
                      kit.map(kit =>
                        <li><a href={'/'+ kit.name +'/'+kit.id+'/1'}>{kit.name}</a></li>
                        )
                    }
                  </ul>
                </li>
                <li><a href>Mô hình tĩnh</a></li>
                <li><a href>Khuyến Mại</a></li>
                <li><a href>Giới thiệu</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {/*/header-botton */}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <Carousel>
            <img src="https://bizweb.dktcdn.net/100/342/840/themes/708938/assets/slider_1.jpg?1600682111037" className="d-block w-100" alt="..." />
            <img src="https://bizweb.dktcdn.net/100/342/840/themes/708938/assets/slider_4.jpg?1600682111037" className="d-block w-100" alt="..." />
            <img src="https://bizweb.dktcdn.net/100/342/840/themes/708938/assets/slider_1.jpg?1600682111037" className="d-block w-100" alt="..." />
          </Carousel>
        </div>

      </div>
    </header>

  );
}
const mapStateToProps = (state) => ({user : state.userReducer});
export default connect(mapStateToProps) (Head);