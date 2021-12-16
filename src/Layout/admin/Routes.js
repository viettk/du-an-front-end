import { Box } from "@mui/system";
import React from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import ListCategory from "../../component/Category/ListCategory";
import ProductAd from "../../component/ProductAdmin/ProductAd";
import Thongkedonhang from "../../component/Thongke/Thongkedonhang";
import Discount from "../../component/Discount/ListDiscount";
import Giamgia from "../../component/Giamgia/Giamgia";
import Bill from "../../component/billadmin/Bill";
import Staff from "../../component/staff/Staff";
import './headadmin.css';
import Product from "../../component/ProductAdmin/Product";
import Khachhang from "../../component/Thongke/Khachhang";
import TaikhoanCaNhan from "../../component/BillCustomer/TaikhoanCaNhan"

const Routes = () => {
    return (
        <Box pt={3}>
            <Switch>
                <Route path="/admin" exact component={Thongkedonhang} />
                <Route path="/admin/bill/managerbill" component={Bill} />
                <Route path="/admin/category" component={ListCategory} />
                <Route path="/admin/product" component={ProductAd} />
                {/* <Route path="/admin/chart/all" component={Thongkedonhang} /> */}
                <Route path="/admin/chart/discount" component={Discount} />
                <Route path="/admin/giam-gia" component={Giamgia} />
                <Route path="/admin/staff" component={Staff} />
                <Route path="/admin/demo" component={Product} />
                <Route path="/admin/khach-hang" component={Khachhang} />
                <Route path="/admin/ttcn" component={TaikhoanCaNhan} />
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