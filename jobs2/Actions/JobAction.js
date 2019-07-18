import axios from 'axios';
import { FETCH_JOBS, LIKE_JOB, CLEAN_LIKES} from './types';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import jobData from './IndeedJobsData.json';

/* const JOBS_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
    publisher:'4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: '10',
    q: 'javascript',
} */

export const fetchJobs = (region, callbackNavigation) => 
async dispatch => {
    try {
        const data = jobData;
        console.log('data.results', data.results);
        dispatch({type: FETCH_JOBS, payload: data.results})
        callbackNavigation();
    } catch(err) {
        console.log(err);
    }
}

export const likeJob = (job) => {
    return {payload: job, type: LIKE_JOB}
}


export const cleanLikes = () => {
    return {type: CLEAN_LIKES, payload: []}
}