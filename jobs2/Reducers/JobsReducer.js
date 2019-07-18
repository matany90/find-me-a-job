import {FETCH_JOBS} from '../Actions/types';

INITIAL_STATE = {
    jobsData: []
}
export default (state = INITIAL_STATE, action) => {
switch(action.type) {
    case FETCH_JOBS:
        return {...state, jobsData: action.payload }
        default: 
        return state
}
}