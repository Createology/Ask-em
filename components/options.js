import React, { Component } from 'react';
import { View, SafeAreaView, Image, ScrollView, Modal, TouchableHighlight } from 'react-native';

import {
  createDrawerNavigator,
  DrawerItems,
  createAppContainer
} from "react-navigation";
import Signup from "./signup";
import Signin from "./signin";
import TabNavigator from "./tabNavigator";

export class Options extends Component {
  render() {
    return (
      <AppDrawerNavigator />

    );
  }
}

const CustumDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 150, backgroundColor: 'white', alignItems: center, justifyContent: center }}>
      <Image source={require('./download.png')} style={{ height: 120, width: 120, borderRadius: 60 }} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
"Ask'Em" :TabNavigator,
  Signin: Signin,
  Signup: Signup
},
  {
    initialRouteName: "Ask'Em",
    ContentComponent: CustumDrawerComponent,
  },

)

export default createAppContainer(AppDrawerNavigator);