import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, SectionList, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Switch } from 'native-base';
import {Icon, Button, parseIconName } from 'react-native-elements';



export default class LogOut extends Component {
    static navigationOptions = {
        drawerIcon : ({tintColor})=>(
            <Icon name='close' style={{fontSize : 30 }} />
        )
    };

  render() {
    return (
        <View>
            <Text>
                Bye Bye
            </Text>
        </View>
    );
  }
}
