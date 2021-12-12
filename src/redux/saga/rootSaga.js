import billSaga from './billSaga';
import { all } from 'redux-saga/effects';
import staffSaga from './staffSaga';
import billReturnSaga from './billReturnSaga';

export default function* rootSaga() {
    yield all([
        billSaga(),
        staffSaga(),
        billReturnSaga(),
    ])
}