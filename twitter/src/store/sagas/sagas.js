import axios from "axios";
import { call, put, all, takeEvery } from 'redux-saga/effects';
import {
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    FETCH_POSTS_FAILURE,
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    UPDATE_POST_FAILURE,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS, USER_LOGIN_FAILURE,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS
} from "../twitter/twitter-actions";

function* fetchPosts(action) {
    try {
        const page = action.payload;
        const response = yield call(axios.get,`posts?page=${page}`);
        yield put({
            type: FETCH_POSTS_SUCCESS,
            payload: {data: response.data}
        })
    } catch (error) {
        yield put({
            type: FETCH_POSTS_FAILURE,
            payload: {error}
        })
    }
}

function* watchFetchPosts() {
    yield takeEvery(FETCH_POSTS_REQUEST, fetchPosts)
}


function* addPost(action) {
    const {content, username} = action.payload;
    try {
        const response = yield call(axios.post, `posts/`,
            {
                content: content
            }
        );
        const post = {
            id: response.data.id,
            content: response.data.content,
            username: username,
            created_at: response.data.created_at
        };
        yield put({
            type: ADD_POST_SUCCESS,
            payload: {post}
        });
    } catch (error) {
        yield put({
            type: ADD_POST_FAILURE,
            payload: {error}
        });
    }
}

function* watchAddPost() {
    yield takeEvery(ADD_POST_REQUEST, addPost)
}

function* deletePost(action){
    const {post} = action.payload;
    try {
        const response = yield call( axios.delete,`posts/${post.id}`);
        console.log(response);
        yield put({
            type: DELETE_POST_SUCCESS,
            payload: {post}
        });
    } catch (error) {
        yield put({
            type: DELETE_POST_FAILURE,
            payload: {error}
        });
    }
}

function* watchDeletePost() {
    yield takeEvery(DELETE_POST_REQUEST, deletePost)
}

function* updatePost(action) {
    const {post, newContent} = action.payload;
    try {
        const response = yield call(axios.put,`posts/${post.id}`,
            {
                content: newContent
            }
        );
        console.log(response);
        yield put({
            type: UPDATE_POST_SUCCESS,
            payload: {post: response.data}
        });
    } catch (error) {
        yield put({
            type: UPDATE_POST_FAILURE,
            payload: {error}
        });
    }
}

function* watchUpdatePost() {
    yield takeEvery(UPDATE_POST_REQUEST, updatePost)
}

function* userLogin(action){
    const {credentials} = action.payload;
    try {
        const response = yield call(axios.post,`login`,
            {
                name: credentials.login,
                password: credentials.password
            }
        );
        localStorage.setItem('username', credentials.login);
        localStorage.setItem('access_token', response.data.access_token);
        yield put({
            type: USER_LOGIN_SUCCESS,
            payload: {
                username: credentials.login,
                access_token: response.data.access_token
            }
        });
    } catch (error) {
        yield put({
            type: USER_LOGIN_FAILURE,
            payload: {error}
        });
    }
}

function* watchUserLogin() {
    yield takeEvery(USER_LOGIN_REQUEST, userLogin)
}

// export const USER_LOGOUT = 'USER_LOGOUT';
// export const userLogout = () => {
//     localStorage.removeItem('username');
//     localStorage.removeItem('access_token');
//     return {
//         type: USER_LOGOUT
//     }
// };
//

function* userRegistration(action) {
    const {userData} = action.payload;
    try {
        const response = yield call( axios.post,`register`,
            {
                email: userData.email,
                password: userData.password,
                name: userData.username
            }
        );
        localStorage.setItem('username', userData.username);
        localStorage.setItem('access_token', response.data.access_token);
        yield put({
            type: USER_REGISTER_SUCCESS,
            payload: {
                username: userData.username,
                access_token: response.data.access_token}
        });
    } catch (error) {
        yield put({
            type: USER_REGISTER_FAILURE,
            payload: {error}
        });
    }
}

function* watchUserRegistration() {
    yield takeEvery(USER_REGISTER_REQUEST, userRegistration)
}

export default function* rootSaga() {
    yield all([
        watchFetchPosts(),
        watchAddPost(),
        watchDeletePost(),
        watchUpdatePost(),
        watchUserLogin(),
        watchUserRegistration()
    ])
}