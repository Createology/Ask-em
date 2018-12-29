import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList, SectionList, Image, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Switch } from 'native-base';
import { Icon, Button, parseIconName } from 'react-native-elements';

import {
  createDrawerNavigator,
  DrawerItems,
  TabBarBottom,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import Home from "./home";
import Signup from "./signup";
import Signin from "./signin";
import LogOut from "./logout";
import Account from "./account";
import Contact from "./Contact";

 
export class Options extends Component {

  render() {
    return (
      <AppDrawerNavigator />
    );
  }
}

const CustumDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 150, backgroundColor: white, alignItems: center, justifyContent: center }}>
      <Image source={require('./download.png')} style={{ height: 120, width: 120, borderRadius: 60 }} />
    </View>


    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView> 

  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Home: Home,
  Account: Account,
  Contact: Contact,
  Signin: Signin,
  Signup: Signup,
  LogOut: LogOut

},
  {
    ContentComponent: CustumDrawerComponent,
    contentOptions: {
      // activeTintColor : 'orange'
    }

  }
)

export default createAppContainer(AppDrawerNavigator);