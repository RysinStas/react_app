export const SHOW_ERRORS = 'SHOW_ERRORS';
export const showErrors = (errors) => {
    return ({
        type: SHOW_ERRORS,
        payload: errors
    })
};