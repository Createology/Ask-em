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
  <View>
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  </View>
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