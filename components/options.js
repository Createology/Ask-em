import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Modal,
  TouchableHighlight
} from "react-native";

import {
  createDrawerNavigator,
  DrawerItems,
  createAppContainer
} from "react-navigation";
import Signup from "./signup";
import Signin from "./signin";
import Payment from "./Payment";
import TabNavigator from "./tabNavigator";
import Search from "./Search";
import AddSurvey from "./AddSurvey";
import AboutUs from "./aboutUs";
import Home from "./home";

export class Options extends Component {
  render() {
    return <AppDrawerNavigator />;
  }
}

const CustumDrawerComponent = props => (
  <Container>
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  </Container>
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    "Ask'Em": TabNavigator,
    Home: Home,
    Search: Search,
    Signin: Signin,
    Signup: Signup,
    Payment: Payment,
    AddSurvey: AddSurvey,
    AboutUs: AboutUs
  },
  {
    initialRouteName: "Ask'Em",
    ContentComponent: CustumDrawerComponent,
    drawerWidth: 200,
    contentOptions: {
      activeTintColor: '#E5504B',
      activeBackgroundColor: 'rgba(0,0,0,0)',
      inactiveBackgroundColor: 'rgba(0,0,0,0)',
      inactiveTintColor: '#545f7a',
      style: {
        marginVertical: 0
      },
      labelStyle: {
        fontWeight: "bold",
        fontFamily: "Roboto",
        backgroundColor: "transparent"
      }
    }
  }
);

export default createAppContainer(AppDrawerNavigator);
