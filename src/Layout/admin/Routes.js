import { Box } from "@mui/system";
import React, { lazy } from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import './headadmin.css';
const ListCategory = lazy(() => import("../../component/Category/ListCategory"));
const ProductAd = lazy(() => import("../../component/ProductAdmin/ProductAd"));
const Thongkedonhang = lazy(() => import( "../../component/Thongke/Thongkedonhang"));
const Discount = lazy(() => import( "../../component/Discount/ListDiscount"));
const Giamgia = lazy(() => import( "../../component/Giamgia/Giamgia"));
const Bill = lazy(() => import( "../../component/billadmin/Bill"));
const Staff = lazy(() => import( "../../component/staff/Staff"));
const Product = lazy(() => import( "../../component/ProductAdmin/Product"));
const Khachhang = lazy(() => import( "../../component/Thongke/Khachhang"));
const PieChartComponent = lazy(() => import( "../../component/Thongke/ThongKe"));
const RePassword = lazy(() => import( "../../component/BillCustomer/RePassword"));
const SendMail = lazy(() => import( '../../component/SendMail/SendMail'));

const Routes = () => {
    return (
        <Box pt={3}>
            <Switch>
                <Route path="/admin" exact component={Thongkedonhang} />
                <Route path="/admin/bill/managerbill" component={Bill} />
                <Route path="/admin/category" component={ListCategory} />
                <Route path="/admin/product" component={ProductAd} />
                <Route path="/admin/thk" component={PieChartComponent} />
                <Route path="/admin/chart/discount" component={Discount} />
                <Route path="/admin/giam-gia" component={Giamgia} />
                <Route path="/admin/staff" component={Staff} />
                <Route path="/admin/demo" component={Product} />
                <Route path="/admin/khach-hang" component={Khachhang} />
                <Route path="/admin/ttcn" component={RePassword} />
                <Route path="/admin/sendmail" component={SendMail} />
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