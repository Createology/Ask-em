import React, { Component } from "react";
import {
  createBottomTabNavigator,
  TabBarBottom,
  createAppContainer
} from "react-navigation";
// import Ionicons from "react-native-vector-icons/Ionicons";
import IconAnt from "react-native-vector-icons/AntDesign";
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
        } else if (routeName === "Account") {
          iconName = `user`;
        } else if (routeName === "Contact") {
          iconName = `profile`;
        }
        return (
          <IconAnt
            reverse
            raised
            style={{ fontSize: 34, color: "white" }}
            name={iconName}
          />
        );
      }
    }),
    drawerIcon: () => <Icon name="home" style={{ fontSize: 30 }} />,
    initialRouteName: "Home",
    backBehavior: "initialRoute",
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#F77F00",
      inactiveTintColor: "gray",
      activeBackgroundColor: "#E5504B",
      inactiveBackgroundColor: "#037FBC",
      labelStyle: { color: "white", fontWeight: "bold" }
    },
    animationEnabled: false,
    swipeEnabled: false
  }
);

export default createAppContainer(TabNavigator);
