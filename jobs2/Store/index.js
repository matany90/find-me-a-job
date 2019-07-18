import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../Reducers';
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native';

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk),
        autoRehydrate()
    )
);

persistStore(store, { storage: AsyncStorage, whitelist: ['like']})

export default store;