import './bodyfooter.css';
function Bodyfooter(){
    return(
        <div className="body-footer-home">
            <div className="vmo-item">
                <image />
                <span>
                    <p className="vmo-p">Dịch vụ hàng đầu</p>
                    <p>Chất lượng dịch vụ được đặt lên hàng đầu</p>
                </span>
            </div>
            <div className="vmo-item">
            <image />
                <span>
                    <p className="vmo-p">Chất lượng tuyệt đối 100%</p>
                    <p>Cam kết sản phẩm chính hãng từ Bandai</p>
                </span>
            </div>
            <div className="vmo-item">
            <image />
                <span>
                    <p className="vmo-p">Thanh toán dễ dàng</p>
                    <p>Thanh toán đa dạng và cực kì tiện lợi</p>
                </span>
            </div>
        </div>
    );
}
export default Bodyfooter;