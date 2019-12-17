import {SHOW_ERRORS} from "./errors-actions";

const initialState = {
    errors: [],
};

const errorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ERRORS:
            return {
                ...state,
                errors: [action.payload]
            };
        default:
            return state;
    }
};

export default errorsReducer;
