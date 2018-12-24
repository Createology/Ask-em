import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, SectionList, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Container, Footer, Title, FooterTab, Content } from 'native-base';
import { List, ListItem, Icon, Button, parseIconName } from 'react-native-elements';


export default class Options extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (




      <View>
        <Button
  icon={
    <Icon
      name='arrow-right'
      size={15}
      color='white'
    />
  }
  title='BUTTON WITH ICON COMPONENT'
/><Button
  icon={
    <Icon
      name='arrow-right'
      size={15}
      color='white'
    />
  }
  title='BUTTON WITH ICON COMPONENT'
/><Button
  icon={
    <Icon
      name='arrow-right'
      size={15}
      color='white'
    />
  }
  title='BUTTON WITH ICON COMPONENT'
/><Button
  icon={
    <Icon
      name='arrow-right'
      size={15}
      color='white'
    />
  }
  title='BUTTON WITH ICON COMPONENT'
/><Button
  icon={
    <Icon
      name='arrow-right'
      size={15}
      color='white'
    />
  }
  title='BUTTON WITH ICON COMPONENT'
/>
        
      </View>



    )
  }
}
