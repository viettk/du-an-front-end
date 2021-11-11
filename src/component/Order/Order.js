import axios from "axios";
import React, { useEffect, useState } from "react";
import './order.css';
import CartApi from "../../api/CartApi";

function Order() {

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
    discountName: 'a'
  });

  const [thanhTien, SetThanhTien] = useState(0);
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

  const [selectQuan, setSelectQuan] = useState({
    quan: '',
    code: ''
  });


  const [selectXa, setSelectXa] = useState({
    xa: '',
    code: ''
  });

  const [diachi, setDiachi] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await CartApi.getCartDetail(2);
        setCart(response);
        const resp = await CartApi.getCart(1);
        SetThanhTien(resp.total);
        const respo = await CartApi.getAddress(1);
        setDiachi(respo);
        tt();
      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
  }, []);

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
    const {name, value} = e.target;
    setBill({
      ...bill,
      [name] : value
    })
  }
  const datHang =()=>{
    const result = {
      cartId: 2,
      input: bill,
      discountName: 'a'
    }
    axios({
      url: 'http://localhost:8080/order/dat/'+2,
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
  })
  }
  const uploadDc = (e)=>{
    var index = e.target.value;
    axios({
      url: 'http://localhost:8080/dia-chi/'+index,
      method: 'get',
      type: 'application/json'
    }).then(resp=>{
      setBill({
        ...bill,
        name: resp.data.name,
        phone: resp.data.phone,
        address: resp.data.address
      });
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
                                <p style={{ fontSize: '16px' }}><b>{cart.product.name}</b></p>
                                <p>{cart.product.price} VND</p>
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
                  <p>{thanhTien} VND</p>
                </span>
                <span className="fee">
                  <h2>Phí vận chuyển :</h2>
                  <p>7.500.000 VND</p>
                </span>
                <div className="discount">
                  <h2>Mã giảm giá :</h2>
                  <div className="discount-inp">
                    <div className="dis-box">
                      <input type="text" name required />
                      <label>Mã</label>
                    </div>
                  </div>
                </div>
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