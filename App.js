/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Footer, Title, Button, FooterTab, Content } from 'native-base';
import { Icon, parseIconName } from 'react-native-elements';
// use this library https://oblador.github.io/react-native-vector-icons/
// to choose the icon from "MaterialIcons"


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to ASKem! </Text>
          <Text style={styles.instructions}>To get started, edit App.js and Server.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <Text style={styles.welcome}>This is from askem/server.js: {this.state.data.dark}</Text>
        </View>
        <Footer>
          <FooterTab style={styles.footerTab}>
            <Button>
              <Icon size={40} name='home' color='grey' />
            </Button>
            <Button>
              <Icon size={40} name='library-books' color='grey' />
            </Button>
            <Button>
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

  constructor(props) {
    super(props)
    this.state = { data: 'wait' }
  }

  componentDidMount() {
    // fetch('http://192.168.0.17:3000/isa/', {
    //   method: 'GET'
    // })
    fetch('http://192.168.1.156:3000/isa/', {
      method: 'GET'
    })
      .then((response) => { return response.json() })
      .then((res) => {
        // alert(res.dark),
          this.setState({
            data: res
          })
      }).done()
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
});