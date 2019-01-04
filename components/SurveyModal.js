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
//import Payment from "./Payment";

export default class SurveyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEducation: "primary",
      selectedMarital: "single",
      allSurveysInfo: [],
      showToast: false
    };
  }

  handleSurveyNameChange = name => {
    this.setState({ surveyName: name });
  };

  handleSurveyDescriptionChange = description => {
    this.setState({ surveyDescription: description });
  };

  handleSurveyCategoryChange = category => {
    this.setState({ surveyCategory: category });
  };

  render() {
    const { selectedEducation, selectedMarital } = this.state;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.visibility}
          onRequestClose={() => {}}
        >
          <View style={styles.container}>
            <View style={styles.modalContainer}>
              <Text style={styles.textTitle}>
                {this.props.surveyName.toUpperCase()}
              </Text>
              <Text style={styles.textTitle}>
                Please fill the required info
              </Text>
              <Form>
                <View style={{ flexDirection: "row" }}>
                  <Left style={{ flex: 1 }}>
                    <Text
                      note
                      numberOfLines={2}
                      style={styles.textScreenElements}
                    >
                      Survey Name:
                    </Text>
                  </Left>
                  <Right style={{ flex: 1 }}>
                    <Text note numberOfLines={8} style={styles.surveyValues}>
                      {this.props.surveyName}
                    </Text>
                  </Right>
                </View>

                {/*  */}
                <View style={{ flexDirection: "row" }}>
                  <Left style={{ flex: 1 }}>
                    <Text
                      note
                      numberOfLines={2}
                      style={styles.textScreenElements}
                    >
                      Survey Description:
                    </Text>
                  </Left>
                  <Right style={{ flex: 1 }}>
                    <Text note numberOfLines={8} style={styles.surveyValues}>
                      {this.props.surveyDescription}
                    </Text>
                  </Right>
                </View>
                {/*  */}
                <View style={{ flexDirection: "row" }}>
                  <Left style={{ flex: 1 }}>
                    <Text
                      note
                      numberOfLines={2}
                      style={styles.textScreenElements}
                    >
                      Survey Category:
                    </Text>
                  </Left>
                  <Right style={{ flex: 1 }}>
                    <Text note numberOfLines={8} style={styles.surveyValues}>
                      {this.props.surveyCategory}
                    </Text>
                  </Right>
                </View>

                {/*  */}
                <View style={{ flexDirection: "row" }}>
                  <Left style={{ flex: 1 }}>
                    <Text>Education Level: </Text>
                  </Left>

                  <Picker
                    note
                    mode="dropdown"
                    style={{ width: undefined }}
                    selectedValue={selectedEducation}
                    onValueChange={async (item, index) => {
                      await this.setState({
                        selectedEducation: item
                      });
                    }}
                  >
                    <Picker.Item
                      label="Primary"
                      value="primary"
                      style={styles.textScreenElements}
                    />
                    <Picker.Item
                      label="Secondary"
                      value="secondary"
                      style={styles.textScreenElements}
                    />
                    <Picker.Item label="High" value="high" />
                    <Picker.Item
                      label="Bachelor"
                      value="bachelor"
                      style={styles.textScreenElements}
                    />
                    <Picker.Item
                      label="Master"
                      value="master"
                      style={styles.textScreenElements}
                    />
                    <Picker.Item
                      label="Doctoral"
                      value="doctoral"
                      style={styles.textScreenElements}
                    />
                  </Picker>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Left style={{ flex: 1 }}>
                    <Text>Marital Status: </Text>
                  </Left>

                  <Picker
                    note
                    mode="dropdown"
                    style={{ width: undefined }}
                    selectedValue={selectedMarital}
                    onValueChange={async (item, index) => {
                      await this.setState({
                        selectedMarital: item
                      });
                    }}
                  >
                    <Picker.Item
                      label="Single"
                      value="single"
                      style={styles.textScreenElements}
                    />
                    <Picker.Item
                      label="Married"
                      value="married"
                      style={styles.textScreenElements}
                    />
                    <Picker.Item
                      label="Divorced"
                      value="divorced"
                      style={styles.textScreenElements}
                    />
                    <Picker.Item
                      label="Widowed"
                      value="widowed"
                      style={styles.textScreenElements}
                    />
                    <Picker.Item
                      label="Seperated"
                      value="seperated"
                      style={styles.textScreenElements}
                    />
                  </Picker>
                </View>
              </Form>

              <View style={styles.buttonRow}>
                <View style={styles.buttonSend}>
                  <Button
                    primary
                    full
                    block
                    onPress={() => {
                      this.props.submitModalHandler(
                        selectedEducation,
                        selectedMarital
                      );
                    }}
                  >
                    {/* need to changeicon color */}
                    <Icon name="send" style={{ color: "white" }} />
                    <Textbase>Submit</Textbase>
                  </Button>
                </View>

                <View style={styles.buttonCancel}>
                  <Button
                    primary
                    full
                    block
                    onPress={() => {
                      this.props.showHandler(false);
                    }}
                  >
                    {/* need to changeicon color */}
                    <Icon name="backspace" style={{ color: "white" }} />
                    <Textbase>Cancel</Textbase>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
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

SurveyModal.propTypes = {
  showHandler: PropTypes.func,
  visibility: PropTypes.bool,
  selectedSurvey: PropTypes.string
};
