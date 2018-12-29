import React, { Component } from "react";
import {
  StyleSheet,
  SectionList,
  Text,
  View,
  Modal,
  TouchableHighlight
} from "react-native";
import SurveyModal from "./SurveyModal";
const ip = require("../ip.json");
// import IP from 'ip';
// ip = IP.mask()

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "wait",
      user: "",
      surveysNames: [],
      ownSurveysNames: [],
      modalVisible: false,
      selectedSurvey: null
    };
  }

  componentDidMount() {
    // change this eveytime you have a new internet connection using this command in terminal: ifconfig |grep inet
    // copy the mask ip
    fetch(`${ip}:3000/isa/`, {
      method: "GET"

    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.setState({
          data: res
        });
      })
      .done();
  }

  setUser() {
    //search for user session
    fetch(`${ip}:3000/user/`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.setState({
          user: res
        });
      })
      .then(() => {
        //bring user's voted surveys
        fetch(`${ip}:3000/surveys/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ user: this.state.user })
        })
          .then(response => {
            return response.json();
          })
          .then(res => {
            this.setState({
              surveysNames: res
            });
          })
          .then(() => {
            //bring user's own surveys
            fetch(`${ip}:3000/mysurveys/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ user: this.state.user })
            })
              .then(response => {
                return response.json();
              })
              .then(res => {
                this.setState({
                  ownSurveysNames: res
                });
              })
              .done();
          });
      });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  selectedSurveyFunc(item) {
    this.setState({ selectedSurvey: item });
  }

  render() {
    const {
      data: { dark },
      modalVisible,
      selectedSurvey
    } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}> In Account Component! </Text>
        <Text style={styles.text}>Dark from server.js: {dark}</Text>
        <SectionList
          sections={[
            { title: "Your surveys", data: ["Devin"] },
            { title: "Surveys you filled", data: ["Jackson", "John", "Julie"] }
          ]}
          renderItem={({ item }) => {
            return (
              <TouchableHighlight
                onPress={() => {
                  this.selectedSurveyFunc.bind(this)(item);
                  this.setModalVisible.bind(this)(true);
                }}
              >
                <Text style={styles.item}>{item}</Text>
              </TouchableHighlight>
            );
          }}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
        <SurveyModal
          showHandler={this.setModalVisible.bind(this)}
          visibility={modalVisible}
          selectedSurvey={selectedSurvey}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  text: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: "left"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: "left"
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 300,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
    textAlign: "left"
  }
});
