import React, { Component } from "react";
import {
  createBottomTabNavigator,
  TabBarBottom,
  createAppContainer
} from "react-navigation";
// import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";

import Home from "./components/home";
import Account from "./components/account";
import Contact from "./components/Contact";
import Options from './components/options';


const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Account: Account,
    Contact: Contact,
    More : Options
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
        } else if (routeName === "More") {
          iconName = `home`;
        }

        return <Icon size={40} name={iconName} color={"grey"} />;
        // return <Ionicons name={iconName} size={40} color={"skyblue"} />;
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "blue",
      inactiveTintColor: "gray"
    },
    animationEnabled: false,
    swipeEnabled: false
  }
);

export default createAppContainer(TabNavigator);
