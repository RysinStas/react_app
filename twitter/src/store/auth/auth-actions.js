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
        meta: credentials
    })
};

export const USER_LOGOUT = 'USER_LOGOUT';
export const userLogout = () => {
    localStorage.removeItem('account');
    return {
        type: USER_LOGOUT,
        payload: {
            request: {
                url: `logout`,
                method: 'post',
            },
        },
    }
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
        meta: userData
    })
};

export const APP_INIT = 'APP_INIT';
export const appInit = () => {
    return ({
        type: APP_INIT,
        payload: JSON.parse(localStorage.getItem('account'))
    })
};

export const SET_AUTH_HEADER = 'SET_AUTH_HEADER';
export const setAuthHeader = (access_token ) => {
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
