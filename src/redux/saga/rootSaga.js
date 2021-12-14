
import { all } from 'redux-saga/effects';
import staffSaga from './staffSaga';

export default function* rootSaga() {
    yield all([     
        staffSaga(),
    ])
}