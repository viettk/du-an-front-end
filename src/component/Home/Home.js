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
import ThongkeApi from "../../api/ThongkeApj";

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
        const top5 = await ThongkeApi.getTop5();
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
      <div className="container">
        <h2 className="title text-center">NEW ARRIVALS</h2>    
        <Carousel  cols={5} rows={2} gap={5} > 
          {
            resultnew.map(result =>
              <Carousel.Item >
                <div className="new-produtc">
              <div className="productinfo text-center" key={result.id}>
                <img src={logo} alt="" />
                <p className="fix-line-css">{result.name}</p>
                <p>SKU: {result.sku}</p>
                <span className="pro-body">
                  <h2>{result.price} VND</h2>
                </span>
              </div>
              </div>
              </Carousel.Item>
              )
          }
          </Carousel>
        
        <div className="product-name-title" id="product-first">
          <nav className="navbar navbar-expand-sm navbar-dark bg-light" style={{padding: "0", backgroundColor: "unset"}} >
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
                      <div className="details" key={respSHF.id}>
                        <img src={logo} className="rounded mx-auto d-block" onClick={()=>detail(respSHF.id)} />
                        <span onClick={()=>detail(respSHF.id)}>
                          <p className="fix-line-css">{respSHF.name}</p>
                          <p>SKU: {respSHF.sku}</p>
                          <h2 className="price">{respSHF.price}</h2>
                        </span>
                      </div>
                      </Carousel.Item>
                    )
                  }
                
              </Carousel>
            </div>        
          </div>

        </div>
        <div className="product-name-title">
          <nav className="navbar navbar-expand-sm navbar-dark bg-light" style={{padding: "0", backgroundColor: "unset"}} >
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
                      <div className="details" key={respSHF}>
                        <img src={logo} className="rounded mx-auto d-block" />
                        <span>
                          <p className="fix-line-css">abc</p>
                          <p>SKU: JP202101</p>
                          <h2 className="price">613.000 VND</h2>
                        </span>
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
            <h2>Sản phẩm bán chạy</h2>
          </div>
          <div className="product-body">
            {
              favorite.map(result =>
                <div className="product-body-live">
              <img src={logoa}  className="rounded-like mx-auto d-block" />
              <span>
                <p className="fix-line-css">{result.name}</p>
                <p>SKU: {result.sku}</p>
                <h2 className="price">Giá: {result.price}</h2>
              </span>

            </div>
                )
            }
          </div>
        </div>
      </div>
    </section>
  )
}
export default Home;
