import React, { Component } from "react";
import {
  createBottomTabNavigator,
  TabBarBottom,
  createAppContainer
} from "react-navigation";
// import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";
// this is the library of logos: https://oblador.github.io/react-native-vector-icons/
import Home from "./components/home";
import Account from "./components/account";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Signup from "./components/signup";
import Signin from "./components/signin";

// import * as firebase from 'firebase';

// const firebaseConfig = {
//   apikey: "AIzaSyDc0MrwW4j1k-RP6Xg9eWA2n1DKvEf8pUU",
//   authDomain: "askem-f1ff4.firebaseapp.com",
//   databaseURL: "https://askem-f1ff4.firebaseio.com",
//   projectId: "askem-f1ff4",
//   sotrageBucket: "askem-f1ff4.appspot.com",
//   messagingSenderId: "145750228870"
// }

// firebase.initializeApp(firebaseConfig)

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Account: Account,
    Contact: Contact,
    Signup: Signup,
    Signin: Signin
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `home`;
        } else if (routeName === "Contact") {
          iconName = `library-books`;
        } else if (routeName === "Account") {
          iconName = `account-box`;
        } else if (routeName === "Signup") {
          iconName = `account-box`;
        } else if (routeName === "Signin") {
          iconName = `account-box`;
        }

        return <Icon size={40} name={iconName} color={"grey"} />;
      }
    }),

    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#3BBC9F",
      inactiveTintColor: "gray"
    },
    animationEnabled: false,
    swipeEnabled: false
  }
);

export default createAppContainer(TabNavigator);
