import { call, put, takeEvery } from "redux-saga/effects";
//import out library
import StaffApi from "../../api/StaffApi";
import * as type from "../const/type";
function* fetchStaff(action) {
    try {
        const data = yield call(StaffApi.getAll, action.payload);
        if (data) {
            yield put({ type: type.FETCH_STAFF_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.FETCH_STAFF_ACTION_FAIL, message: e.message });
    }
}
function* createStaff(action) {
    try {
        const data = yield call(StaffApi.createAccount, action.payload);
        if (data) {
            yield put({ type: type.CREATE_STAFF_ACTION_SUCCESS, payload: data });
        }
    } catch (e) {
        yield put({ type: type.CREATE_STAFF_ACTION_FAIL, message: e.message });
    }
}
function* updateStaff(action) {
    try {
        const data = yield call(StaffApi.updateAccount, action.payload);
        if (data) {
            yield put({ type: type.UPDATE_STAFF_ACTION_SUCCESS, payload: {data} });
        }
    } catch (e) {
        yield put({ type: type.UPDATE_STAFF_ACTION_FAIL, message: e.message });
    }
}
function* rePasswordStaff(action) {
    try {
        const data = yield call(StaffApi.rePassword, action.payload);
        if (data) {
            yield put({ type: type.REPASSWORD_STAFF_ACTION_SUCCESS, payload: {data} });
        }
    } catch (e) {
        yield put({ type: type.REPASSWORD_STAFF_ACTION_FAIL, message: e.message });
    }
}

function* staffSaga() {
    yield takeEvery(type.FETCH_STAFF_ACTION, fetchStaff);
    yield takeEvery(type.CREATE_STAFF_ACTION, createStaff);
    yield takeEvery(type.UPDATE_STAFF_ACTION, updateStaff);
    yield takeEvery(type.UPDATE_STAFF_ACTION, rePasswordStaff);
}
export default staffSaga;