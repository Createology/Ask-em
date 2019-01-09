import React, { Component } from "react";
import {
  Modal,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet
} from "react-native";
import { Container, Header, Text, Left, Icon, Right } from "native-base";

export default class AboutUs extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="star" style={{ fontSize: 30 }} />
  };
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.header}>
          <Header style={{ backgroundColor: "#E65100" }}>
            <Left>
              <Icon
                style={styles.icon}
                name="menu"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            </Left>
            <Text style={styles.headerStyle}>Contact Us</Text>
          </Header>
        </View>
        <View style={{ marginTop: 22 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <Text style={styles.textTitle}>
                  Ask'Em is a smart mobile app that uses machine learning to
                  achieve customers satisfaction. this app will give you the
                  opportunity to start your own business on a sure-footed, by
                  giving you the chance to ask a sample of people related to
                  your cause about your future plans, and here is our app role
                  comes when using it's brain to analyze and give a decision
                  that will help you to come up with your final decision whether
                  to go for it or not.
                </Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Right>
                    <Text>Back</Text>
                  </Right>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <View style={{ backgroundColor: "white" }}>
            <Text>
              Ask'Em is a smart mobile app that uses machine learning to achieve
              customers satisfaction. this app will give you the opportunity to
              start your own business on a sure-footed.
            </Text>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Right>
                <Text style={{color:"red"}}>See more>>></Text>
              </Right>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white"
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
  },
  headerStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    textAlign: "left",
    color: "white",
    fontSize: 22
  },
  icon: {
    color: "white",
    margin: 10,
    fontSize: 40,
    textAlign: "left"
  }
});

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     flexDirection: "column",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     backgroundColor: "white",
// //     top: 0
// //   },
// //   headerStyle: {
// //     flex: 1,
// //     flexDirection: "column",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     textAlignVertical: "center",
// //     textAlign: "left",
// //     color: "white",
// //     fontSize: 22
// //   },
// //   icon: {
// //     color: "white",
// //     margin: 10,
// //     fontSize: 30,
// //     textAlign: "left"
// //   }
// // });
