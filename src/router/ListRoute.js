import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import ListCategory from "../component/Category/ListCategory";

function ListRoute(){
    return(
        <BrowserRouter>
       <Switch>
        <Route exact path="/" component={App } />
    
        <Route path="/danh-muc/:xpage?" component={ListCategory} />

        {/* <PrivateRoutes component={ListDanhmuc} authed={false} path='/admin'  /> */}
        {/* component PageNotFound phải để cuối cùng */}
        {/* <Route exact path="*" component={PageNotFound} /> */}
      </Switch>
      </BrowserRouter>
    );
}
export default ListRoute;