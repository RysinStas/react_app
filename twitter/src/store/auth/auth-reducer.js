import {requestsReducer} from "redux-saga-requests";
import {APP_INIT, USER_LOGIN, USER_LOGOUT, USER_REGISTER} from "./auth-actions";

const authReducer = requestsReducer({
    actionType: USER_LOGIN,
    multiple: true,
    onSuccess:  (state, action) => {
        return { ...state,
            data: {...action.payload.data, username: action.meta.username},
            pending: 0}
    }  ,
    mutations: {
        [USER_REGISTER]: {
            updateData: (state, action) => {
                return {
                ...state.data, ...action.payload.data, username: action.meta.username
                }
            },
        },
        [USER_LOGOUT]: {
            updateData: (state, action) => []
        },
        [APP_INIT]: {
            updateData: (state, action) => {
                return {
                    ...state.data, ...action.payload
                }
            },
            local: true,
        },
    }
});

export default authReducer;