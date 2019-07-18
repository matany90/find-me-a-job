import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import AuthScreen from '../Screens/AuthScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import MapScreen from '../Screens/MapScreen';
import DeckScreen from '../Screens/DeckScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import ReviewScreen from '../Screens/ReviewScreen';

         const mainNavigation = createBottomTabNavigator({
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
                  })
                }
              })
            }
          });

export default mainNavigation;




