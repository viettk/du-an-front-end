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
import FormRegister from "../component/Login/FormRegister";
import FormLogin from "../component/Login/FormLogin";

function ListRoute(){
    return(
        <BrowserRouter>
       <Switch>
        <Route exact path={["/", "/home"]} component={App } />

        <Route exact path="/login" component={FormLogin} />

        <Route exact path="/register" component={FormRegister} />

        <Route path= "/:sanpham/:id/:xpage" component={HomeCate } />

        <Route path= "/dia-chi" component={Address } />

        <Route path="/cart" component={ListCart} />

        <Route path="/head" component={Head} />

        <Route path="/product/:id" component={ProductDetail} />
    
        <Route path="/danh-muc/:xpage?" component={ListCategory} />

        <Route path="/admin/san-pham/:xpage?" component={ProductAd} />

        <Route path="/order" component={Order} />

        <Route path="/yeu-thich" component={Favorite} />

        <Route path="/api/receipt" component={Receipt} />

        {/* <PrivateRoutes component={ListDanhmuc} authed={false} path='/admin'  /> */}
        {/* component PageNotFound phải để cuối cùng */}
        <Route path="*" component={PageNotFound} />
      </Switch>
      </BrowserRouter>
    );
}
export default ListRoute;