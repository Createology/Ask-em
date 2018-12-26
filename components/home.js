import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Container } from "native-base";

import Header from "./Header";
import SurveyList from "./SurveyList";
import SurveyModal from "./SurveyModal";


export default class Home extends Component {
  static navigationOptions = {
    title: "Home"
  };

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      names: [{ key: "Isa" }, { key: "Maram" }, { key: "Anagreh" }],
      sections: [
        { title: "Section1", data: ["Devin"] },
        { title: "Section2", data: ["John", "Julie"] }
      ],
      modalVisible: false,
      selectedSurvey: null,
      surveyName: "",
      surveyDescription: "",
      surveyTargetAudience: ""
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  selectedSurvey(item) {
    this.setState({ selectedSurvey: item });
  }

  onChangeSurveyName = name => {
    this.setState({
      surveyName: name
    });
  };

  onChangeSurveyDescription(description) {
    this.setState({
      surveyDescription: description
    });
  }

  onChangeSurveyTargetAudience(targetAudience) {
    this.setState({
      surveyTargetAudience: targetAudience
    });
  }

  onPressSubmitModal(surveyName, surveyDescription, surveyTargetAudience) {
    [...arguments].forEach(element => {
      this.setState({ element });
    });
    console.warn("surveyName: " + surveyName);
    console.warn("surveyDescription: " + surveyDescription);
    console.warn("surveyTargetAudience: " + surveyTargetAudience);
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Header />
            </View>
            <View style={styles.title}>
              <Text style={styles.welcome}>Welcome to ASKem! </Text>
            </View>

            <SurveyList
              names={this.state.names}
              selectedSurvey={this.selectedSurvey.bind(this)}
              showHandler={this.setModalVisible.bind(this)}
            />
            <SurveyModal
              showHandler={this.setModalVisible.bind(this)}
              visibility={this.state.modalVisible}
              selectedSurvey={this.state.selectedSurvey}
              submitModalHandler={this.onPressSubmitModal.bind(this)}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    top: 0
  },
  header: {
    position: "absolute",
    flex: 1,
    flexDirection: "column",
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    width: 420,
    backgroundColor: "#5E5E5E"
  },
  title: {
    marginTop: 65
  },
  welcome: {
    fontSize: 20,
    textAlign: "center"
  },
  button: {
    color: "#000",
    margin: 10,
    fontSize: 30,
    textAlign: "left"
  }
});
