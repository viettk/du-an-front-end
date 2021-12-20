import { Box } from "@mui/system";
import React, { Fragment, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModelBill from "./ModelBill";
import StatusOrder from "./StatusOrder";
import * as type from '../../redux/const/type';
import { Typography } from "@mui/material";

function Bill() {
    const initParams = {
        _limit: 10,
        _page: 0,
        _field: 'create_date',
        _known: null,
    };
    const dispatch = useDispatch();
    const response = useSelector((state) => state.bill.data);
    const data = response.content;
    const reload = useSelector((state) => state.bill.reload);
    const success = useSelector((state) => state.bill.success);
    const [params, setParams] = useState(initParams);
    useEffect(() => {
        const param = {
            ...params,
        }
        dispatch({ type: type.FETCH_BILL_ACTION, payload: param });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, , reload, success]);
    return (
        <Fragment>
            <Box>
                <Typography variant="h4" sx={{marginBottom: 3}}>Quản lý hóa đơn</Typography>
                <StatusOrder
                    params={params}
                    setParams={setParams}
                />
                <ModelBill
                    bill={data}
                    params={params}
                    setParams={setParams}
                    count={response.totalElements}
                />
            </Box>
        </Fragment>
    );
}
export default memo(Bill);