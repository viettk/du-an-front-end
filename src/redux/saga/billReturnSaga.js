import { call, put, takeEvery } from "redux-saga/effects";
//import out library
import BillReturn from "../../api/BillReturn";
import * as type from "../const/type";
function* fetchBillReturn(action) {
    try {
        const data = yield call(BillReturn.getStatus, action.payload);
        if (data) {
            yield put({ type: type.FETCH_BILL_RETURN_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.FETCH_BILL_RETURN_ACTION_FAIL, message: e.message });
    }
}
function* createBillReturn(action) {
    try {
        const data = yield call(BillReturn.createNew, action.payload);
        if (data) {
            yield put({ type: type.CREATE_BILL_RETURN_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.CREATE_BILL_RETURN_ACTION_FAIL, message: e.message });
    }
}
function* updateBillReturn(action) {
    try {
        const data = yield call(BillReturn.update, action.payload);
        if (data) {
            yield put({ type: type.UPDATE_BILL_RETURN_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.UPDATE_BILL_RETURN_ACTION_FAIL, message: e.message });
    }
}
function* fetchBillReturnDt(action) {
    try {
        const data = yield call(BillReturn.getDetail, action.payload);
        if (data) {
            yield put({ type: type.FETCH_BILL_RETURN_DETAIL_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.FETCH_BILL_RETURN_DETAIL_ACTION_FAIL, message: e.message });
    }
}
function* createBillReturnDt(action) {
    try {
        const data = yield call(BillReturn.createDetail, action.payload);
        if (data) {
            yield put({ type: type.CREATE_BILL_RETURN_DETAIL_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.CREATE_BILL_RETURN_DETAIL_ACTION_FAIL, message: e.message });
    }
}
function* updateBillReturnDt(action) {
    try {
        const data = yield call(BillReturn.confirmDetail, action.payload);
        if (data) {
            yield put({ type: type.UPDATE_BILL_RETURN_DETAIL_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.UPDATE_BILL_RETURN_DETAIL_ACTION_FAIL, message: e.message });
    }
}

function* billReturnSaga() {
    yield takeEvery(type.FETCH_BILL_RETURN_ACTION, fetchBillReturn);
    yield takeEvery(type.CREATE_BILL_RETURN_ACTION, createBillReturn);
    yield takeEvery(type.UPDATE_BILL_RETURN_ACTION, updateBillReturn);
    yield takeEvery(type.FETCH_BILL_RETURN_DETAIL_ACTION, fetchBillReturnDt);
    yield takeEvery(type.CREATE_BILL_RETURN_DETAIL_ACTION, createBillReturnDt);
    yield takeEvery(type.UPDATE_BILL_RETURN_DETAIL_ACTION, updateBillReturnDt);
}
export default billReturnSaga;