import { Box } from "@mui/system";
import React from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import Receipt from "../../component/PhieuNhap/Receipt/Receipt";
import ListCategory from "../../component/Category/ListCategory";
import ProductAd from "../../component/ProductAdmin/ProductAd";
import Thongkedonhang from "../../component/Thongke/Thongkedonhang";
import Discount from "../../component/Discount/ListDiscount";
import Giamgia from "../../component/Giamgia/Giamgia";
import Bill from "../../component/billadmin/Bill";
import Staff from "../../component/staff/Staff";

const Routes = () => {
    return (
        <Box pt={3}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/admin/bill/managerbill" component={Bill} />
                <Route path="/admin/bill/returnbill" component={BillReturn} />
                <Route path="/admin/receipt" component={Receipt} />
                <Route path="/admin/category" component={ListCategory} />
                <Route path="/admin/product" component={ProductAd} />
                <Route path="/admin/chart/all" component={Thongkedonhang} />
                <Route path="/admin/chart/discount" component={Discount} />
                <Route path="/admin/giam-gia" component={Giamgia} />
                <Route path="/admin/staff" component={Staff} />
            </Switch>
        </Box>
    );
}
const Home = () => {
    return (
        <React.Fragment>
            home
        </React.Fragment>
    );
}
const BillReturn = () => {
    return (
        <React.Fragment>
            home
        </React.Fragment>
    );
}
export default Routes;