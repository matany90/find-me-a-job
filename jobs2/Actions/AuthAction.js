import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL, TOKEN_NOT_EXIST } from './types';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo'

export const facebookLogin = () =>
    async dispatch => {
        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            dispatch({ type: FB_LOGIN_SUCCESS, payload: token })
        } else {
            doFacebookLogin(dispatch)
        }
    }

const doFacebookLogin = async (dispatch) => {
    let result = await Facebook.logInWithReadPermissionsAsync('338595450022568', {
        permissions: ['public_profile']
    });
    if (result.type === 'cancel') {
        return dispatch({ type: FB_LOGIN_FAIL })
    }
    await AsyncStorage.setItem('fb_token', result.token);
    dispatch({ type: FB_LOGIN_SUCCESS, payload: result.token })
}


export const exsitingToken = (navigation) =>
    async dispatch => {
        let token = await AsyncStorage.getItem('fb_token');
        if(token) {
            console.log('token', token);
            navigation.navigate('map')
            dispatch({ type: FB_LOGIN_SUCCESS, payload: token})
        } else {
            dispatch({ type: TOKEN_NOT_EXIST, payload: false })
        }
    }

