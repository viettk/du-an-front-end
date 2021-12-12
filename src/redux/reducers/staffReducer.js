import *as type from '../const/type';

const initState = {
    data: {
        content: [],
        totalElements: 0,
    },
    loading: false,
    message: '',
    create: true,
}

export const staffReducer = (state = initState, action) => {
    switch (action.type) {
        // fetch list nhan vien
        case type.FETCH_STAFF_ACTION:
            return {
                ...state,
                params: action.payload,
                loading: true,
                message: '',
            }
        case type.FETCH_STAFF_ACTION_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                message: '',
            }
        case type.FETCH_STAFF_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
            }
        // them moi nhan vien
        case type.CREATE_STAFF_ACTION:
            return {
                ...state,
                loading: true,
                message: '',
                create: false,
            }
        case type.CREATE_STAFF_ACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                message: '',
                create: true,
            }
        case type.CREATE_STAFF_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
                create: true,
            }
        //update
        case type.UPDATE_STAFF_ACTION:
            return {
                ...state,
                loading: true,
                message: '',
                create: false,
            }
        case type.UPDATE_STAFF_ACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                message: '',
                create: true,
            }
        case type.UPDATE_STAFF_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
                create: true,
            }
        //repassord
        case type.REPASSWORD_STAFF_ACTION:
            return {
                ...state,
                loading: true,
                message: '',
                create: false,
            }
        case type.REPASSWORD_STAFF_ACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                message: '',
                create: true,
            }
        case type.REPASSWORD_STAFF_ACTION_FAIL:
            return {
                ...state,
                loading: false,
                message: action.message,
                create: true,
            }
        default:
            return state;
    }
};