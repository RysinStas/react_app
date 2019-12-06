import {APP_INIT, fetchUser, setAuthHeader, USER_LOGIN, USER_REGISTER} from "./auth-actions";
import {success} from "redux-saga-requests";

const authMiddleWare = (store) => (next) => (action) => {
    switch (action.type) {
        case APP_INIT:
            if (action.payload.access_token) {
                next(setAuthHeader(action.payload.access_token));
                next(fetchUser())
                    .then((response)=>(console.log('response',response))).catch((error)=>(console.log('error',error)))
            }
            break;
        case success(USER_LOGIN):
        case success(USER_REGISTER):
            localStorage.setItem('account', JSON.stringify({
                access_token: action.payload.data.access_token
            }));
            next(setAuthHeader(action.payload.data.access_token));
            next(fetchUser())
                .then((response)=>(console.log('response',response))).catch((error)=>(console.log('error',error)));
            break;
        default:
            break;
    }
    return next(action)
};

export default authMiddleWare