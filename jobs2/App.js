import Expo, {Notifications} from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import AuthScreen from './Screens/AuthScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import MapScreen from './Screens/MapScreen';
import DeckScreen from './Screens/DeckScreen';
import SettingsScreen from './Screens/SettingsScreen';
import ReviewScreen from './Screens/ReviewScreen';
import { Provider } from 'react-redux';
import store from './Store';
import {Icon} from 'react-native-elements';
import registerForNotifications from './Services/push_notifications';



export default class App extends React.Component {
componentDidMount() {
  registerForNotifications();
  Notifications.addListener((notification) => {
    if(notification.origin === 'received' && notification.data.text) {
      Alert.alert(
        'New push Notification',
        notification.data.text,
        [{text: 'Ok'}]
      );
    }
  })
}


  render() {
    const MainNavigation = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: createStackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            }),
            navigationOptions: {
              title: 'Review Jobs',
              tabBarIcon: ({ tintColor }) => {
                  return <Icon name="favorite" size={30} color={tintColor} />;
              },
            }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy:true
    });
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
