import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import * as firebase from 'firebase';
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
var firebaseConfig = {
    apiKey: "AIzaSyAQQleDwfjCoYHNRvRK4xkZoStKs_BF2j4",
    authDomain: "barcode-7b0a6.firebaseapp.com",
    databaseURL: "https://barcode-7b0a6.firebaseio.com",
    projectId: "barcode-7b0a6",
    storageBucket: "barcode-7b0a6.appspot.com",
    messagingSenderId: "55063082958",
    appId: "1:55063082958:web:e0c50d2340dd3a02bddd9f",
    measurementId: "G-XT03PG0HVR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  


export default class App extends React.Component {
  render() {
    return <AppNavigator/>;
  }
}
const AppSwitchNavigator = createSwitchNavigator({
  HomeScreen:HomeScreen,
  DetailScreen:DetailScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);





