import { useEffect, useState } from "react";
import HomeApi from "../../api/HomeApi";
import { useHistory } from "react-router-dom";
import '../../css/style.css'
import '../../css/demo.css'
import '../../css/responsive.css'
import '../../css/bootstrap.min.css'
import logo from './a.jpg';
import logoa from './b.jpg';
import { border } from "@mui/system";
import Carousel from 'react-grid-carousel'
import axios from "axios";
import Head from "../../Layout/Head";

function Home() {

  const [resultnew, setResultnew] = useState([]);
  const [resultKit, setResultKit] = useState([]);
  const [resultShf, setResulshf] = useState([]);
  const [resultd, setResultd] = useState([]);
  const history = useHistory();
  const [mess, setMess] = useState({
    errorMessage: ''
});

  useEffect(() => {
    const fetchList = async () => {
      try {
        const respSHF = await HomeApi.getShf();
        setResulshf(respSHF.content);
        const respKit = await HomeApi.getKit();
        setResultKit(respKit.content);
      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
  }, [resultShf]);

  const detail = (id) => {
    history.push('/product/' + id);
  }

  const addToCart =(id)=>{
    const sp = {
      cartId: 1,
      productId: id,
      number: 1
  }
  axios({
      url: 'http://localhost:8080/cart-detail/',
      method: 'post',
      type: 'application/json',
      data: sp,
      headers: {
          'Content-Type': 'application/json',
      }
  }).catch((error) => {
    if (error.response) {
        setMess(error.response.data);
        alert(mess.errorMessage);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
})
  }

  return (
    <section>
      <div className="container">
        <h2 className="title text-center">NEW ARRIVALS</h2>
        <div className="new-produtc">
          <div className="productinfo text-center">
            <img src="images/demo.png" alt="" className />
            <p className="fix-line-css">Bandai SD Sangoku Soketsuden</p>
            <p>SKU: JP202101</p>
            <span className="pro-body">
              <h2>613.000 VND</h2>
              <a id="right">
                <i className="fa fa-heart fa-2x" style={{ color: 'red' }} />
                <p>10 lượt thích</p>
              </a>
            </span>
            <div className="when-hover">
              <button className="btn btn-dark add-to-cart">
                <i className="fa fa-shopping-cart" />Mua ngay
              </button>
              <button className="btn btn-dark add-to-cart">
                <i className="fa fa-eye" />
              </button>
            </div>
          </div>
        </div>
        <div className="product-name-title" id="product-first">
          <nav className="navbar navbar-expand-sm navbar-dark bg-light" >
            <div className="container-fluid" style={{borderBottom: "1px solid black"}} >
              <a className="brand" href>Mô hình SHF</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler">
                  <i className="fa fa-bars fa-3x" />
                </span>
              </button>
              <div className="collapse navbar-collapse" id="mynavbar">
                <div className="navbar-nav me-auto" />
              </div>
            </div>
          </nav>
          <div className="product-title " >
          <a href>
              <img src={logoa} width="300px" height="380px" className="float-start" style={{ marginTop: '15px', border: "1px solid black" }} alt="" />
            </a>
            <div className="product-child" >
              <Carousel  cols={3} rows={3} gap={10} >             
                  {
                    resultShf.map(respSHF =>
                      <Carousel.Item >
                      <div className="details" >
                        <img src={logo} className="rounded mx-auto d-block" onClick={()=>detail(respSHF.id)} />
                        <span onClick={()=>detail(respSHF.id)}>
                          <p className="fix-line-css">{respSHF.name}</p>
                          <p>SKU: {respSHF.sku}</p>
                          <h2 className="price">{respSHF.price}</h2>
                          <a id="left">
                            <i className="fa fa-heart" style={{ color: 'red' }}> </i>
                            <p>10 Lượt thích</p>
                          </a>
                        </span>
                        <div className="when-hover">
                          <button className="btn btn-dark add-to-cart" onClick={() => addToCart(respSHF.id)}>
                            <i className="fa fa-shopping-cart" />Mua ngay
                          </button>
                          <button className="btn btn-dark add-to-cart">
                            <i className="fa fa-eye" />
                          </button>
                        </div>
                      </div>
                      </Carousel.Item>
                    )
                  }
                
              </Carousel>
            </div>

            
          </div>

        </div>
        <div className="product-name-title">
          <nav className="navbar navbar-expand-sm navbar-dark bg-light" >
            <div className="container-fluid" style={{borderBottom: "1px solid black"}} >
              <a className="brand" href>Mô hình SHF</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler">
                  <i className="fa fa-bars fa-3x" />
                </span>
              </button>
              <div className="collapse navbar-collapse" id="mynavbar">
                <div className="navbar-nav me-auto" />
              </div>
            </div>
          </nav>
          <div className="product-title ">

            <div className="product-child" >
              <Carousel  cols={3} rows={3} gap={10} >
               
                  {
                    resultShf.map(respSHF =>
                      <Carousel.Item >
                      <div className="details">
                        <img src={logo} className="rounded mx-auto d-block" />
                        <span>
                          <p className="fix-line-css">abc</p>
                          <p>SKU: JP202101</p>
                          <h2 className="price">613.000 VND</h2>
                          <a id="left">
                            <i className="fa fa-heart" style={{ color: 'red' }}> </i>
                            <p>10 Lượt thích</p>
                          </a>
                        </span>
                        <div className="when-hover">
                          <button className="btn btn-dark add-to-cart">
                            <i className="fa fa-shopping-cart" />Mua ngay
                          </button>
                          <button className="btn btn-dark add-to-cart">
                            <i className="fa fa-eye" />
                          </button>
                        </div>
                      </div>
                      </Carousel.Item>
                    )
                  }
                
              </Carousel>
            </div>

            <a href>
              <img src={logoa} width="300px" height="380px" className="float-start" style={{ marginTop: '15px', border: "1px solid black" }} alt="" />
            </a>
          </div>

        </div>
        <div className="product-name-title">
          <div className="title-pro-favorite">
            <h2>Sản phẩm yêu thích nhất</h2>
          </div>
          <div className="product-body">
            <div className="product-body-live">
              <img src="images/demo.png" className="rounded-like mx-auto d-block" />
              <span>
                <p className="fix-line-css">Bandai SD Sangoku Soketsuden</p>
                <p>SKU: JP202101</p>
                <h2 className="price">613.000 VND</h2>
                <a id="left">
                  <i className="fa fa-heart" style={{ color: 'red' }}> </i>
                  <p>10 Lượt thích</p>
                </a>
              </span>
              <div className="when-hover">
                <button className="btn btn-dark add-to-cart">
                  <i className="fa fa-shopping-cart" />Mua ngay
                </button>
                <button className="btn btn-dark add-to-cart">
                  <i className="fa fa-eye" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Home;
