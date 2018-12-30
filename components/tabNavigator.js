import React, { Component } from "react";
import {
  createBottomTabNavigator,
  TabBarBottom,
  createAppContainer
} from "react-navigation";
// import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";
// this is the library of logos: https://oblador.github.io/react-native-vector-icons/
import Home from "./home";
import Account from "./account";
import Contact from "./Contact";

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Account: Account,
    Contact: Contact
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
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
    drawerIcon: () => (
      <Icon name='home' style={{ fontSize: 30 }} />
    ),
    initialRouteName: 'Home',
    backBehavior: 'initialRoute',
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
