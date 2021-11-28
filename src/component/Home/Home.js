import { useEffect, useState } from "react";
import HomeApi from "../../api/HomeApi";
import { useHistory } from "react-router-dom";
import './css/home.css';
import logoa from './b.jpg';
import { border } from "@mui/system";
import Carousel from 'react-grid-carousel'
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
  const history = useHistory();
  const [mess, setMess] = useState({
    errorMessage: ''
});

  useEffect(() => {
    const fetchList = async () => {
      try {
        const newsp = await HomeApi.getNew();
        setResultnew(newsp);
        const respSHF = await HomeApi.getShf();
        setResulshf(respSHF.content);
        const respKit = await HomeApi.getKit();
        setResultKit(respKit.content);
        const top5 = await HomeApi.getTop5();
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


  return (
    <section style={{marginTop: "30px"}}>
      <div className="body-container">
        <h4 style={{margin: "20px 0"}} className="title text-center">Hàng mới về</h4>    
        <Carousel  cols={5} rows={2} gap={50} > 
          {
            resultnew.map(result =>
              <Carousel.Item >
                  <div className="body-new-pro" key={result.id}>
                    <img className="body-new-img-pro" src={logoa} alt="" />
                    <p className="fix-line-css">{result.name}</p>
                    <p>SKU: {result.sku}</p>
                    <span className="pro-body">
                      <h6 style={{fontSize: "15px"}}>{result.price} đ</h6>
                    </span>
                  </div>
              </Carousel.Item>
              )
          }
          </Carousel>
        
        <div className="product-name-title" id="product-first">
          <nav className="body-nav-pr">
            <Link className="body-link-a"> Mô Hình SHF </Link>
          </nav>
          <div className="product-title product-first-home-body" style={{marginTop: "15px"}}>
          <img className="body-img-main" src={logoa} width="300px" height="380px" style={{ marginRight: "30px",border: "1px solid black" }} alt="" />
            <div className="product-child" >
              <Carousel  cols={4} rows={2} gap={15} >             
                  {
                    resultShf.map(respSHF =>
                      <Carousel.Item >
                        <div className="body-new-pro" key={respSHF.id}>
                          <img style={{width: "90%", height: "207px"}} className="body-new-img-pro" src={'/images/'+respSHF.photo} alt="" />
                          <p className="fix-line-css">{respSHF.name}</p>
                          <p>SKU: {respSHF.sku}</p>
                          <span className="pro-body">
                            <h6 style={{ fontSize: "15px" }}>{respSHF.price} đ</h6>
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
              <Carousel  cols={4} rows={2} gap={15} >             
                  {
                    resultShf.map(respSHF =>
                      <Carousel.Item >
                        <div className="body-new-pro" key={respSHF.id}>
                          <img style={{width: "90%", height: "207px"}} className="body-new-img-pro" src={'/images/'+respSHF.photo} alt="" />
                          <p className="fix-line-css">{respSHF.name}</p>
                          <p>SKU: {respSHF.sku}</p>
                          <span className="pro-body">
                            <h6 style={{ fontSize: "15px" }}>{respSHF.price} đ</h6>
                          </span>
                        </div>
                      </Carousel.Item>
                    )
                  }            
              </Carousel>
            </div>   
            <img className="body-img-main" src={logoa} width="300px" height="380px" style={{ marginRight: "30px",border: "1px solid black" }} alt="" />     
          </div>
        </div>

        <div className="product-name-title" style={{marginBottom: "50px"}}>
          <div className="title-pro-favorite" style={{marginBottom: "30px"}}>
            <h5>Sản phẩm bán chạy</h5>
          </div>
          <div className="product-body-favorite">
          <Carousel  cols={5} rows={1} gap={15} >
            {
              favorite.map(result =>
                <Carousel.Item >
                <div className="product-body-live">
                  <img src={'/images/' + result.photo} style={{width: "90%", height: "210px"}} className="rounded-like mx-auto d-block" />
                  <div className="body-pro-buy">
                    <p className="fix-line-css">{result.name}</p>
                    <p>SKU: {result.sku}</p>
                    <h6 className="price">{result.price}</h6>
                  </div>
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
