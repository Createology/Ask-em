import React, { Component } from "react";
import {
  Platform,
  TextInput,
  StyleSheet,
  Text,
  View,
  FlatList,
  SectionList,
  ScrollView,
  Modal,
  TouchableHighlight
} from "react-native";
import {
  Container,
  Footer,
  Title,
  Button,
  FooterTab,
  Content
} from "native-base";
import { List, ListItem, Icon, parseIconName } from "react-native-elements";
let ip = require("../ip.json");

export default class Header extends Component {
  static navigationOptions = {
    title: "Home"
  };

  constructor(props) {
    super(props);
    this.state = {
      text: "init",
      data: "init"
    };
  }

  onSearch() {
    fetch(`${ip}:3000/search/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: this.state.text })
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.setState({
          data: res.dark
        });
        console.warn(`this is the new data: ${this.state.data}`);
      })
      .done();
  }

  render() {
    return (
      <View style={styles.inner}>
        <TextInput
          style={styles.TextInput}
          editable={true}
          maxLength={40}
          numberOfLines={4}
          onChangeText={text => this.setState({ text })}
          placeholder="Search"
        />
        <Icon
          iconStyle={styles.button}
          size={40}
          name="search"
          color="white"
          onPress={this.onSearch.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inner: {
    position: "relative",
    borderStyle: "solid",
    justifyContent: "space-between",
    flexDirection: "row",
    top: 3,
    height: 45,
    marginLeft: 10
  },
  text: {
    fontSize: 25
  },
  TextInput: {
    height: 40,
    flex: 0.9,
    borderWidth: 1,
    backgroundColor: "white"
  },
  button: {
    marginLeft: 5,
    marginRight: 0
  },
  icon: {
    backgroundColor: "white"
  }
});
