import axios from "axios";
import React, { useEffect, useState } from "react";
import './order.css';
import CartApi from "../../api/CartApi";
import DiscountApi from "../../api/DiscountApi";
import queryString from 'query-string';
import BillApi from "../../api/BillApi";
import { Link } from 'react-router-dom';
import CookieService from "../../cookie/CookieService";
import { Alert, Snackbar } from "@mui/material";
import AddressApi from "../../api/AddressApi";
import VnPayApi from "../../api/VnPayApi";
import { useHistory } from "react-router-dom";

function Order() {

  // khai báo-----------------------------------------------------------------------------------------------------------
  const token = CookieService.getCookie('token');

  const customerId = CookieService.getCookie('id');

  const emailc = CookieService.getCookie('email');

  const [slsp, setSlsp] = useState(0);

  const [bill, setBill] = useState({
    email: '',
    name: '',
    phone: '',
    status_pay: 0,
    address: '',
    city: '',
    district: '',
    wards: '',
    status_order: '',
    describe: '',
    thema: '',
    themb: '',
    themc: '',
    discountName: '',
    total: 0,
    type_pay: false,
  });


  const [tongtien, setTongtien] = useState(0);
  const [cart, setCart] = useState([]);
  const [tinh, setTinh] = useState([]);
  const [quan, setQuan] = useState([]);
  const [xa, setXa] = useState([]);
  const [activeIndex, setActiveIndex] = useState(false);
  const history = useHistory();
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

  const [open, setOpen] = useState(false);

  const [selectXa, setSelectXa] = useState({
    xa: '',
    code: ''
  });

  const [diachi, setDiachi] = useState([]);
  const [phiship, setPhiship] = useState(0);
  let getStorage = localStorage.getItem('cart');
  const [demo, setDemo] = useState(JSON.parse(getStorage));
  const [thanhTien, setThanhTien] = useState(0);
  const [statusadress, setStatusadress] = useState();
  const [mess, setMess] = useState({
    errorMessage: ''
  });
  const [dis, setDis] = useState(false);

  const [loi, setLoi] = useState({
    email: '',
    name: '',
    phone: '',
    status_pay: 1,
    address: '',
    city: '',
    district: '',
    wards: '',
  });

  const [loidiscount, setLoidiscount] = useState({
    loi: ''
  });
  //Kết thúc khai báo



  //Gọi hàm-------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchList = async () => {
      try {
        if (customerId) {
          const numberOfCart = await CartApi.getNumberOfCart(customerId, emailc);
          if(numberOfCart.data === 0 ){
            history.push('/cart');
          } else{
            setSlsp(numberOfCart);
          }
          const response = await CartApi.getCartDetail(customerId, emailc);
          const respo = await CartApi.getAddress(customerId, emailc);
          
          const respAdress = await CartApi.getAddressStatus(customerId, emailc);
          
          const resp = await CartApi.getCart(customerId, emailc);

          setDiachi(respo);
          setStatusadress(respAdress.id);
          
          setBill({
            ...bill,
            email: emailc,
            name: respAdress.name,
            phone: respAdress.phone,
            address: respAdress.address,
            total: (resp.total)
          });
        } else {
          let storage = localStorage.getItem('cart');
          setCart(JSON.parse(storage));
          setSlsp(demo.length);
         
          setTongtien(demo.reduce((a, v) => a = a + v.total, 0));
          setBill({
            ...bill,
            total: (demo.reduce((a, v) => a = a + v.total , 0))
          });
          setThanhTien(demo.reduce((a, v) => a = a + v.total, 0));
        }
        tt();
      } catch (error) {
        console.log(error);
      }
    }

    fetchList();
  }, [demo.reduce((a, v) => a = a + v.total + phiship, 0), customerId]);

  //lấy dữ liệu thành phố---------------------------------------------------------------------------------------------------
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

  //lấy dữ liệu tỉnh------------------------------------------------------------------------------------------------------
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

  //lấy dự liệu quận------------------------------------------------------------------------------------------------------
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


  //lấy dữ liệu xã------------------------------------------------------------------------------------------------------------
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

  //lấy dữ liệu input nhập---------------------------------------------------------------------------------------------------
  const getInputValue = (e) => {
    const { name, value } = e.target;
    setBill({
      ...bill,
      [name]: value
    });
  }

  //Đặt hàng------------------------------------------------------------------------------------------------------------------
  const datHang = () => {

    const result = {
      input: bill,
    }
    if (customerId) {
      BillApi.dathangKhachLogin(customerId, result.input).then(r => {
        localStorage.setItem('mahoadon', r.id);
        //kiểm tra kiểu thanh toán
        if (bill.type_pay) {
          VnPayApi.createUrl(r).then((url) => {
            window.location.replace(url)
          })
        } else {
          history.push('/dat-hang-thanh-cong');
        }
      }).catch((error) => {
        if (error.response) {
          setLoi(error.response.data);
          setMess(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    } else {
      const cart = [];
      BillApi.dathang(result.input).then(resp => {
        localStorage.setItem('mahoadon', resp.id);
        BillApi.datHangKhachhangkoLogin(resp.id, demo).then(r => {
          localStorage.setItem('cart', JSON.stringify(cart));
          //kiểm tra kiểu thnah toán
          if (bill.type_pay) {
            VnPayApi.createUrl(resp).then((url) => {
              window.location.replace(url)
            })
          } else {
            history.push('/dat-hang-thanh-cong');
          }
        }).catch((error) => {
          if (error.response) {
            setLoi(error.response.data);
            setMess(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
      }).catch((error) => {
        if (error.response) {
          setLoi(error.response.data);
          setMess(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    }
  }

  // Upload địa chỉ input------------------------------------------------------------------------------------------------------
  const uploadDc = (e) => {
    var index = e.target.value;
    if (e.target.value == 'other') {
      setBill({
        ...bill,
        name: '',
        phone: '',
        address: ''
      });
      setStatusadress('other')
    }
    else {
      AddressApi.getOnAddress(index, emailc).then(resp => {
        setBill({
          ...bill,
          name: resp.name,
          phone: resp.phone,
          address: resp.address
        });
      })
      setStatusadress(e.target.value)
    }
  }


  //lấy input giảm giá----------------------------------------------------------------------------------------------------------
  const getDiscount = (e) => {
    setDiscountName({
      ...discountName,
      name: e.target.value
    })

  }


  //lấy mã giảm giá-------------------------------------------------------------------------------------------------------------
  const laymagiam = () => {
    BillApi.getMAGiamGia(discountName.name).then(resp => {
      let finaltt = thanhTien - resp;
      setDis(true);
      setLoidiscount({
        ...loidiscount,
        loi:''
      })
      if (finaltt <= 0) {
        setThanhTien(0);
        setBill({
          ...bill,
          discountName: discountName.name,
          total: 0
        });
      } else {
        setThanhTien(finaltt);
        setBill({
          ...bill,
          discountName: discountName.name,
          total: finaltt
        })
      }
    }).catch((error) => {
      if (error.response) {
        setLoidiscount({
          loi: error.response.data.errorMessage
        });
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
  }


  //Lấy input loại thanh toán------------------------------------------------------------------------------------------------
  const typePay = (type) => {
    setBill({
      ...bill,
      type_pay: type
    })
    console.log(bill)
  }

  const handleClose = () => {
    setOpen(false);
  }

  console.log(dis)

  return (
    <section>
      <div className="viet-order">
        <form action>
          <div id="viet-tempalte-order">
            <div style={{ display: "grid", gridRowGap: "15px" }}>
              <h6>Thông tin nhận hàng</h6>

              {
                customerId !== '' ? (
                  <select value={statusadress} onChange={(e) => uploadDc(e)} className="form-select" aria-label="Default select example" >
                    <option value="other" >Địa chỉ khác</option>
                    {
                      diachi.map(dc =>
                        <option key={dc.id} data-id={dc.name} value={dc.id} > {dc.name}, {dc.address}</option>
                      )
                    }
                  </select>
                ) : ""
              }

              <div className="user-box">
                <input type="text" name="email" className={customerId ? "order-email" : ""} defaultValue={bill.email} required onChange={getInputValue} />
                <label>Email*</label>
                <span style={{ color: "red", fontSize: "13px" }}>{loi.email}</span>
              </div>
              <div className="user-box">
                <input type="text" name="name" defaultValue={bill.name} required onChange={getInputValue} />
                <label>Họ và tên*</label>
                <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span>
              </div>
              <div className="user-box">
                <input type="text" name="phone" defaultValue={bill.phone} required onChange={getInputValue} />
                <label>Số điện thoại*</label>
                <span style={{ color: "red", fontSize: "13px" }}>{loi.phone}</span>
              </div>
              <div className="user-box">
                <select className="form-select" aria-label="Default select example" defaultValue={selectTinh} onChange={(e) => upodateTinh(e)} style={{ padding: "5px 0 6px 5px" }}>
                  <option>Tỉnh-thành*</option>
                  {

                    tinh.map(tinh =>
                      <option key={tinh.code} data-id={tinh.name} value={tinh.code}>{tinh.name}</option>
                    )
                  }
                </select>
                <span style={{ color: "red", fontSize: "13px" }}>{loi.city}</span>
              </div>
              <div className="user-box">
                <select className="form-select" aria-label="Default select example" defaultValue={bill.district} onChange={(e) => updateQuan(e)} style={{ padding: "5px 0 6px 5px" }}>
                  <option>Quận-huyện*</option>
                  {
                    selectTinh != '' ? quan.map(quan =>
                      <option key={quan.code} data-id={quan.name} value={quan.code}>{quan.name}</option>
                    ) : <option>Mời bạn chọn Tỉnh/Thành</option>
                  }
                </select>
                <span style={{ color: "red", fontSize: "13px" }}>{loi.district}</span>
              </div>
              <div className="user-box">
                <select className="form-select" aria-label="Default select example" defaultValue={selectXa} onChange={(e) => updateXa(e)}>
                  <option>Xã-Phường*</option>
                  {
                    selectQuan != '' ? xa.map(xa =>
                      <option key={xa.code} data-id={xa.name} >{xa.name}</option>
                    ) : <option>Mời bạn chọn Quận/Huyện</option>
                  }
                </select>
                <span style={{ color: "red", fontSize: "13px" }}>{loi.wards}</span>
              </div>

              <div className="user-box">
                <input type="text" name="address" defaultValue={bill.address} required onChange={getInputValue} />
                <label>Địa chỉ*</label>
                <span style={{ color: "red", fontSize: "13px" }}>{loi.address}</span>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Ghi chú</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" name="describe" rows={3} defaultValue={""} onChange={getInputValue} />
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div>
              <h6>Phương thức thanh toán</h6>
              <div style={{ border: "1px solid #cecdcd", height: "105px", padding: " 10px 0 5px 10px", borderRadius: "5px" }}>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked onClick={() => typePay(false)} />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Thanh toán khi nhận hàng
                  </label>
                </div>
                <hr />
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => typePay(true)} />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Thanh toán VNPAY
                  </label>
                </div>
              </div>
            </div>

            {/* Giỏ hàng và thành tiền, đặt hàng */}
            <div className="viet-order-dat" style={{ backgroundColor: "#fafafa", padding: "0 10px 0 10px" }}>
              <div className="order-detail">
                <h2 style={{ fontSize: "17px" }}>Đơn hàng ({slsp} sản phẩm)</h2>
                <div className id="father">
                  <table className="table table-hover">
                    {
                      customerId ? 
                        (
                          <tbody>
                            {
                              cart.map(cart =>
                                <tr key={cart.id}>
                                  <td>
                                    <div className="img-order">
                                      <img style={{width: "120px", height:" 120px"}} src={'/images/' + cart.product.photo } className="rounded mx-auto d-block" alt="" />
                                    </div>
                                  </td>
                                  <td>
                                    <p style={{ fontSize: '16px' }}><b>Tên SP:{cart.product.name}</b></p>
                                    <p>Giá tiền: {cart.product.price} VND</p>
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
                        ) : (<tbody>
                          {
                            cart.map(cart =>
                              <tr key={cart.id}>
                                <td>
                                  <div className="img-order">
                                    <img style={{width: "120px", height:" 120px"}} src={'/images/' + cart.photo } className="rounded mx-auto d-block" alt="" />
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
                        </tbody>)
                    }
                  </table>
                </div>
              </div>
              <span className="total-amount">
                <h2>Tổng cộng :</h2>
                <p>{tongtien} VND</p>
              </span>
              <div className="discount">
                <div className="user-box">
                  <input type="text" defaultValue={discountName.name} onChange={getDiscount} required placeholder="Nhập Mã giảm giá" />
                  { dis  ? <span></span> : <button type="button" id="apdung-giamgia" onClick={laymagiam}>Áp dụng</button> }
                  <span style={{ color: "red", fontSize: "13px" }}>{loidiscount.loi}</span>
                </div>
                <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
              </div>
              <span className="total-amount">
                <h2>Tổng cộng :</h2>
                <p>{thanhTien} VND</p>
              </span>
              <span style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
                <Link to='/cart' id="viet-back-cart"><i class="fa fa-angle-left viet-order-arrow"></i>Quay lại giỏ hàng</Link>
                {
                  bill.type_pay ? <button type="button" id="btn-order" onClick={datHang} >Thanh toán</button> : <button type="button" id="btn-order" onClick={datHang} >Đặt hàng</button>
                }
              </span>
            </div>
          </div>
        </form>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Cảm ơn Bạn đã đặt hàng !
          </Alert>
        </Snackbar>
      </div>
    </section>
  );
}
export default Order;