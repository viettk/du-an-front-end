import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import ListCategory from "../component/Category/ListCategory";
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNotFound from "../component/PageError/PageNotFound";
import ProductAd from "../component/ProductAdmin/ProductAd";
import ListCart from "../component/Cart/ListCart";

function ListRoute(){
    return(
        <BrowserRouter>
       <Switch>
        <Route exact path="/" component={App } />

        <Route path="/cart" component={ListCart} />
    
        <Route path="/danh-muc/:xpage?" component={ListCategory} />

        <Route path="/admin/san-pham/:xpage?" component={ProductAd} />

        {/* <PrivateRoutes component={ListDanhmuc} authed={false} path='/admin'  /> */}
        {/* component PageNotFound phải để cuối cùng */}
        <Route path="*" component={PageNotFound} />
      </Switch>
      </BrowserRouter>
    );
}
export default ListRoute;