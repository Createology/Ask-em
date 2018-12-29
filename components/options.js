import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList, SectionList, Image, ScrollView, Modal, TouchableHighlight, AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Switch } from 'native-base';
import { Icon, Button, parseIconName } from 'react-native-elements';

import {
  createDrawerNavigator,
  DrawerItems,
  TabBarBottom,
  createAppContainer,
  createStackNavigator,
} from "react-navigation";
import Home from "./home";
import Signup from "./signup";
import Signin from "./signin";
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
  <View>
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  </View>
)

const AppDrawerNavigator = createDrawerNavigator({
  Home: Home,
  Account: Account,
  Contact: Contact,
  Signin: Signin,
  Signup: Signup,
},
  {
    ContentComponent: CustumDrawerComponent,
    contentOptions: {
      // activeTintColor : 'orange'
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: 'white',
      },
    },
  }
)

export default createAppContainer(AppDrawerNavigator);