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
// var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

const ip = require("../ip.json");

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "",
      questionID: 0,
      questionChoices: [],
      mappedQuestionChoices: [7, 8, 9]
    };
    // console.warn("this.state.questionID", this.state.questionID);
  }

  async componentWillReceiveProps(nextProps) {
    console.warn("nextProps.questionID", nextProps.questionID);
    if (this.props.questionID !== nextProps.questionID) {
      // console.warn("questionID2: ", nextProps.questionID);
      this.setState({
        questionID: nextProps.questionID
      });
      // console.warn("questionID3: ", this.state.questionID);
      await this.getAllChoicesOfQuestion(this.props.questionID);
      //   alert("this.props.questionsIDs", this.props.questionsIDs);

      this.setState({
        mappedQuestionChoices: questionChoices.map(({ choice }) => {
          choice;
        })
      });
    }
  }

  //   getChoicesOfQuestion(questionID) {
  //     fetch(`${ip}:3000/question/dumb/get/choice/question`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         questionID: questionID
  //       })
  //     })
  //       .then(response => {
  //         return response.json();
  //       })
  //       .then(res => {
  //         // console.warn(res);
  //         this.setState({
  //           questionChoices: res
  //         });
  //       })
  //       .done(() => {
  //         console.warn("question choices: ", this.state.questionChoices);
  //       });
  //   }

  async getAllChoicesOfQuestion(questionID) {
    await fetch(`${ip}:3000/question/dumb/get/choice/question`, {
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
        alert(res);
        await this.setState({
          questionChoices: res
        });
      })
      .done(() => {
        // console.warn("all choices of question: ", this.state.questionChoices);
        // this.state.allChoicesOfSurvey.forEach(({ choice, id }, index) => {
        //   if (
        //     !this.state.sortedSurveyChoices.hasOwnProperty(
        //       this.state.allChoicesOfSurvey[index].id
        //     )
        //   ) {
        //     this.state.sortedSurveyChoices[
        //       this.state.allChoicesOfSurvey[index].id
        //     ] = [];
        //   }
        //   this.state.sortedSurveyChoices[
        //     this.state.allChoicesOfSurvey[index].id
        //   ].unshift(this.state.allChoicesOfSurvey[index].choice);
        // });
        // console.warn(this.state.sortedSurveyChoices);
        // var result = [];
        // for (
        //   let i = 0;
        //   i < Object.keys(this.state.sortedSurveyChoices).length;
        //   i++
        // ) {
        //   result = result.concat(
        //     Object.values(this.state.sortedSurveyChoices)[i]
        //   );
        // }
        // this.setState({
        //   buttons: [...result, "Cancel"]
        // });
      });
  }

  render() {
    const {
      questionChoices,
      questionID,
      clicked,
      mappedQuestionChoices
    } = this.state;

    return (
      <View>
        <Button
          onPress={() => {
            ActionSheet.show(
              {
                options: mappedQuestionChoices,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: `a Testing ActionSheet ${questionID}`
              },
              async buttonIndex => {
                await this.setState({
                  clicked: mappedQuestionChoices[buttonIndex]
                });
              }
            );
          }}
        >
          <Text>Answer</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  }
});

Question.propTypes = {
  questionID: PropTypes.number.isRequired
};
