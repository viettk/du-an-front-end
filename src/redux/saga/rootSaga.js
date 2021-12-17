
import { all } from 'redux-saga/effects';
import billSaga from './billSaga';
import staffSaga from './staffSaga';

export default function* rootSaga() {
    yield all([     
        staffSaga(),
        billSaga(),
    ])
}