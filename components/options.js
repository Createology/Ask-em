import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList, SectionList, Image, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Switch } from 'native-base';
import { Icon, Button, parseIconName } from 'react-native-elements';

import {
  createDrawerNavigator,
  DrawerItems,
  TabBarBottom,
  createAppContainer,
  NavigationActions,
  DrawerActions,
  createStackNavigator
} from "react-navigation";
import Home from "./home";
import Signup from "./signup";
import Signin from "./signin";
import LogOut from "./logout";
import Account from "./account";
import Contact from "./Contact";
import TabNavigator from "./tabNavigator";
import PropTypes from 'prop-types';

export class Options extends Component {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  render() {
    return (    
        <AppDrawerNavigator />
     
    );
  }
}
Options.propTypes = {
  navigation: PropTypes.object
};



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
  Home: TabNavigator,
  Signin : Signin,
  Signup : Signup
  },
  {
    initialRouteName: 'Home',
    ContentComponent: CustumDrawerComponent,
    contentOptions: {
      // activeTintColor : 'orange'
    },
    drawerWidth: 300
  },

)

export default createAppContainer(AppDrawerNavigator);