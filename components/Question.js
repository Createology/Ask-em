import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  TextInput,
  ScrollView
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Text as Textbase,
  Item,
  Icon as Iconbase,
  Input,
  Form,
  Label,
  Picker,
  Left,
  Right,
  Textarea,
  Toast,
  Separator,
  ActionSheet,
  Radio,
  Root
} from "native-base";
import { Icon, Divider } from "react-native-elements";
import IconAwesome from "react-native-vector-icons/FontAwesome";
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

const ip = require("../ip.json");

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      questionID: 0,
      surveyID: "",
      userID: null,
      questionChoices: []
    };
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.questionID) {
      this.setState({
        questionID: nextProps.questionID
      });

      this.getAllChoicesOfQuestion(nextProps.questionID);
    }

    if (nextProps.userID) {
      await this.setState({
        userID: nextProps.userID.split(" ").join("")
      });
      // console.warn("userID: ", this.state.userID);
    }

    if (nextProps.surveyID) {
      await this.setState({
        surveyID: nextProps.surveyID
      });
      // console.warn("surveyID: ", this.state.surveyID);
    }
  }

  async getAllChoicesOfQuestion(questionID) {
    fetch(`${ip}:3000/question/dumb/get/choice/question`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionID: questionID
      })
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.setState({
          questionChoices: res.map(({ choice }) => choice)
        });
      })
      .done(() => {});
  }

  render() {
    const {
      questionChoices,
      questionID,
      selectedValue,
      userID,
      surveyID
    } = this.state;

    return (
      <View>
        <Button
          onPress={() => {
            ActionSheet.show(
              {
                options: questionChoices.concat("Cancel"),
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: `Please select one of the choices below`
              },
              async buttonIndex => {
                await this.setState({
                  selectedValue: questionChoices[buttonIndex]
                });
                // console.warn(this.state.selectedValue);
                await this.props.onChangeChoices(
                  this.state.selectedValue,
                  questionID,
                  userID,
                  surveyID
                );
              }
            );
          }}
        >
          <Text style={{ paddingLeft: 5, paddingRight: 5 }}>Answer</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  textElements: {
    color: "black"
  }
});

Question.propTypes = {
  questionID: PropTypes.number.isRequired
};
