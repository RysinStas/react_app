export const USER_LOGIN = 'USER_LOGIN';
export const userLogin = (credentials) => {
    return ({
        type: USER_LOGIN,
        payload: {
            request: {
                url: `login`,
                method: 'post',
                data: {
                    name: credentials.username,
                    password: credentials.password
                }
            },
        },
        meta: {
            asPromise: true,
        },
    })
};

export const USER_LOGOUT = 'USER_LOGOUT';
export const userLogout = () => (dispatch) => {
    dispatch({
        type: USER_LOGOUT,
        payload: {
            request: {
                url: `logout`,
                method: 'post',
            },
        },
    });
    dispatch(deleteAuthHeader());
};

export const USER_REGISTER = 'USER_REGISTER';
export const userRegistration = (userData) => {
    return ({
        type: USER_REGISTER,
        payload: {
            request: {
                url: `register`,
                method: 'post',
                data: {
                    email: userData.email,
                    password: userData.password,
                    name: userData.username
                }
            },
        },
        meta: {
            asPromise: true,
        },
    })
};

export const FETCH_USER = 'FETCH_USER';
export const fetchUser = () =>  {
    return ({
        type: FETCH_USER,
        payload: {
            request: {
                url: `user`,
                method: 'get'
            },
        },
        meta: {
            asPromise: true,
        },
    })
};

export const APP_INIT = 'APP_INIT';
export const appInit = () => async (dispatch) => {
    try {
        const account = JSON.parse(localStorage.getItem('account'));
        if (account) {
            dispatch ({
                type: APP_INIT,
                payload: account
            });
            dispatch(setAuthHeader(account.access_token));
            await dispatch(fetchUser());
        }
    } catch (error) {
        dispatch(showAuthError(error));
    }
};

export const SET_AUTH_HEADER = 'SET_AUTH_HEADER';
export const setAuthHeader = (access_token) => {
    return ({
        type: SET_AUTH_HEADER,
        payload: {access_token}
    })
};

export const DELETE_AUTH_HEADER = 'DELETE_AUTH_HEADER';
export const deleteAuthHeader = () => {
    return ({
        type: DELETE_AUTH_HEADER
    })
};

export const loginAndFetchUser = (credentials) => async (dispatch) => {
    try {
        const response = await dispatch(userLogin(credentials));
        dispatch(setAuthHeader(response.payload.data.access_token));
        await dispatch(fetchUser());
    } catch (error) {
        dispatch(showAuthError(error));
    }
};

export const registerAndFetchUser = (userData) => async (dispatch) => {
    try {
        const response = await dispatch(userRegistration(userData));
        dispatch(setAuthHeader(response.payload.data.access_token));
        await dispatch(fetchUser());
    } catch (error) {
        dispatch(showAuthError(error));
    }
};

export const SHOW_AUTH_ERROR = 'SHOW_AUTH_ERROR';
export const showAuthError = (error) => {
    return ({
        type: SHOW_AUTH_ERROR,
        payload: error
    })
};

export const REMOVE_AUTH_ERRORS = 'REMOVE_AUTH_ERRORS';
export const removeAuthErrors = () => {
    return ({
        type: REMOVE_AUTH_ERRORS
    })
};

