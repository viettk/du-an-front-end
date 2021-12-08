import React, { Fragment, memo, useEffect } from "react";
import BillAdminApi from "../../api/BillAdminApi";
import ModelBill from "./ModelBill";
import StatusOrder from "./StatusOrder";

function Bill() {
    const initBill = {
        id: null,
        email: '',
        create_date: '',
        update_date: '',
        name: '',
        phone: '',
        total: '',
        status_pay: '',
        address: '',
        city: '',
        district: '',
        status_order: '',
        describe: '',
        wards: '',
        thema: '',
        themb: '',
        themc: '',
        staff_id: '',
        discount_id: '',
        id_code: '',
    }
    const initParams = {
        pay: true,
        order: null,
        _limit: 10,
        _page: 0,
        _field: 'id',
        _known: 'up',
    };
    const [bill, setBill] = React.useState([]);
    const [formDataBill, setFormDataBill] = React.useState(initBill)
    const [params, setParams] = React.useState(initParams);
    const [clicked, setClicked] = React.useState(-1);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [reload, setReload] = React.useState(true);
    const [filter, setFilter] = React.useState([]);
    useEffect(() => {
        const fetchListBill = async () => {
            const param = {
                ...params,
                ...filter,
            }
            try {


                const response = await BillAdminApi.getAll(param);
                setBill(response.content);
                setCount(response.totalElements);
            } catch (error) {
                console.error(error);
            }
        }
        fetchListBill();
    }, [params, reload]);
    return (
        <Fragment>

            <StatusOrder
                params={params}
                setParams={setParams}
            />
            <ModelBill
                bill={bill}
                setBill={setBill}
                formDataBill={formDataBill}
                setFormDataBill={setFormDataBill}
                params={params}
                setParams={setParams}
                clicked={clicked}
                setClicked={setClicked}
                count={count}
                setCount={setCount}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                reload={reload}
                setReload={setReload}
            />
        </Fragment>
    );
}
export default memo(Bill);