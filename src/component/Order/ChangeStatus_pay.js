import { useEffect, useState } from "react";
import BillApi from "../../api/BillApi";
import './changestatus.css';

function ChangeStatus_pay() {

    const mahoadon = localStorage.getItem('mahoadon');
    const [bill, setBill] = useState({discount:{
        valueDiscount:''
    }});
    const [bdt, setBdt] = useState([]);
    const [phiship, setPhiship] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [statusp, setStatusp] = useState({
        status_pay: 'Thanh toán khi nhận hàng'
    })

    useEffect(() => {
        const fetchList = async () => {
            try {
                const responseBill = await BillApi.getMahoadonThanhCong(mahoadon);
                const responseBillDetail = await BillApi.getListBillDetailthanhcong(mahoadon);
                const ship = await BillApi.getTongCanNang(mahoadon);
                const totalPrice = await BillApi.getTongTotalSp(mahoadon);

                console.log(responseBill.discount)
                setTotalPrice(totalPrice);
                setBill(responseBill);
                setBdt(responseBillDetail);
                if (ship >= 2.99) {
                    setPhiship(15000);
                }
                else if (ship >= 3) {
                    setPhiship(30000);
                } else if (ship >= 5.99) {
                    setPhiship(90000);
                } else {
                    setPhiship(12000);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, []);

    const cod = () => {
        setStatusp({
          ...statusp,
          status_pay: 'Thanh toán khi nhận hàng'
        })
      }

      const momo = () => {
        setStatusp({
            ...statusp,
            status_pay: 'Thanh toán online'
          })
      }
    
    const thanhtoan = ()=>{
        BillApi.changeStatus_pay(mahoadon, statusp.status_pay);
    }

    return (
        <div className="changeStatus_pay">
            <div className="container">
                <div className="changestatuspay-body">
                    <div className="c-thongtinnhanhang">
                        <div className="c-infor">
                            <p>Thông tin nhận hàng</p>
                            <p>{bill.name}</p>
                            <p>{bill.email}</p>
                            <p>{bill.phone}</p>
                            <p>{bill.wards}, {bill.district}, {bill.city}</p>
                        </div>
                        <div className="c-select">
                            <h5>Chọn phương thức thanh toán khác</h5>
                            <div style={{ border: "1px solid #cecdcd", height: "105px", padding: " 10px 0 5px 10px", borderRadius: "5px" }}>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked onClick={cod} />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Thanh toán khi nhận hàng
                                    </label>
                                </div>
                                <hr />
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={momo} />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Thanh toán online
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='thanhcong-second'>
                            <h5>Thông tin Sản phẩm đơn hàng</h5>
                            <div className='thanhcong-detail-sp-m'>
                                {
                                    bdt.map((result, index) =>
                                        <div className='thanhcong-product' key={index}>
                                            <img className='thanhcong-product-img' src={'/images/' + result.product.photo} />
                                            <div className='thanhcong-product-infor'>
                                                <span>{result.product.name}</span>
                                                <span>{result.number}</span>
                                                <span>{String(Math.round(result.price)).replace(/(.)(?=(\d{3})+$)/g, '$1.')}</span>
                                                <span>{String(Math.round(result.total)).replace(/(.)(?=(\d{3})+$)/g, '$1.')}</span>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <p>Tổng tiền Sản phẩm: </p>
                            <p>Tạm tính: {String(Math.round(totalPrice)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} VNĐ</p>
                            <p>Phí ship: {String(Math.round(phiship)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} VNĐ</p>
                            <p>Giảm giá: {bill.discount === null ? 0 : String(Math.round(bill.discount.valueDiscount)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} VNĐ</p>
                            <p style={{fontWeight: "500"}}>Thành tiền: {String(Math.round(bill.total)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} VNĐ</p>
                            <button type="button" className="changeStatus_btn" onClick={()=>thanhtoan()}>Thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChangeStatus_pay;