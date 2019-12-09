import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_REGISTER
} from "./auth-actions";
import {success} from "redux-saga-requests";

const authMiddleWare = (store) => (next) => (action) => {
    switch (action.type) {
        case success(USER_LOGIN):
        case success(USER_REGISTER):
            localStorage.setItem('account', JSON.stringify({
                access_token: action.payload.data.access_token
            }));
            break;
        case USER_LOGOUT:
            localStorage.removeItem('account');
            break;
        default:
            break;
    }
    return next(action)
};

export default authMiddleWare