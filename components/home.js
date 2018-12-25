import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SectionList,
  ScrollView
} from "react-native";
import { Container } from "native-base";

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
      selectedSurvey: null
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  selectedSurvey(item) {
    this.setState({ selectedSurvey: item });
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to ASKem! </Text>
          <Text style={styles.welcome}>This is from askem/server.js:</Text>
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
        />

        <View>
          <SectionList
            sections={[
              { title: "Section1", data: ["Devin"] },
              { title: "Section2", data: ["Jackson", "John", "Julie"] }
            ]}
            renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </Container>
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
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  button: {
    color: "#000",
    margin: 10,
    fontSize: 30,
    textAlign: "left"
  },
  footerTab: {
    backgroundColor: "#FFF",
    borderStyle: "solid",
    borderWidth: 0,
    borderTopWidth: 1,
    borderColor: "grey"
  },
  icon: {
    margin: 40,
    color: "#FFF"
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
    textAlign: "center"
  }
});
