/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, SectionList, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Container, Footer, Title, Button, FooterTab, Content } from 'native-base';
import { List, ListItem, Icon, parseIconName } from 'react-native-elements';
// use this library https://oblador.github.io/react-native-vector-icons/
// to choose the icon from "MaterialIcons"
import { createStackNavigator } from 'react-navigation';

import Account from './components/account';
import Survey from './components/survey';
import SurveysList from './components/surveysList';
import FooterComponent from './components/footer';
import Options from './components/options';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      names: [
        { key: 'Isa' },
        { key: 'Maram' },
        { key: 'Anagreh' },
      ],
      sections: [
        { title: 'Section1', data: ['Devin'] },
        { title: 'Section2', data: ['John', 'Julie'] },
      ],
      modalVisible: false,
      selectedSurvey: null,
    }
  }

  static navigationOptions = {
    title: 'Welcome',
  };



  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  selectedSurvey(item) {
    this.setState({ selectedSurvey: item })
  }

  render() {
    return (

      <Container style={styles.container}>
        <View>

          <Options />
        </View>

      </Container>


    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  footerTab: {
    backgroundColor: "#FFF",
    borderStyle: 'solid',
    borderWidth: 0,
    borderTopWidth: 1,
    borderColor: 'grey',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: 'left',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 300,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
    textAlign: 'center',
  },
});