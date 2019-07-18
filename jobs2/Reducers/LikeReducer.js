import {LIKE_JOB, CLEAN_LIKES} from '../Actions/types';
import _ from 'lodash';
import  { REHYDRATE} from 'redux-persist/constants';


export default (state=[], action) => {
    switch(action.type) {
        case REHYDRATE:
        return action.payload.like || [];
        case LIKE_JOB:
           return  _.uniqBy([action.payload, ...state], 'jobkey')
           case CLEAN_LIKES:
            return [];
        default: 
        return state;
    }
}