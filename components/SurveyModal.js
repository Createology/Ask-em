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
import Question from "./Question";
import AwesomeAlert from 'react-native-awesome-alerts';

const ip = require("../ip.json");

export default class SurveyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEducation: "primary",
      selectedMarital: "single",
      allSurveysInfo: [],
      showToast: false,
      questions: [],
      questionsIDs: [],
      smartQuestions: [],
      allChoicesOfQuestion: [],
      surveyID: "",
      clicked: "",
      input: '',
      ids: [],
      showAlert: false
    };
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.surveyID !== nextProps.surveyID) {
      await this.setState({
        surveyID: nextProps.surveyID
      });
      this.getQuestions(this.props.surveyID);
      this.getSmartQuestions(this.props.surveyID);
    }
  }

  getQuestions(surveyID) {
    fetch(`${ip}:3000/question/dumb/get`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        surveyID: surveyID
      })
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.setState({
          questions: res
        });
      })
      .then(() => {
        this.setState({
          questionsIDs: this.state.questions.map(item => item.id)
        });
      })
      .done(() => {
      });
  }

  getSmartQuestions(surveyID) {
    var scope = this;
    fetch(`${ip}:3000/question/smart/get`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        surveyID: surveyID
      })
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.setState({
          smartQuestions: res
        });
        var idsState = scope.state.ids;
        for (var i = 0; i < res.length; i++) {
          idsState.push(res[i].id)
          this.setState({
            [res[i].id]: '',
            ids: idsState
          });
        }
      })
      .done(() => {
      });
  }

  sendSmartAnswers() {
    var sendBody = [];
    const scope = this;
    for (var i = 0; i < this.state.ids.length; i++) {
      var id = this.state.ids[i]
      sendBody.push({
        smartanswer: this.state[id],
        Truth: 1,
        id_smartquestions: this.state.ids[i],
        id_users: this.props.userID,
        id_surveys: this.props.surveyID
      })
    }
    fetch(`${ip}:3000/answer/smart/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sendBody)
    })
      .then(response => {
        this.showAlert()
        setTimeout(function () { scope.hideAlert(); }, 2000);
        setTimeout(function () { scope.props.showHandler(false) }, 500);
        response.json();
      })
      .then(res => {
      })
      .done(() => {
      });
  }

  showAlert = () => {
		this.setState({
			showAlert: true
		});
	};

	hideAlert = () => {
		this.setState({
			showAlert: false
		});
	};

  render() {
    const {
      selectedEducation,
      selectedMarital,
      clicked,
      surveyID,
      allChoicesOfQuestion,
      smartQuestions,
      questionsIDs,
      questions,
      showAlert
    } = this.state;
    return (
      <Root>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.visibility}
          onRequestClose={() => { }}
        >
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.modalContainer}>
                <Text style={styles.textTitle}>
                  {this.props.surveyName.toUpperCase()}
                </Text>
                <Text style={styles.textInfo}>
                  Please fill the required info
                </Text>

                <Form>
                  <View style={styles.surveyInfo}>
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
                        <Text
                          note
                          numberOfLines={8}
                          style={styles.surveyValues}
                        >
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
                        <Text
                          note
                          numberOfLines={8}
                          style={styles.surveyValues}
                        >
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
                        <Text
                          note
                          numberOfLines={8}
                          style={styles.surveyValues}
                        >
                          {this.props.surveyCategory}
                        </Text>
                      </Right>
                    </View>
                  </View>
                  {/*  */}
                  <View style={{ flexDirection: "row" }}>
                    <Left style={{ flex: 1 }}>
                      <Text style={{ color: "black", fontSize: 16 }}>
                        Education Level:{" "}
                      </Text>
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
                      <Text style={{ color: "black", fontSize: 16 }}>
                        Marital Status:{" "}
                      </Text>
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
                    <IconAwesome
                      name="sort-down"
                      size={20}
                      color="white"
                      style={[{ right: 18, top: 4, position: "absolute" }]}
                    />
                  </View>

                  {Array.isArray(questions) &&
                    questions.map(({ id, question }, index) => (
                      <View style={{ flexDirection: "row" }} key={id}>
                        <Left style={{ flex: 1 }}>
                          <Text
                            note
                            numberOfLines={2}
                            style={styles.textScreenElements}
                          >
                            {question} {id}
                          </Text>
                        </Left>
                        <Right style={{ flex: 1 }}>
                          <Question questionID={id} key={id} />
                        </Right>
                      </View>
                    ))}

                  <Separator bordered>
                  </Separator>

                  {Array.isArray(this.state.smartQuestions) &&
                    this.state.smartQuestions.map(({ id, question }) => (
                      <View style={{ flexDirection: "row" }} key={id}>
                        <Left style={{ flex: 1 }}>
                          <Text
                            note
                            numberOfLines={2}
                            style={styles.textScreenElements}
                          >
                            {question}
                          </Text>
                        </Left>
                        <Right style={{ flex: 1 }}>
                          <Item>
                            <Input
                              underline
                              multiline
                              onChangeText={text => {
                                this.setState({
                                  [id]: text
                                })
                              }}
                              style={{ color: "#E65100" }}
                            />
                          </Item>
                        </Right>
                      </View>
                    ))}
                </Form>

                <View style={styles.buttonRow}>
                  <View style={styles.buttonSend}>
                    <Button
                      success
                      full
                      block
                      onPress={() => {
                        this.sendSmartAnswers()
                        // this.props.submitModalHandler(
                        //   selectedEducation,
                        //   selectedMarital
                        // );
                      }}
                    >
                      {/* need to changeicon color */}
                      <Icon name="send" style={{ color: "white" }} />
                      <Textbase>Submit</Textbase>
                    </Button>
                  </View>

                  <View style={styles.buttonCancel}>
                    <Button
                      warning
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
          </ScrollView>
          <AwesomeAlert
							show={showAlert}
							showProgress={false}
							title="Payment Success"
							message="You have successfully paid!"
							closeOnTouchOutside={true}
							closeOnHardwareBackPress={true}
							showCancelButton={false}
							showConfirmButton={false}
							progressSize='50'
							progressColor='green'
							overlayStyle={{
								padding: 50,
							}}
							contentContainerStyle={{
								padding: 50,
							}}
						/>
        </Modal>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 40
  },
  textTitle: {
    fontSize: 25,
    textAlignVertical: "center",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 40,
    fontFamily: "Roboto",
    color: "#E65100"
  },
  textScreenElements: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "black"
  },
  textInfo: {
    color: "black",
    fontSize: 25,
    textAlignVertical: "center",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "Roboto"
  },
  surveyValues: {
    textAlign: "left",
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#E65100"
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
    width: "90%"
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
  },
  surveyInfo: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E65100",
    padding: 10,
    borderStyle: "solid",
    marginBottom: 10
  }
});

SurveyModal.propTypes = {
  showHandler: PropTypes.func,
  visibility: PropTypes.bool,
  selectedSurvey: PropTypes.string
};
