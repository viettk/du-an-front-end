import { Box } from "@mui/system";
import React from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import Receipt from "../../component/PhieuNhap/Receipt/Receipt";

const Routes = () => {
    return (
        <Box pt={3}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/admin/bill/managerbill" component={Receipt} />
                <Route path="/admin/bill/returnbill" component={BillReturn} />
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
const Bill = () => {
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