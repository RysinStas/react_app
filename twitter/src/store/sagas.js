import {createRequestInstance, watchRequests} from "redux-saga-requests";
import {createDriver} from "redux-saga-requests-axios";
import {ADD_POST, DELETE_POST, fetchPosts} from "./twitter/twitter-actions";
import {put} from "redux-saga/effects";
import {deleteAuthHeader, setAuthHeader, USER_LOGIN, USER_LOGOUT, USER_REGISTER} from "./auth/auth-actions";
import axios from "axios";

function* onSuccessSaga(response, action) {
    switch (action.type) {
        case ADD_POST:
        case DELETE_POST:
            yield put(fetchPosts());
            break;
        case USER_LOGIN:
        case USER_REGISTER:
            localStorage.setItem('account', JSON.stringify({
                access_token: response.data.access_token,
                username: action.meta.username
            }));
            yield put(setAuthHeader(response.data.access_token));
            break;
        case USER_LOGOUT:
            yield put(deleteAuthHeader());
            break;
        default:
            break;
    }
    return response;
}

export default function* rootSaga() {
    yield createRequestInstance({
        driver: createDriver(axios),
        onSuccess: onSuccessSaga,
    });
    yield watchRequests()

}
