import *as type from '../const/type';

const initState = {
    data: {
        content: [],
        totalElements: 0,
    },
    form: {},
    detail: {},
    loading: false,
    message: '',
    re_render: false,
}

export const billReturnReducer = (state = initState, action) => {
    switch (action.type) {
        //fetch hoa don hoan tra
        case type.FETCH_BILL_RETURN_ACTION:
            return {
                ...state,
                params: action.payload,
                form: {},
                loading: true,
                message: '',
            }
        case type.FETCH_BILL_RETURN_ACTION_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                message: '',
            }
        case type.FETCH_BILL_RETURN_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
            }
        //create
        case type.CREATE_BILL_RETURN_ACTION:
            return {
                ...state,
                form: {},
                loading: true,
                message: '',
                re_render: false,
            }
        case type.CREATE_BILL_RETURN_ACTION_SUCCESS:
            return {
                ...state,
                form: action.payload,
                loading: false,
                message: '',
                re_render: false,
            }
        case type.CREATE_BILL_RETURN_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
                re_render: false,
            }
        //update
        case type.UPDATE_BILL_RETURN_ACTION:
            return {
                ...state,
                form: {},
                loading: true,
                message: '',
                re_render: false,
            }
        case type.UPDATE_BILL_RETURN_ACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                message: '',
                re_render: false,
            }
        case type.UPDATE_BILL_RETURN_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
            }
        //bildetail
        case type.FETCH_BILL_RETURN_DETAIL_ACTION:
            return {
                ...state,
                params: action.payload,
                form: {},
                loading: true,
                message: '',
            }
        case type.FETCH_BILL_RETURN_DETAIL_ACTION_SUCCESS:
            return {
                ...state,
                detail: action.payload,
                loading: false,
                message: '',
            }
        case type.FETCH_BILL_RETURN_DETAIL_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
            }
        //create
        case type.CREATE_BILL_RETURN_DETAIL_ACTION:
            return {
                ...state,
                form: {},
                loading: true,
                message: '',
                re_render: false,
            }
        case type.CREATE_BILL_RETURN_DETAIL_ACTION_SUCCESS:
            return {
                ...state,
                form: action.payload,
                loading: false,
                message: '',
                re_render: true,
            }
        case type.CREATE_BILL_RETURN_DETAIL_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
                re_render: false,
            }
        //update
        case type.UPDATE_BILL_RETURN_DETAIL_ACTION:
            return {
                ...state,
                form: {},
                loading: true,
                message: '',
                re_render: false,
            }
        case type.UPDATE_BILL_RETURN_DETAIL_ACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                message: '',
                re_render: true,
            }
        case type.UPDATE_BILL_RETURN_DETAIL_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
            }
        //add item detail
        case type.ADD_ITEM_ACTION:
            return {
                ...state,
                form: {},
                loading: true,
                message: '',
                re_render: false,
            }
        case type.ADD_ITEM_ACTION_SUCCESS:
            return {
                ...state,
                listDetail: action.payload,
                loading: false,
                message: '',
                re_render: false,
            }
        case type.ADD_ITEM_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
            }
        //UPDATE item detail
        case type.UPDATE_ITEM_ACTION:
            return {
                ...state,
                form: {},
                loading: true,
                message: '',
                re_render: false,
            }
        case type.UPDATE_ITEM_ACTION_SUCCESS:
            return {
                ...state,
                listDetail: action.payload,
                loading: false,
                message: '',
            }
        case type.UPDATE_ITEM_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
            }
        //REMOTE item detail
        case type.REMOTE_ITEM_ACTION:
            return {
                ...state,
                form: {},
                loading: true,
                message: '',
            }
        case type.REMOTE_ITEM_ACTION_SUCCESS:
            return {
                ...state,
                listDetail: action.payload,
                loading: false,
                message: '',
            }
        case type.REMOTE_ITEM_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
            }
        default:
            return state;
    }
};