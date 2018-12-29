import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableHighlight
} from "react-native";

export default class Contact extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> In Contact Component!</Text>

        <TextInput />

      </View>
    );
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
  text: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: "left"
  }
});
