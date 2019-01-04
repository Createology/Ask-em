import React, { Component } from 'react';
import { View, SafeAreaView, Image, ScrollView, Modal, TouchableHighlight } from 'react-native';

import {
  createDrawerNavigator,
  DrawerItems,
  createAppContainer
} from "react-navigation";
import Signup from "./signup";
import Signin from "./signin";
import Payment from "./Payment";
import TabNavigator from "./tabNavigator";

export class Options extends Component {
  render() {
    return (
      <AppDrawerNavigator />
    );
  }
}

const CustumDrawerComponent = (props) => (
  <View>
    <StatusBar
      backgroundColor="#ffffff"
      barStyle="dark-content"
      animated={true}
    />
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  </View>
)

const AppDrawerNavigator = createDrawerNavigator({
  "Ask'Em": TabNavigator,
  Signin: Signin,
  Signup: Signup,
  Payment: Payment
},
  {
    initialRouteName: "Ask'Em",
    ContentComponent: CustumDrawerComponent,
  },

)

export default createAppContainer(AppDrawerNavigator);