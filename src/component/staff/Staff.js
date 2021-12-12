import React, { memo, useEffect, useState } from "react";
import ModelStaff from "./ModelStaff";
import * as type from '../../redux/const/type';
import CreateStaff from "./CreateStaff";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@mui/icons-material";

function Staff() {
    const initParams = {
        _limit: 10,
        _page: 0,
        _field: 'id',
        _known: 'up',
    };
    const dispatch = useDispatch();
    const response = useSelector((state) => state.staff.data);
    const data = response.content;
    const create = useSelector((state) => state.staff.create);
    const [params, setParams] = useState(initParams);
    useEffect(() => {
        const param = {
            ...params,
        }
        dispatch({ type: type.FETCH_STAFF_ACTION, payload: param });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, create]);
    return (
        <React.Fragment>
            <Filter params={params} setParams={setParams} />
            <CreateStaff
                staff={data}
                icon={(<Add />)}
            />

            <ModelStaff
                params={params}
                setParams={setParams}
                count={response.totalElements}
                staff={data}
            />
        </React.Fragment>
    )
}
export default memo(Staff);