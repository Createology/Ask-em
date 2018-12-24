import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, SectionList, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Container, Footer, Title, Button, FooterTab, Content } from 'native-base';
import { List, ListItem, Icon, parseIconName } from 'react-native-elements';


export default class Options extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <View>

        <Icon
          name='rowing' />

        <Icon
          name='g-translate'
          color='#00aced' />

        <Icon
          name='sc-telegram'
          type='evilicon'
          color='#517fa4'
        />

        <Icon
          reverse
          name='ios-american-football'
          type='ionicon'
          color='#517fa4'
        />

        <Icon
          raised
          name='heartbeat'
          type='font-awesome'
          color='#f50'
          onPress={() => console.log('hello')} />
      </View>
    )
  }
}
