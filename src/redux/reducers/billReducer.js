import *as type from '../const/type';

const initState = {
    data: {
        content: [],
        totalElements: 0,
    },
    detail: {},
    loading: false,
    message: '',
    reload: true,
    success: true,
}

export const billReducer = (state = initState, action) => {
    switch (action.type) {
        //fetch hoa don
        case type.FETCH_BILL_ACTION:
            return {
                ...state,
                loading: true,
                message: '',
            }
        case type.FETCH_BILL_ACTION_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                message: '',
            }
        case type.FETCH_BILL_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
            }
        // fetch hoa don chi tiet
        case type.FETCH_BILL_DETAIL_ACTION:
            return {
                ...state,
                loading: true,
                message: '',
            }
        case type.FETCH_BILL_DETAIL_ACTION_SUCCESS:
            return {
                ...state,
                detail: action.payload,
                loading: false,
                message: '',
            }
        case type.FETCH_BILL_DETAIL_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
            }
        //cap nhat trang thai hoa don
        case type.UPDATE_BILL_STATUS_ORDER_ACTION:
            return {
                ...state,
                loading: true,
                message: '',
                reload: false,
                success: false,
            }
        case type.UPDATE_BILL_STATUS_ORDER_ACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                message: '',
                reload: true,
                success: true,
            }
        case type.UPDATE_BILL_STATUS_ORDER_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
                reload: false,
                success: false,
            }
        //cap nhat trang thai thanh toán hoa don
        case type.UPDATE_BILL_STATUS_PAY_ACTION:
            return {
                ...state,
                loading: true,
                message: '',
                reload: false,
            }
        case type.UPDATE_BILL_STATUS_PAY_ACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                message: '',
                reload: true,
            }
        case type.UPDATE_BILL_STATUS_PAY_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
                reload: false,
            }
        //cap nhat hoas ddon chi tiet
        case type.UPDATE_BILL_DETAIL_ACTION:
            return {
                ...state,
                loading: true,
                message: '',
                reload: false,
                success: false,
            }
        case type.UPDATE_BILL_DETAIL_ACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                message: '',
                reload: true,
                success: true,
            }
        case type.UPDATE_BILL_DETAIL_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
                reload: false,
                success: false,
            }
        default:
            return state;
    }
};