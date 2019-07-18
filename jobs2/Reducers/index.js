import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import JobsReducer from './JobsReducer';
import LikeReducer from './LikeReducer';

export default combineReducers({
    auth: AuthReducer,
    jobs: JobsReducer,
    like: LikeReducer
})