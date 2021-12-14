import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNotFound from "../component/PageError/PageNotFound";
import ProductAd from "../component/ProductAdmin/ProductAd";
import ListCart from "../component/Cart/ListCart";
import Home from "../component/Home/Home";
import ProductDetail from "../component/Home/ProductDetail";
import HomeCate from "../component/Home/HomeCate";
import Head from "../Layout/Head";
import Order from "../component/Order/Order";
import Address from "../component/Adress/Adress";
import Favorite from "../component/Favorite/Favorite";
import FavoriteNotLogin from "../component/Favorite/FavoriteNotLogin";
import SignInSide from "../component/Login/Login";
import SignUp from "../component/Login/Register";
import  Forgot from "../component/Login/Forgot";
import ResetPassword from "../component/Login/ResetPassword";
import ChangePassword from "../component/Login/ChangePassword";
import ListCartNone from "../component/Cart/ListCartNone";
import BillCustomer from "../component/BillCustomer/BillCustomer";
import Chinhsachtra from "../Layout/Chinhsachtra";
import Sidebar from "../Layout/Sidebar/Sidebar";
import HomeCateParentName from "../component/Home/HomeCateParentName.";
import PrivateRoute from "./PrivateRouter";
import CookieService from '../cookie/CookieService';
import CreatePdf from '../component/CreatePdf/CreatePdf'
import AllProduct from "../component/Home/AllProduct";
import Thanhcong from "../component/Order/Thanhcong";
import ChangeStatus_pay from "../component/Order/ChangeStatus_pay";
import Introduce from "../Layout/headchild/Introduce";
import Instruct from "../Layout/headchild/Hdmua";
import Hddt from "../Layout/headchild/Hddt";
import Hdtt from "../Layout/headchild/Hdtt";

function ListRoute({reload, setReload}){
  const customerId = CookieService.getCookie('id');
    return(
        
       <Switch>
        <Route exact path={["/", "/home"]} component={Home } />

        <Route exact path="/login" component={SignInSide} />

        <Route exact path="/register" component={SignUp} />

        <Route exact path="/forgot" component={Forgot} />

        <Route path="/resetpassword/:token?" component={ResetPassword} />

        <Route path="/changepassword" component={ChangePassword} />

        <Route path= "/:sanpham/:id/page=:xpage/sort=:sort" component={HomeCate } />

        <Route path="/:sanpham/page=:xpage/sort=:sort" component={HomeCateParentName } />

        <Route path={["/all-product/query=:query/page=:xpage&sort=:sort", "/all-product"]} component={AllProduct} />

        <Route path= "/dia-chi" component={ customerId ? Address : PageNotFound } />

        <Route path="/head" component={Head} />

        <Route path="/product/:id" >
          <ProductDetail reload={reload} setReload={setReload} />
        </Route>

        {/* <Route path="/admin/san-pham" component={ProductAd} /> */}

        <PrivateRoute  path="/api/san-pham" component={ProductAd} role='ADMIN'/>

        <Route path="/order" component={Order} />

        <Route path="/yeu-thich" >
          <FavoriteNotLogin reload={reload} setReload={setReload} />
        </Route>

        <Route path="/cart">
            {customerId ? <ListCart reload={reload} setReload={setReload} /> : <ListCartNone /> }
        </Route>

        <Route path="/dia-chi" component={Address} />

        {/* <Route path="/cart_none" component={ListCartNone} /> */}

        <Route path="/lich-su-mua-hang" component={BillCustomer} />

        <Route path="/chinh-sach-doi-tra-hoan-tien" component={Chinhsachtra} />

        <Route path="/sidebar" component={Sidebar} />

        <Route path="/pdfff" component={CreatePdf} />

        <Route path="/dat-hang-thanh-cong" component={Thanhcong} />

        <Route path="/checkout" component={ChangeStatus_pay} />

        <Route path="/gioi-thieu" component={Introduce} />

        <Route path="/huong-dan-doi-tra" component={Hddt} />

        <Route path="/huong-dan-mua-hang" component={Instruct} />

        <Route path="/huong-dan-thanh-toan" component={Hdtt} />

        {/* <PrivateRoutes component={ListDanhmuc} authed={false} path='/admin'  /> */}
        {/* component PageNotFound phải để cuối cùng */}
        <Route path="*" component={PageNotFound} />

        <Route path="/404" component={PageNotFound} />

        
      </Switch>
     
    );
}
export default ListRoute;