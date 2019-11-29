import axios from "axios";
import { call, put, all, takeEvery } from 'redux-saga/effects';
import {
    ADD_POST_REQUEST,
    DELETE_POST_REQUEST,
    FETCH_POSTS_REQUEST,
    UPDATE_POST_REQUEST,
    USER_LOGIN_REQUEST,
    USER_REGISTER_REQUEST,
} from "./twitter-actions";

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
function* fetchPosts(action) {
    try {
        const {data} = yield call(axios.get,`posts?page=${action.payload.page}`);
        yield put({
            type: FETCH_POSTS_SUCCESS,
            payload: data
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

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
function* addPost(action) {
    const {content, username} = action.payload;
    try {
        const response = yield call(axios.post, `posts/`, {content});
        yield put({
            type: ADD_POST_SUCCESS,
            payload: {...response.data, username}
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

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';
function* deletePost(action){
    const {post} = action.payload;
    try {
        yield call( axios.delete,`posts/${post.id}`);
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

export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';
function* updatePost(action) {
    const {post, newContent} = action.payload;
    try {
        const response = yield call(axios.put,`posts/${post.id}`,
            {
                content: newContent
            }
        );
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

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
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

export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';
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