import {
    FB_LOGIN_SUCCESS, FB_LOGIN_FAIL
    , FB_RESET_TOKEN_STATE,
    TOKEN_NOT_EXIST
} from '../Actions/types';

INITIAL_STATE = {
    fbToken: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FB_LOGIN_SUCCESS:
            return { ...state, fbToken: action.payload }
        case FB_LOGIN_FAIL:
            return { ...state, fbToken: null }
        case FB_RESET_TOKEN_STATE:
            return { ...state, fbToken: action.payload }
        case TOKEN_NOT_EXIST:
            return { ...state, fbToken: action.payload }
        default:
            return state
    }
}