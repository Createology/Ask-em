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




      <View style={styles.container}>
        <Button style={styles.button} 
  icon={
    <Icon
      name='arrow-right'
      size={15}
      color='white'
    />
  }
  
/><Button style={styles.button}
  icon={
    <Icon
      name='arrow-right'
      size={15}
      color='white'
    />
  }
  
/><Button style={styles.button}
  icon={
    <Icon
      name='arrow-right'
      size={15}
      color='white'
    />
  }
  
/><Button style={styles.button}
  icon={
    <Icon
      name='arrow-right'
      size={15}
      color='white'
    />
  }
  
/><Button style={styles.button}
  icon={
    <Icon
      name='arrow-right'
      size={15}
      color='white'
    />
  }
  
/>
        
      </View>



    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding : 30
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  button: {
    color: "#000",
    margin: 10,
    fontSize: 30,
    textAlign: "left"
  },
  footerTab: {
    backgroundColor: "#FFF",
    borderStyle: "solid",
    borderWidth: 0,
    borderTopWidth: 1,
    borderColor: "grey"
  },
  icon: {
    margin: 40,
    color: "#FFF"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: "left"
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 300,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
    textAlign: "center"
  }
});

