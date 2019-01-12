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
  Toast
} from "native-base";
import { Icon } from "react-native-elements";
import SurveyStats from "./SurveyStats";

export default class AccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
      0,
      7
    );

  render() {
    const color = this.randomColor();
    if (this.props.birthdays) {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.props.visibility}
            onRequestClose={() => {}}
          >
            <SurveyStats
              finalSmartAnswer={this.props.finalSmartAnswer}
              birthdays={this.props.birthdays}
              genders={this.props.genders}
              lastNames={this.props.lastnames}
              maritalStatuses={this.props.maritalstatuses}
              educationLevels={this.props.educationlevels}
              randomColor={color}
            />
            <Button
              iconLeft
              style={{ backgroundColor: color }}
              onPress={() => {
                this.props.showHandler(false);
              }}
            >
              <Iconbase name="arrow-back" />
              <Text style={{ marginStart: 10, marginEnd: 10, color: "white" }}>
                Back
              </Text>
            </Button>
          </Modal>
        </View>
      );
    } else {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.props.visibility}
            onRequestClose={() => {}}
          >
            <Button
              iconLeft
              style={{ backgroundColor: color }}
              onPress={() => {
                this.props.showHandler(false);
              }}
            >
              <Iconbase name="arrow-back" />
              <Text style={{ marginStart: 10, marginEnd: 10, color: "white" }}>
                Back
              </Text>
            </Button>
          </Modal>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  textTitle: {
    fontSize: 25,
    textAlignVertical: "center",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "Roboto"
  },
  textScreenElements: {
    fontSize: 19,
    fontFamily: "Roboto"
  },
  surveyValues: {
    textAlign: "left",
    fontSize: 18,
    fontFamily: "Roboto"
  },
  input: {
    height: 50,
    backgroundColor: "rgba(0, 0, 255, 0.2)",
    marginBottom: 20,
    color: "#FFF",
    paddingHorizontal: 10,
    fontSize: 18
  },
  modalContainer: {
    width: "80%"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20
  },
  buttonCancel: {
    width: "45%"
  },
  buttonSend: {
    width: "45%"
  }
});

AccountModal.propTypes = {
  showHandler: PropTypes.func,
  visibility: PropTypes.bool,
  selectedSurvey: PropTypes.string,
  allSurveys: PropTypes.array,
  surveyName: PropTypes.string,
  surveyDescription: PropTypes.string,
  surveyCategory: PropTypes.string,
  submitModalHandler: PropTypes.func
};
