import './css/footer.css'

function Footer(){
    return(
        <footer>
        <div className="footer-center">
          <div className="container pt-5 pb-5">
            <div className="row">
              <div className="col">
                <div className="box-footer">
                  <a href="#"><img className="img-thumbnail" src="https://vannghebinhphuoc.org.vn/uploads/news/2017_12/logo.png" alt="logo" width="150px" /></a>
                </div>
                <div className="box-footer">
                  <h5 className="text-uppercase">WEBSITE THUỘC QUYỀN SỞ HỮU</h5>
                  <hr />
                  <ul className="list-unstyled">
                    <li>Mô hình Nhật Bản - Warriors IT</li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="box-footer">
                  <h5 className="text-uppercase text-white">Liên Hệ</h5>
                  <hr />
                  <ul className="footer-list-menu list-unstyled">
                    <li>
                      <i className="bi bi-geo-alt" aria-hidden="true" />
                      <span>Địa Chỉ: Tây Thiên <br /> Vui lòng hẹn trước khi đến</span>
                    </li>
                    <li>
                      <i className="bi bi-telephone-forward" /> <span>01234566789</span>
                    </li>
                    <li>
                      <i className="bi bi-envelope" />
                      <span />support@warriorsit.vn
                    </li>
                  </ul>
                </div>
                <div className="box-footer">
                  <h5 className="text-uppercase text-white">Đăng kí nhận tin</h5>
                  <hr />
                  <form action method="post">
                    <div className="input-group mb-3">
                      <input required type="email" id="contact_email" name="contact[email]" autoComplete="off" className="form-control" placeholder="Vui lòng nhập địa chỉ email" />
                      <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="fa fa-search" /></button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col">
                <h5 className="text-uppercase">Thông Tin Hỗ Trợ</h5>
                <hr />
                <ul className="footer-list-menu list-unstyled">
                  <li>
                    <a className="text-white text-decoration-none" href="#" title="Tìm kiếm"><i className="bi bi-search" /> Tìm kiếm</a>
                  </li>
                  <li>
                    <a className=" text-white text-decoration-none" href="#" title="Giới thiệu"><i className="bi bi-info-circle" /> Giới thiệu</a>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h5 className="text-uppercase">liên hệ với Worriors IT</h5>
                <hr />
                <div className="social">
                  {/* Facebook */}
                  <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#3b5998'}} href="#!" role="button"><i className="fa fa-facebook-f" /></a>
                  {/* Twitter */}
                  <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#55acee'}} href="#!" role="button"><i className="fa fa-twitter" /></a>
                  {/* Google */}
                  <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#dd4b39'}} href="#!" role="button"><i className="fa fa-google" /></a>
                  {/* Instagram */}
                  <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#ac2bac'}} href="#!" role="button"><i className="fa fa-instagram" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="text-center">
              <p style={{textAlign: "center", paddingTop: "20px"}}>Copyright © 2021 Designed by <a className="text-dark text-decoration-none" href="#">Worriors IT</a> | <a className="text-dark text-decoration-none" href="#">Powered by Worriors IT</a>	</p>
            </div>
          </div>
        </div>
      </footer>
    );
}
export default Footer;