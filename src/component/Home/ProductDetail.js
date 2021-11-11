
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import HomeApi from "../../api/HomeApi";
import '../../css/bootstrap.min.css'
function ProductDetail(){

  const idpage = useParams();
  const [result, setResult] = useState({});
  const [count, setCount] = useState({
    num: 1
  });
  const [mess, setMess] = useState({
    errorMessage: ''
});
const history = useHistory();

  useEffect(() => {
    const fetchList = async () =>{
      try{
        const response = await HomeApi.getDetail(idpage.id);
        setResult(response);
      }catch (error){
        console.log(error);
      }
    }
    fetchList();
  }, [idpage]);

  const upCount =()=>{
    setCount({
      ...count,
      num: count.num + 1
    })
    
  }
  const downCount =()=>{
    if(count <= 1) {
      setCount({
        ...count,
        num: 1
      })
      alert('Số lượng phải lớn hơn 1')
    }
    else{
      setCount({
        ...count,
        num: count.num - 1
      })
    }    
  }

  const updateCount = (e) =>{
    setCount({
      ...count,
      num: e.target.value
    })
  }

  const muaNgay = (idsp) =>{
    const detail ={
      cartId: 2,
      productId: idsp,
      number: count.num
    }
    axios({
      url: 'http://localhost:8080/cart-detail',
      method: 'post',
      type: 'application/json',
      data: detail,
      headers: {
          'Content-Type': 'application/json',
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
}).then(
  history.push('/cart')
)  
  }

  const [initParams, setInitParams]= useState(
    {
        cartId: '',
        productId: '',
        number: ''
    }
);

  const [local, setLocal] = useState([initParams]);
  const loadLocal =()=>{
    
  }
  const localUser = JSON.parse(localStorage.getItem('data'));
  const [userData, setUserData] = useState( localUser );
  // localStorage.removeItem('data');
  const addToCart = (idsp) =>{
    const detail ={
      cartId: 2,
      productId: idsp,
      number: count.num
    }
    
    if(detail.cartId == ''){
      if(localStorage.getItem('data') == null ){
        localStorage.setItem('data', '[]');
      }
      const data = JSON.parse(localStorage.getItem('data'));
      for(var i = 0; i< data.length ; i ++){
        if(data[i].productId == detail.productId){
          data[i].number = data[i].number + count.num;
          localStorage.setItem('data', JSON.stringify(data));
        
        }

      }
 
      // data.push(detail);  
      //     localStorage.setItem('data', JSON.stringify(data));
      // setLocal(localStorage.getItem('data', JSON.stringify(data)));
    } else{
      axios({
        url: 'http://localhost:8080/cart-detail',
        method: 'post',
        type: 'application/json',
        data: detail,
        headers: {
            'Content-Type': 'application/json',
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
    }
    
  }
  let click = true;
  const yeuThich =(idsp)=>{
    const yt = {
      productId: idsp,
      customerId: 1
    }
    
    if(click == true){
      axios({
        url: 'http://localhost:8080/yeu-thich/',
        method: 'POST',
        type: 'application/json',
        data: yt,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    click = false;
    }else {
      axios({
        url: 'http://localhost:8080/yeu-thich/',
        method: 'delete',
        type: 'application/json',
        data: yt,
        headers: {
            'Content-Type': 'application/json',
        }
    });
      click = true;
    }
  }

    return(
        <section>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Sản phẩm chi tiết</li>
            </ol>
          </nav>
          <div className="product-details">
            <div className="row left">
              <div className="col-sm-4">
                <div className="view-product">
                  <img src="images/demo2.png" alt="" />
                </div>
                <div className="img-detail">
                  <a href>
                    <img src="images/demo2.png" alt="" />
                  </a>
                  <a href>
                    <img src="images/demo3.png" alt="" />
                  </a>
                  <a href>
                    <img src="images/demo4.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="product-information">
                  {/*/product-information*/}
                  <h2 className="fix-line-css">{result.name}</h2>
                  <p>Tình trạng : {result.number > 0 ? 'Còn hàng' : 'Hết hàng'}</p>
                  <p>SKU: {result.sku}</p>
                  <img src="images/product-details/rating.png" alt="" /><br />
                  <span>
                    <span>
                      <strike> {result.price} </strike>
                      <u>đ</u>
                    </span>
                    <span style={{fontWeight: 'bold'}}>
                    {result.price}
                      <u>đ</u>
                    </span><br />
                  </span>
                  <p style={{fontSize: '14px'}}><b>Thông tin sản phẩm</b></p>
                  <div className="frames">
                    <p> <i className="fa fa-angellist " />
                      <span className="frames-text">
                        {result.describe}
                      </span>
                    </p>
                    <p> <i className="fa fa-angellist " />
                      <span className="frames-text">
                        Mô hình có độ chi tiết tốt, các khớp cử động linh hoạt.
                      </span>
                    </p>
                    <p> <i className="fa fa-angellist " />
                      <span className="frames-text">
                        Có thiết kế đẹp mắt, màu sắc tươi sáng, thích hợp để trang trí.
                      </span>
                    </p>
                    <p> <i className="fa fa-angellist " />
                      <span className="frames-text">
                        Dễ dàng để chơi, tạo dáng, phù hợp với mọi lứa tuổi.
                      </span>
                    </p>
                  </div>
                  <div className="quantity">
                    <p className="text-quantity"><b>Số lượng:</b></p>
                    <div className="input-group1">
                      <button type="button" className="btn btn-outline-primary btn-number" onClick={()=>downCount()}>
                        -
                      </button>
                      <input type="text" className="form-control input-number"  onChange={(e) => updateCount(e)}  style={{width: '50px', textAlign: 'center'}} value={count.num}  max={15} />
                      <button type="button" className="btn btn-outline-success btn-number" onClick={()=>upCount()}>
                        +
                      </button>
                    </div>
                    <button type="button" onClick={()=>yeuThich(result.id)}><i class="fa fa-heart"></i></button>
                  </div>
                  <div className="button-pro-detai">
                    <button onClick={()=>addToCart(result.id)} type="button" className="btn btn-outline-primary" style={{fontSize: '18px',width: '200px', fontWeight: '500', padding: '10px 0'}}><i className="fa fa-shopping-basket" /> Thêm vào giỏ hàng</button>
                    <button onClick={() => muaNgay(result.id)} type="button" className="btn btn-outline-danger" style={{fontSize: '18px',width: '200px', fontWeight: '500', padding: '10px 0', marginLeft: '15px'}}>Mua ngay </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="category-tab shop-details-tab">
            {/*category-tab*/}
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                <li className="active"><a href="#description" className="nav-title" data-toggle="tab">Mô tả sản phẩm</a></li>
                <li>
                  <a href="#huongdan" className="nav-title" data-toggle="tab">Hướng dẫn mua hàng</a>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade active in" id="description">
                <p>
                  *Khi nhận hàng các bạn nên kiểm tra từ bên ngoài, không bóc túi runner, nếu có vấn đề gì thì báo cho shop. Các vấn đề phát sinh sau khi đã bóc túi ra, shop sẽ không chịu trách nhiệm.*
                </p>
                <p>
                  - Tỷ lệ: 1/100
                </p>
                <p>
                  - Dòng: Master Grade (MG)
                </p>
                <p>
                  - Chiều cao sản phẩm: 16cm
                </p>
                <p>
                  - Có base đi kèm: Không
                </p>
                <p>
                  - Cement và Paint (keo và sơn): Không yêu cầu
                </p>
              </div>
              <div className="tab-pane fade" id="huongdan">
              </div>
            </div>
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
                  <a href><i className="fa fa-angle-left fa-2x" style={{marginRight: '5px'}} /></a>
                  <a href><i className="fa fa-angle-right fa-2x" /></a>
                </div>
              </div>
            </nav>
            <div className="product-title">
              <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3" style={{margin: '0px 38px 0px 38px'}}>
                <div className="col">
                  <div className="bg-light">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/demo.png" alt="" className />
                          <p className="fix-line-css">Bandai SD Sangoku Soketsuden</p>
                          <p>SKU: JP202101</p>
                          <div className="pro-body">
                            <h2>613.000 VND</h2>
                          </div>
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <a href="#" className="btn btn-default add-to-cart">
                              <i className="fa fa-shopping-cart" />Mua ngay
                            </a>
                            <a href="product-details.html" className="btn btn-default add-to-cart" style={{width: '50px', paddingLeft: '5px', marginLeft: '3px'}}>
                              <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="bg-light">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/demo.png" alt="" className />
                          <p className="fix-line-css">Bandai SD Sangoku Soketsuden</p>
                          <p>SKU: JP202101</p>
                          <div className="pro-body">
                            <h2>613.000 VND</h2>
                          </div>
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <a href="#" className="btn btn-default add-to-cart">
                              <i className="fa fa-shopping-cart" />Mua ngay
                            </a>
                            <a href="product-details.html" className="btn btn-default add-to-cart" style={{width: '50px', paddingLeft: '5px', marginLeft: '3px'}}>
                              <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="bg-light">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/demo.png" alt="" className />
                          <p className="fix-line-css">Bandai SD Sangoku Soketsuden</p>
                          <p>SKU: JP202101</p>
                          <div className="pro-body">
                            <h2>613.000 VND</h2>
                          </div>
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <a href="#" className="btn btn-default add-to-cart">
                              <i className="fa fa-shopping-cart" />Mua ngay
                            </a>
                            <a href="product-details.html" className="btn btn-default add-to-cart" style={{width: '50px', paddingLeft: '5px', marginLeft: '3px'}}>
                              <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="bg-light">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/demo.png" alt="" className />
                          <p className="fix-line-css">Bandai SD Sangoku Soketsuden</p>
                          <p>SKU: JP202101</p>
                          <div className="pro-body">
                            <h2>613.000 VND</h2>
                          </div>
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <a href="#" className="btn btn-default add-to-cart">
                              <i className="fa fa-shopping-cart" />Mua ngay
                            </a>
                            <a href="product-details.html" className="btn btn-default add-to-cart" style={{width: '50px', paddingLeft: '5px', marginLeft: '3px'}}>
                              <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="bg-light">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="images/demo.png" alt="" className />
                          <p className="fix-line-css">Bandai SD Sangoku Soketsuden</p>
                          <p>SKU: JP202101</p>
                          <div className="pro-body">
                            <h2>613.000 VND</h2>
                          </div>
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <a href="#" className="btn btn-default add-to-cart">
                              <i className="fa fa-shopping-cart" />Mua ngay
                            </a>
                            <a href="product-details.html" className="btn btn-default add-to-cart" style={{width: '50px', paddingLeft: '5px', marginLeft: '3px'}}>
                              <i className="fa fa-eye" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
export default ProductDetail;