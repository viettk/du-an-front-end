import "./hd.css"
function Instruct(){
    return(
        <section>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Hướng dẫn mua hàng</li>
            </ol>
          </nav>
          <h3 style={{textAlign:"center", marginBottom:'15px'}}>
          Hướng dẫn mua hàng
          </h3>
          <span className="hd">
            <p>
                <b>Bước 1:</b> Truy cập website và lựa chọn sản phẩm cần mua để mua hàng.
            </p>
          </span>
          <span className="hd">
            <p>
                <b>Bước 2:</b> Click và sản phẩm muốn mua, màn hình hiển thị chức năng xem chi tiết sản phẩm.
            </p>
            <p>
                Sẽ chuyển bạn đến trang sản phẩm chi tiết.
            </p>
            <p>
                Nếu bạn muốn tiếp tục mua hàng: Bấm vào thêm sản phẩm vào giỏ hàng.
            </p>
            <p> Nếu bạn muốn đặt hàng và thanh toán cho sản phẩm này vui lòng bấm vào: mua ngay.</p>
          </span>
          <span className="hd">
            <p>
                <b>Bước 3:</b> Lựa chọn thông tin tài khoản thanh toán.
            </p>
            <p>Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng nhập là email và mật khẩu vào mục đã có tài khoản trên hệ thống.</p>
            <p>Nếu bạn chưa có tài khoản và muốn đăng ký tài khoản vui lòng điền các thông tin cá nhân để tiếp tục đăng ký tài khoản. Khi có tài khoản bạn sẽ dễ dàng theo dõi được đơn hàng của mình.</p>
            <p>Nếu bạn muốn mua hàng mà không cần tài khoản vui lòng nhấp chuột vào mục đặt hàng không cần tài khoản.</p>
          </span>
          <span className="hd">
            <p>
                <b>Bước 4:</b> Điền các thông tin của bạn để nhận đơn hàng, lựa chọn hình thức thanh toán và vận chuyển cho đơn hàng của mình.
            </p>
          </span>
          <span className="hd">
            <p>
                <b>Bước 5:</b> Xem lại thông tin đặt hàng, điền chú thích và gửi đơn hàng.
            </p>
          </span>
          <span className="hd">
            <p>
                <b>Bước 6:</b> Chờ admin duyệt đơn trong vời phút nhé.
            </p>
          </span>
          <span className="hd">
            <p>
                Cảm ơn quý khách đã tin dùng sản phẩm bên Bandai Store <i style={{color:'red'}} className="fa fa-heart"></i><i style={{color:'red', marginLeft:'5px'}} className="fa fa-heart"></i><i style={{color:'red' , marginLeft:'5px'}} className="fa fa-heart"></i>
</p>
          </span>
        </div>
      </section>
    );
}
export default Instruct;