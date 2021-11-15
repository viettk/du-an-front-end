import axios from "axios";
import React, { useEffect, useState } from "react";
import './order.css';
import CartApi from "../../api/CartApi";
import queryString from 'query-string';

function Order() {

  const [cartId, setCartId] = useState({
    cart: ''
  });
  const [bill, setBill] = useState({
    email: '',
    name: '',
    phone: '',
    status_pay: 0,
    address: '',
    city: '',
    district: '',
    wards: '',
    status_order: 0,
    describe: '',
    thema: '',
    themb: '',
    themc: '',
    discountName: ''
  });

  
  const [tongtien, setTongtien] = useState(0);
  const [cart, setCart] = useState([]);
  const [tinh, setTinh] = useState([]);
  const [quan, setQuan] = useState([]);
  const [xa, setXa] = useState([]);
  const [activeIndex, setActiveIndex] = useState(false);
  const handleOnClick = () => {
    activeIndex ? setActiveIndex(false) : setActiveIndex(true)
  };

  const [selectTinh, setSelectTinh] = useState({
    tinh: '',
    code: ''
  });

  const [discountName, setDiscountName] = useState({
    name: ''
  });

  const [selectQuan, setSelectQuan] = useState({
    quan: '',
    code: ''
  });


  const [selectXa, setSelectXa] = useState({
    xa: '',
    code: ''
  });

  const [diachi, setDiachi] = useState([]);
  const [phiship, setPhiship] = useState(0);
  let getStorage = localStorage.getItem('cart');
  const [demo, setDemo] = useState(JSON.parse(getStorage));
  const [thanhTien, setThanhTien] = useState(0);

  useEffect(() => {
    const fetchList = async () => {
      try {
        if (cartId.cart != '') {
          const response = await CartApi.getCartDetail(cartId.cart);
          setCart(response);
          const resp = await CartApi.getCart(1);
          const respo = await CartApi.getAddress(1);
          setDiachi(respo);
          const ship = await CartApi.getShip(2);
          if (ship >= 2.99) {
            setPhiship(15000);
          }
          else if (ship >= 3) {
            setPhiship(30000);
          } else if (ship >= 5.99) {
            setPhiship(90000);
          } else if (ship >= 7.99) {
            setPhiship(12000);
          } else {
            setThanhTien(-1);
          }
          setTongtien(resp.total);
          setThanhTien(resp.total + phiship)
        } else {
          let storage = localStorage.getItem('cart');
          setCart(JSON.parse(storage));            
          let ship = (demo.reduce((a,v) =>  a = a + v.weight , 0 ));
          if (ship >= 2.99) {
            setPhiship(15000);
          }
          else if (ship >= 3) {
            setPhiship(30000);
          } else if (ship >= 5.99) {
            setPhiship(90000);
          } else if (ship >= 7.99) {
            setPhiship(12000);
          } else {
            setThanhTien(-1);
          }
          setTongtien(demo.reduce((a,v) =>  a = a + v.total , 0 ));
          setThanhTien(demo.reduce((a,v) =>  a = a + v.total + phiship , 0 ));     
        }
        tt();
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchList();
  }, [demo.reduce((a,v) =>  a = a + v.total + phiship , 0 )]);
  const tt = () => {
    axios({
      url: 'https://provinces.open-api.vn/api/p?depth=2',
      method: 'get',
      type: 'application/json',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(resp => {
      setTinh(resp.data);
    })
  }
  const upodateTinh = (e) => {
    var index = e.nativeEvent.target.selectedIndex;
    setBill({
      ...bill,
      city: e.nativeEvent.target[index].text
    })
    axios({
      url: 'https://provinces.open-api.vn/api/p/' + e.target.value + '?depth=2',
      method: 'get',
      type: 'application/json'
    }).then(reps => {
      setQuan(reps.data.districts);
    })
  }
  const updateQuan = (e) => {
    var index = e.nativeEvent.target.selectedIndex;
    setBill({
      ...bill,
      district: e.nativeEvent.target[index].text
    })
    axios({
      url: 'https://provinces.open-api.vn/api/d/' + e.target.value + '?depth=2',
      method: 'get',
      type: 'application/json'
    }).then(reps => {
      setXa(reps.data.wards);
    })
  }

  const updateXa = (e) => {
    var index = e.nativeEvent.target.selectedIndex;
    setSelectXa({
      ...selectXa,
      code: e.target.value,
      xa: e.nativeEvent.target[index].text
    });
    setBill({
      ...bill,
      wards: e.nativeEvent.target[index].text
    })
  }

  const getInputValue = (e) => {
    const { name, value } = e.target;
    setBill({
      ...bill,
      [name]: value
    })
    console.log(bill)
  }
  const datHang = () => {
    const result = {
      cartId: '',
      input: bill,
      discountName: ''
    }
  if(result.cartId == ''){
    axios({
      url: 'http://localhost:8080/order/dat',
      method: 'post',
      data: result.input,
      type: 'application/json'
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }).then(resp =>{
      axios({
        url: 'http://localhost:8080/order/detail/date/' + resp.data.id ,
        method: 'post',
        data: demo,
        type: 'application/json'
      }).catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
    })
  } else {
    axios({
      url: 'http://localhost:8080/order/dat/' + 2 ,
      method: 'post',
      data: result.input,
      type: 'application/json'
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }).then(resp =>{
      // localStorage.removeItem('cart');
    })
  }
    
  }
  const uploadDc = (e) => {
    var index = e.target.value;
    axios({
      url: 'http://localhost:8080/dia-chi/' + index,
      method: 'get',
      type: 'application/json'
    }).then(resp => {
      setBill({
        ...bill,
        name: resp.data.name,
        phone: resp.data.phone,
        address: resp.data.address
      });
    })
  }
  const getDiscount = (e) => {
    setDiscountName({
      ...discountName,
      name: e.target.value
    })
  }

  const laymagiam = () => {
    axios({
      url: 'http://localhost:8080/admin/discount/apdung?discountName=' + discountName.name,
      method: 'get',
      type: 'application/json'
    }).then(resp => {
      setThanhTien(thanhTien - resp.data)
      setBill({
        ...bill,
        discountName: discountName.name
      })
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
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
        <div className="information">
          <form action>
            <div className="row">
              <div className="col-sm-3">

                <select onChange={(e) => uploadDc(e)}>
                  <option >Địa chỉ khác</option>
                  {
                    diachi.map(dc =>
                      <option key={dc.id} data-id={dc.name} value={dc.id} > {dc.name}, {dc.address}</option>
                    )
                  }
                </select>

                <div className="user-box">
                  <input type="text" name="email" defaultValue={bill.email} required onChange={getInputValue} />
                  <label>Email</label>
                </div>
                <div className="user-box">
                  <input type="text" name="name" defaultValue={bill.name} required onChange={getInputValue} />
                  <label>Họ và tên</label>
                </div>
                <div className="user-box">
                  <input type="text" name="phone" defaultValue={bill.phone} required onChange={getInputValue} />
                  <label>Số điện thoại</label>
                </div>
                <div className="user-box">
                  <input className="order-tt" type="text" name required onClick={handleOnClick} />
                  <select defaultValue={selectTinh} onChange={(e) => upodateTinh(e)}>
                    <option>Tỉnh thành</option>
                    {

                      tinh.map(tinh =>
                        <option key={tinh.code} data-id={tinh.name} value={tinh.code}>{tinh.name}</option>
                      )
                    }
                  </select>
                </div>
                <div className="user-box">
                  <input type="text" name required />
                  <select defaultValue={bill.district} onChange={(e) => updateQuan(e)}>
                    <option>Quận huyện</option>
                    {
                      selectTinh != '' ? quan.map(quan =>
                        <option key={quan.code} data-id={quan.name} value={quan.code}>{quan.name}</option>
                      ) : <option>Mời bạn chọn Tỉnh/Thành</option>
                    }
                  </select>
                </div>
                <div className="user-box">
                  <input type="text" name required />
                  <select defaultValue={selectXa} onChange={(e) => updateXa(e)}>
                    <option>Xã/Phường</option>
                    {
                      selectQuan != '' ? xa.map(xa =>
                        <option key={xa.code} data-id={xa.name} >{xa.name}</option>
                      ) : <option>Mời bạn chọn Quận/Huyện</option>
                    }
                  </select>

                </div>

                <div className="user-box">
                  <input type="text" name="phone" defaultValue={bill.address} required onChange={getInputValue} />
                  <label>Địa chỉ</label>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Ghi chú</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} onChange={getInputValue} />
                </div>
                <div className="form-check" style={{ marginTop: '20px' }}>
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Thanh toán khhi giao hàng(COD)
                  </label>
                </div>
                <div className="form-check" style={{ marginTop: '20px' }}>
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Thanh toán qua ngân hàng
                  </label>
                </div>
              </div>
              <div className="col-sm-9">
                <div className="order-detail">
                  <h2>Đơn hàng (2 sản phẩm)</h2>
                  <div className id="father">
                    <table className="table table-hover">
                      <tbody>
                        {
                          cart.map(cart =>
                            <tr key={cart.id}>
                              <td>
                                <div className="img-order">
                                  <img src="images/demo2.png" className="rounded mx-auto d-block" alt="" />
                                </div>
                              </td>
                              <td>
                                <p style={{ fontSize: '16px' }}><b>Tên SP:{cart.name}</b></p>
                                <p>Giá tiền: {cart.price} VND</p>
                                <p>Số lượng: {cart.number}</p>
                              </td>
                              <td>
                                <p style={{ fontSize: '16px' }}>
                                  <b>{cart.total}<u>đ</u></b>
                                </p>
                              </td>
                              <td />
                              <td />
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                <span className="total-amount">
                  <h2>Tồng tiền hàng :</h2>
                  <p>{tongtien} VND</p>
                </span>
                <span className="fee">
                  <h2>Phí vận chuyển :</h2>
                  <p>{phiship}</p>
                </span>
                <div className="discount">
                  <h2>Mã giảm giá :</h2>
                  <div className="discount-inp">
                    <div className="dis-box">
                      <input type="text" defaultValue={discountName.name} onChange={getDiscount} required />
                      <label>Mã</label>
                      <button onClick={laymagiam}>Áp dụng</button>
                    </div>
                  </div>
                </div>
                <span className="total-amount">
                  <h2>Thành tiền :</h2>
                  <p>{thanhTien} VND</p>
                </span>
              </div>
            </div>
            <button type="button" className="btn btn-light" id="btn-order" onClick={datHang} >
              <span />
              <span />
              <span />
              <span />
              Đặt hàng
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Order;