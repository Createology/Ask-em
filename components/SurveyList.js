import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight
} from "react-native";

//props from home.js
export default class SurveyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: props.names
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.names}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => {
                this.props.selectedSurvey(item.key);
                this.props.showHandler();
              }}
            >
              <Text style={styles.text}>{item.key}</Text>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white"
  },
  item: {
    fontSize: 18,
    height: 44,
    textAlign: "left"
  },
  text: {
    fontSize: 25
  }
});
