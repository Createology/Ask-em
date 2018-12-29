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
import Header1 from "./components/Header";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Options from "./components/options";
import { Left } from "native-base";


const TabNavigator = createBottomTabNavigator(
  {
    Home: Options,
    Account: Account,
    Contact: Contact

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
