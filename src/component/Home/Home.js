import { useEffect, useState } from "react";
import HomeApi from "../../api/HomeApi";
import { useHistory } from "react-router-dom";
import './css/home.css';
import logoa from './b.jpg';
import logob from './a.jpeg';
import { border } from "@mui/system";
import Carousel from 'react-grid-carousel';
import axios from "axios";
import Head from "../../Layout/Head";
import ThongkeApi from "../../api/ThongkeApj";
import {Link} from 'react-router-dom';

function Home() {

  const [resultnew, setResultnew] = useState([]);
  const [resultKit, setResultKit] = useState([]);
  const [resultShf, setResulshf] = useState([]);
  const [resultd, setResultd] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const [gundam, setGundam] = useState([]);
  const history = useHistory();
  const [mess, setMess] = useState({
    errorMessage: ''
});

  useEffect(() => {
    const fetchList = async () => {
      try {
        const newsp = await HomeApi.getNew();  
        const respSHF = await HomeApi.getShf();
        const respKit = await HomeApi.getKit();
        const gundam =await HomeApi.getStatic();
        const top5 = await HomeApi.getTop5();

        setGundam(gundam.content);
        setResulshf(respSHF.content);
        setResultKit(respKit);
        setResultnew(newsp);
        setFavorite(top5);
      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
  }, []);

  const detail = (id) => {
    history.push('/product/' + id);
  }

  const chuyentrang = (id) =>{
    history.push('/product/' + id );
  }

  const src_img = process.env.REACT_APP_URL_IMAGE;

  return (
    <section style={{marginTop: "30px"}}>
      <div className="body-container">
        <h4 style={{margin: "20px 0"}} className="title text-center">Hàng mới về</h4>    
        <Carousel  cols={5} rows={2} gap={50} > 
          {
            resultnew.map(result =>
              <Carousel.Item >
                <div className="body-new-pro" key={result.id} onClick={() => chuyentrang(result.id)}>
                  <img className="body-new-img-pro" src={src_img + result.photo} alt="" />
                  <p className="fix-line-css">{result.name}</p>
                  <p>Mã SP: {result.sku}</p>
                  <span className="pro-body">
                  <span style={result.price != result.price_extra ? { fontSize: "15px", marginRight: "15px" ,color: "red", fontWeight: "500"} :{ fontSize: "15px", marginRight: "15px", fontWeight: "500" } }>
                    {String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' VNĐ'}
                    </span>
                    <span style={result.price != result.price_extra ? { display: "inline-block" } : { display: "none" }}>
                      <strike> {String(Math.round(result.price_extra)).replace(/(.)(?=(\d{3})+$)/g, '$1.') + ' VNĐ'} </strike>
                    </span>
                  </span>
                </div>
              </Carousel.Item>
              )
          }
          </Carousel>
        
        <div className="product-name-title" id="product-first">
          <nav className="body-nav-pr">
            <Link to={'/GUNDAM/page=1/sort=0'} className="body-link-a"> Mô Hình GUNDAM </Link>
          </nav>
          <div className="product-title product-first-home-body" style={{marginTop: "15px"}}>
          <img className="body-img-main" src={logoa} width="300px" height="380px" style={{ marginRight: "30px",border: "1px solid black" }} alt="" />
            <div className="product-child" >
            <Carousel  cols={5} rows={2} gap={50} > 
          {
            gundam.map(result =>
              <Carousel.Item >
                <div className="body-new-pro" key={result.id} onClick={() => chuyentrang(result.id)}>
                  <img className="body-new-img-pro" src={src_img + result.photo} alt="" />
                  <p className="fix-line-css">{result.name}</p>
                  <p>Mã SP: {result.sku}</p>
                  <span className="pro-body">
                    <h6 style={{ fontSize: "15px" }}>{result.price} đ</h6>
                  </span>
                </div>
              </Carousel.Item>
              )
          }
          </Carousel>
            </div>        
          </div>
        </div>
        <div className="product-name-title" id="product-first">
          <nav className="body-nav-pr">
            <Link className="body-link-a"> Mô Hình SHF </Link>
          </nav>
          <div className="product-title body-second-pro">
            <div className="product-child" >
            <Carousel  cols={5} rows={2} gap={50} > 
          {
            resultShf.map(result =>
              <Carousel.Item >
                <div className="body-new-pro" key={result.id} onClick={() => chuyentrang(result.id)}>
                  <img className="body-new-img-pro" src={src_img + result.photo} alt="" />
                  <p className="fix-line-css">{result.name}</p>
                  <p>Mã SP: {result.sku}</p>
                  <span className="pro-body">
                    <h6 style={{ fontSize: "15px" }}>{result.price} đ</h6>
                  </span>
                </div>
              </Carousel.Item>
              )
          }
          </Carousel>
            </div>   
            <img className="body-img-main" src={logob} width="300px" height="380px" style={{ marginRight: "30px",border: "1px solid black" }} alt="" />     
          </div>
        </div>

        <div className="product-name-title" style={{marginBottom: "50px"}}>
          <div className="title-pro-favorite" style={{marginBottom: "30px"}}>
            <h5>Top Sản phẩm bán chạy</h5>
          </div>
          <div className="product-body-favorite-m">
          <Carousel  cols={5} rows={1} gap={50} > 
          {
            favorite.map(result =>
              <Carousel.Item >
                <div className="body-new-pro" key={result.id} onClick={() => chuyentrang(result.id)}>
                  <img className="body-new-img-pro" src={src_img + result.photo} alt="" />
                  <p className="fix-line-css">{result.name}</p>
                  <p>Mã SP: {result.sku}</p>
                  <span className="pro-body">
                    <h6 style={{ fontSize: "15px" }}>{result.price} đ</h6>
                  </span>
                </div>
              </Carousel.Item>
              )
          }
          </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Home;
