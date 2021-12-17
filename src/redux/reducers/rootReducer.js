import { billReducer } from './billReducer';
import { combineReducers } from 'redux';
import { staffReducer } from './staffReducer';

const rootReducer = combineReducers({
    bill: billReducer,
    staff: staffReducer,
});

export default rootReducer;