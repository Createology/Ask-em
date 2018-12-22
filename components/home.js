/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View , FlatList, SectionList} from 'react-native';
import { Container, Footer, Title, Button, FooterTab, Content } from 'native-base';
import { List, ListItem, Icon, parseIconName } from 'react-native-elements';
// use this library https://oblador.github.io/react-native-vector-icons/
// to choose the icon from "MaterialIcons"
import Account from './account';
import {createStackNavigator} from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    static navigationOptions = {
        title: 'Welcome',
    };
  render() {
    return (
      <Container>
        <View style={styles.container}>
          
          <Text style={styles.welcome}>Welcome to ASKem! </Text>
          <Text style={styles.instructions}>To get started, edit App.js and Server.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <Text style={styles.welcome}>This is from askem/server.js:</Text>
          <Account />

          <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Jackson'},
              {key: 'James'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />

          <SectionList
            sections={[
              {title: 'Section1', data: ['Devin']},
              {title: 'Section2', data: ['Jackson', 'John', 'Julie']},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />

        </View>
        
        {/* <List>
          <ListItem
            roundAvatar
            avatar={'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}
            key={'Amy Farha'}
            title={'Amy Farha'}
          />
        </List> */}
        <Footer>
          <FooterTab style={styles.footerTab}>
            <Button onPress={this.try.bind(this)}>
              <Icon size={40} name='home' color='grey'/>
            </Button>
            <Button onPress={this.try.bind(this)}>
              <Icon size={40} name='library-books' color='grey' />
            </Button>
            <Button onPress={this.try.bind(this)}>
              {/* <Text style={styles.button}></Text> */}
              <Icon size={40} name='account-box' color='grey' />
            </Button>
            <Button>
              <Icon size={40} name='more-horiz' color='grey' />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  try() {
    alert('try')
  }

  constructor(props) {
    super(props)
    this.state = { data: '' }
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
  button: {
    color: "#000",
    margin: 10, 
    fontSize: 30, 
    textAlign: 'left',
  },
  footerTab: {
    backgroundColor:"#FFF",
    borderStyle: 'solid',
    borderWidth: 0,
    borderTopWidth: 1,
    borderColor: 'grey',
  },
  icon: {
    margin: 40,
    color: "#FFF",
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