import { useEffect, useState } from 'react';
import BillApi from '../../api/BillApi';
import VnPayApi from '../../api/VnPayApi';
import './thanhcong.css';
import {
    Link
  } from "react-router-dom";

function Thanhcong() {

    const mahoadon = localStorage.getItem('mahoadon');
    const [bill, setBill] = useState({});
    const [bdt, setBdt] = useState([]);
    const [statusOrder,setStatsusOrder] = useState(true); 

    useEffect(() => {
        const fetchList = async () => {
          try {
            //check và cập nhật hóa đơn
            let url = window.location.href;
            const urlParam = new URLSearchParams(window.location.search);
            if(urlParam.get('vnp_ResponseCode')){
            let data =url.slice(url.indexOf('?'));
             VnPayApi.checkSum(data).then(s =>{
                 if(s.data==false){
                    setStatsusOrder(s.data)
                 }else{
                    setStatsusOrder(s)
                 }
             });}
            
            const responseBill = await BillApi.getMahoadonThanhCong(mahoadon);
            const responseBillDetail = await BillApi.getListBillDetailthanhcong(mahoadon);
            setBill(responseBill);
            setBdt(responseBillDetail);
          } catch (error) {
            console.log(error);
          }
        }
        fetchList();
      }, []);

      const onSwithStatusOrder=((value)=>{
        switch (value) {
            case 0:
                return 'Thanh toán khi nhận hàng';
            case 1:
                return 'Thanh toán VNPAY';
            default:
                return (<p>Lỗi hiện thị</p>);
        }
    });

    return (
        <div className="dat-hang-thanh-cong">
            <div className="container">
                <div className='dat-hang-container'> 
                    <div className='thanh-cong-first'>
                        <img />
                        <div class="thanhcong-body">
                            {statusOrder===true ? (<div class="cam-on-da-dat">
                                <i class="fa fa-check-circle thanhcong-icon"></i>
                                <div class="thanh-cong-email">
                                    <p>Cảm ơn bạn đã đặt hàng</p>
                                    <p>Một email xác nhận đã được gửi tới <span style={{fontWeight: "500"}}>{bill.email}</span></p>
                                    <p>Xin vui lòng kiểm tra email của bạn</p>
                                </div>
                            </div>) : (<div class="cam-on-da-dat">
                                <i class="fa fa-info-circle thatbai-icon" ></i>
                                <div class="thanh-cong-email">
                                    <p>THANH TOÁN THẤT BẠI</p>
                                    <p>Giao dịch không thành công, xin vui lòng thử lại.</p>
                                    <p>Lỗi thanh toán bên VNPAY: Giao dịch thất bại. unexpect error status</p>
                                </div>
                            </div>) }
                            

                            <div className="dat-thang-infor">
                                <div className="dat-hang-infor-cus">
                                    <p style={{fontWeight: "500"}}>Thông tin mua hàng</p>
                                    <p>{bill.name}</p>
                                    <p>{bill.email}</p>
                                    <p>{bill.phone}</p>
                                </div>
                                <div className='thanhcong-adress'>
                                    <p style={{fontWeight: "500"}}>Địa chỉ nhận hàng</p>
                                    <p>{bill.name}</p>
                                    <p>{bill.adress}</p>
                                    <p>{bill.wards}, {bill.district}, {bill.city}</p>
                                    <p>{bill.phone}</p>
                                </div>
                                <span style={{fontWeight: "500"}}>Phương thức thanh toán:</span>
                                <span>{onSwithStatusOrder(bill.status_pay)}</span>
                            </div>
                            {statusOrder===true ? <button className='thanhcong-btn first-btn-tc'><Link to="/home" className='thanhcong-ttmh'>Tiếp tục mua hàng</Link></button>:
                                <button className='thanhcong-btn first-btn-tc'>Thanh toán lại</button>}
                        </div>
                    </div>
                    <div className='thanhcong-second'>
                        <h5>Thông tin Sản phẩm đơn hàng</h5>
                        <div className='thanhcong-detail-sp'>
                            {
                                bdt.map(result =>
                                    <div className='thanhcong-product'>
                                        <img className='thanhcong-product-img' src={'/images/' + result.product.photo} />
                                        <div className='thanhcong-product-infor'>
                                            <span>{result.product.name}</span>
                                            <span>{result.number}</span>
                                            <span>{String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.') }</span>
                                            <span>{String(Math.round(result.total)).replace(/(.)(?=(\d{3})+$)/g, '$1.') }</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <hr></hr>
                        <p style={{fontWeight: "500"}}>Thành tiền: {String(Math.round(bill.total)).replace(/(.)(?=(\d{3})+$)/g, '$1.') } VNĐ</p>
                    </div>
                    {/* <button className='thanhcong-btn second-btn-tc'>Tiếp tục mua hàng</button> */}
                </div>
            </div>
        </div>
    );
}
export default Thanhcong;