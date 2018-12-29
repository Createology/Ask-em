import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight
} from "react-native";
import PropTypes from "prop-types";

// props are from home
export default class SurveyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: props.names
    };
  }

  render() {
    const { names } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={names}
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

SurveyList.propTypes = {
  names: PropTypes.array,
  selectedSurvey: PropTypes.func,
  showHandler: PropTypes.func
};
