import './gt.css'
function Introduce(){
    return(
        <section>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Giới thiệu</li>
            </ol>
          </nav>
          <h3>
            Giới thiệu
          </h3>
          <h2 style={{textAlign:'center'}}><strong>Bandai - Sự lựa chọn của người sưu tầm.</strong></h2>
          <span className="gt-a">
              <p>
                  <i>Với trên 1 năm kinh doanh các mặt hàng môi hình , Bandai Store tự hào về sự đa dạng của các dòng sản phẩm tại shop, cũng như sự chuyên nghiệp trong các dịch vụ của mình.</i>
              </p>
          </span>
          <p className="gt-b">Được thành lập vào khoảng tháng 6 năm 2021, Team7forever chính thức đi vào hoạt động vào ngày 16/06/2021 với online store trên Facebook. Cùng với sự phát triển của mình, Bandai đã có thêm nhiều kênh để khách hàng tìm đến. Với mục tiêu đem đến một cho người chơi Hobby một địa điểm tin cậy để thỏa mãn thú chơi và thú sưu tầm,
          Bandai sẽ liên tục phát triển mở rộng các dòng sản phẩm, cũng như liên tục cải thiện chất lượng dịch vụ của mình.</p>
          <h2 style={{textAlign:'center'}} >
          Tại sao bạn nên chọn Bandai Store?
          </h2>
          <ol>
            <li className="gt-c">
              Chất lượng phục vụ Chuyên Nghiệp
              <ul>
                <li>
                Xử lý đơn hàng nhanh: Đơn hàng của bạn sẽ được xử lý đóng gói trong vài giờ và được chuyển phát ngay trong ngày, giúp tăng tốc độ vận chuyển đến tay khách hàng.
                </li>
                <li>Đóng gói đảm bảo: Kiện hàng được đóng gói theo quy chuẩn với 3 lớp bong bóng khi bọc sản phẩm, chèn xốp xung quanh rồi bỏ vào thùng carton cứng. Đảm bảo hàng hóa đến tay bạn an toàn, đẹp đẽ.</li>
                <li>Hỗ trợ và tư vấn nhiệt tình: Đội ngũ hỗ trợ túc trực trên các kênh chat, trả lời khách hàng nhanh nhất có thể. Tốc độ trả lời chat trung bình là dưới 20 phút. Đội ngũ hỗ trợ nhiệt tình, lễ phép, luôn giúp khách hàng tận dụng tối đa ưu đãi và khuyến mại từ Team7forever</li>
              </ul>
            </li>
            <li  className="gt-c">
              Hàng Hóa đa dạng, Nguồn hàng dồi dào
              <ul>
Hàng nhập khẩu từ Nhật Bản: Bandai Store là đối tác của Bandai Japan (BDJ). BDJ là một công ty phân phối đồ Hobby trực tuyến nổi tiếng tại Nhật. Bandai Store có nguồn hàng dồi dào từ BDJ.
              <li>
              Hàng hóa tại Bandai Store đa dạng, nhiều mẫu mã và chủng loại.
              </li>
              <li>
              Kho hàng của Bandai Store được sắp xếp chuyên nghiệp, có sức chứa lớn. Tồn kho luôn có sẵn, khách hàng không phải chờ đợi đặt hàng dài ngày.
              </li>
              </ul>
            </li>
            <li  className="gt-c">Nhiều chương trình Độc Đáo & Hấp Dẫn
                <ul>
                  <li>Giảm giá thường xuyên theo các chương trình khuyến mại trên sàn TMĐT.</li>
                  <li>Voucher giảm giá hàng tuần cho khách hàng.</li>
                  <li>Đóm xem Livestream trên Fanpage BanDaiVN vào tối thứ 7 hàng tuần nhé.</li>
                </ul>
            </li>
          </ol>
        </div>
      </section>
    );
}
export default Introduce;