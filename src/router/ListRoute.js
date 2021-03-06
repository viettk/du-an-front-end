import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import ListCategory from "../component/Category/ListCategory";
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
import Receipt from "../component/PhieuNhap/Receipt/Receipt";
import SignInSide from "../component/Login/Login";
import SignUp from "../component/Login/Register";
import  Forgot from "../component/Login/Forgot";
import ChangePassword from "../component/Login/ChangePassword";
import ListCartNone from "../component/Cart/ListCartNone";
import BillCustomer from "../component/BillCustomer/BillCustomer";
import Thongkedonhang from "../component/Thongke/Thongkedonhang";
import Chinhsachtra from "../Layout/Chinhsachtra";
import Sidebar from "../Layout/Sidebar/Sidebar";
import CustomerAd from "../component/CustomerAd/CustomerAd";
import ListDiscount from "../component/Discount/ListDiscount";
import Giamgia from "../component/Giamgia/Giamgia";
import HomeCateParentName from "../component/Home/HomeCateParentName.";
import PrivateRoute from "./PrivateRouter";
import { useState } from "react";
import Bill from "../component/billadmin/Bill";
import CookieService from '../cookie/CookieService';
import CreatePdf from '../component/CreatePdf/CreatePdf'
import AllProduct from "../component/Home/AllProduct";

function ListRoute(){
  const customerId = CookieService.getCookie('id');
    return(
        
       <Switch>
        <Route exact path={["/", "/home"]} component={Home } />

        <Route exact path="/login" component={SignInSide} />

        <Route exact path="/register" component={SignUp} />

        <Route exact path="/forgot" component={Forgot} />

        <Route path="/changepassword/:token?" component={ChangePassword} />

        <Route path= "/:sanpham/:id/page=:xpage/sort=:sort" component={HomeCate } />

        <Route path="/:sanpham/page=:xpage/sort=:sort" component={HomeCateParentName } />

        <Route path={["/all-product/query=:query/page=:xpage&sort=:sort", "/all-product"]} component={AllProduct} />

        <Route path= "/dia-chi" component={Address } />

        <Route path="/head" component={Head} />

        <Route path="/product/:id" component={ProductDetail} />
    
        <Route path="/danh-muc/:xpage?" component={ListCategory} />

        {/* <Route path="/admin/san-pham" component={ProductAd} /> */}

        <PrivateRoute  path="/api/san-pham" component={ProductAd} role='ADMIN'/>

        <Route path="/order" component={Order} />

        <Route path="/yeu-thich" component={Favorite} />

        <Route path="/api/receipt" component={Receipt} />

        <Route path="/cart" component={customerId ? ListCart : ListCartNone} />

        {/* <Route path="/cart_none" component={ListCartNone} /> */}

        <Route path="/lich-su-mua-hang" component={BillCustomer} />

        <Route path="/api/thong-ke" component={Thongkedonhang} />

        <Route path="/chinh-sach-doi-tra-hoan-tien" component={Chinhsachtra} />

        <Route path="/sidebar" component={Sidebar} />

        <Route path="/customer" component={CustomerAd} />

        <Route path="/discount" component={ListDiscount} />

        <Route path="/giam-gia" component={Giamgia} />

        <Route path="/admin/bill" component={Bill} />

        <Route path="/pdfff" component={CreatePdf} />

        {/* <PrivateRoutes component={ListDanhmuc} authed={false} path='/admin'  /> */}
        {/* component PageNotFound ph???i ????? cu???i c??ng */}
        <Route path="*" component={PageNotFound} />

        <Route path="/404" component={PageNotFound} />

        
      </Switch>
     
    );
}
export default ListRoute;