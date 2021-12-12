import { billReducer } from './billReducer';
import { combineReducers } from 'redux';
import { staffReducer } from './staffReducer';
import { billReturnReducer } from './billReturnReducer';

const rootReducer = combineReducers({
    bill: billReducer,
    staff: staffReducer,
    billReturn: billReturnReducer,
});

export default rootReducer;