import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableHighlight
} from "react-native";
import { Container, Header, Text as Textbase, Left } from "native-base";
import { Icon } from 'react-native-elements';

export default class Contact extends Component {
  static navigationOptions = {
    drawerIcon : ({tintColor})=>(
        <Icon name='library-books' style={{fontSize : 30 }} />
    )
};
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Header>
          <Left>
            <Icon name='menu' onPress={() => { this.props.navigation.openDrawer() }} />
          </Left>
          <Text style={styles.headerStyle}>Welcome to ASKem!</Text>
        </Header>
        <View style={styles.container}>
          <Text style={styles.text}> In Contact Component!</Text>

          <TextInput />
        </View >
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
    },
  headerStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    textAlign: "left",
    color: "white",
    fontSize: 22
  },
  text: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: "left"
  }
});
