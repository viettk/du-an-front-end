function Hdtt(){
    return(
        <section>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Hướng dẫn thanh toán</li>
            </ol>
          </nav>
          <h3 style={{textAlign:"center", marginBottom:'15px'}}>
          HƯỚNG DẪN THANH TOÁN
          </h3>
          <span className="hddt-a">
             <p>Hiện tại trên website của Bandai Store  chấp nhận phương thức thanh toán online và thanh toán khi nhận hàng.</p>
             <p><b className="text-hd">Hướng dẫn thanh toán online sau khi đặt hàng trên website:</b></p>
             <p>1</p>
             <img className='img-chil' src={a1} style={{width:"auto", height:"auto", margin:"auto"}}/>
             <p>2</p>
             <div className="hinh-anh">
             <img className='img-chil' src={a3} style={{width:"100%"}}/>
             <img className='img-chil' src={a4} style={{width:"100%"}}/>
             </div>
             <p><b className="text-hd">Hình ảnh hướng dẫn tại trang thanh toán của website:</b></p>
             <img className='img-chil' src={a2} style={{width:"auto", height:"auto", margin:"auto"}}/>
        </span>
        </div>
      </section>
    );
}
export default Hdtt;