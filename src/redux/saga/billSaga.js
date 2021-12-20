import { call, put, takeEvery } from "redux-saga/effects";
//import out library
import BillAdminApi from "../../api/BillAdminApi";
import * as type from "../const/type";

function* fetchBill(action) {
    try {
        const data = yield call(BillAdminApi.getAll, action.payload);
        if (data) {
            yield put({ type: type.FETCH_BILL_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.FETCH_BILL_ACTION_FAIL, message: e.message });
    }
}
function* fetchFormBill(action) {
    try {
        const data = yield call(BillAdminApi.getById, action.payload);
        if (data) {
            yield put({ type: type.FETCH_FORM_BILL_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.FETCH_FORM_BILL_ACTION_FAIL, message: e.message });
    }
}
//fetch hoa don chi tiet
function* fetchBillDetail(action) {
    try {
        const data = yield call(BillAdminApi.getBillDetailByBill, action.payload);
        if (data) {
            yield put({ type: type.FETCH_BILL_DETAIL_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.FETCH_BILL_DETAIL_ACTION_FAIL, message: e.message });
    }
}
// cap nhat trang thai
function* updateBillOrder(action) {
    try {
        const data = yield call(BillAdminApi.updateStatusOrder, action.payload);
        if (data) {
            yield put({ type: type.UPDATE_BILL_STATUS_ORDER_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.UPDATE_BILL_STATUS_ORDER_ACTION_FAIL, message: e.message });
    }
}

function* updateBillPay(action) {
    try {
        const data = yield call(BillAdminApi.updateStatusPay, action.payload);
        if (data) {
            yield put({ type: type.UPDATE_BILL_STATUS_ORDER_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.UPDATE_BILL_STATUS_ORDER_ACTION_FAIL, message: e.response });
    }
}

function* updateBillDetail(action) {
    try {
        const data = yield call(BillAdminApi.updateBillDetail, action.payload);
        if (data) {
            yield put({ type: type.UPDATE_BILL_DETAIL_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.UPDATE_BILL_DETAIL_ACTION_FAIL, message: e.errorMessage });
    }
}

function* billSaga() {
    yield takeEvery(type.FETCH_BILL_ACTION, fetchBill);
    yield takeEvery(type.FETCH_BILL_DETAIL_ACTION, fetchBillDetail);
    yield takeEvery(type.UPDATE_BILL_STATUS_ORDER_ACTION, updateBillOrder);
    yield takeEvery(type.UPDATE_BILL_STATUS_PAY_ACTION, updateBillPay);
    yield takeEvery(type.UPDATE_BILL_DETAIL_ACTION, updateBillDetail);
    yield takeEvery(type.FETCH_FORM_BILL_ACTION, fetchFormBill);
}
export default billSaga;