import {Perissions, Notifications} from 'expo';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    let previousToken = await AsyncStorage.getItem('pushtoken');
    if (previousToken) {
        return;
    }
    else {
        let respone = await Perissions.askAsync('Permissions.REMOTE_NOTIFICATIONS');
        if(respone.status !== 'granted') { // user dont want to see notifications!
            return;
        }
        let currentToken = await Notifications.getExpoPushTokenAsync()
        await axios.post(PUSH_ENDPOINT, {currentToken: {currentToken}})
        AsyncStorage.setItem('pushtoken', token);
        
    }
}