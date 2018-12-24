import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Account extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> In Account Component! </Text>
        <Text style={styles.text}>
          Dark from server.js: {this.state.data.dark}
        </Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = { data: "wait" };
  }

  componentDidMount() {
    // depending on where am I
    fetch("http://192.168.0.54:3000/isa/", {
      // fetch('http://192.168.1.156:3000/isa/', {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        // alert(res.dark),
        this.setState({
          data: res
        });
      })
      .done();
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  text: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: "left"
  }
});