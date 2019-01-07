import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableHighlight
} from "react-native";
import {
  Container,
  Header,
  Text as Textbase,
  Left,
  Icon
} from "native-base";
const ip = require("../ip.json");

export default class Contact extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="library-books" style={{ fontSize: 30 }} />
  };
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      surveyDescription: ""
    };
  }

  handlePhoneNumberChange = number => {
    this.setState({ phoneNumber: number });
  };

  handleSurveyDescriptionChange = desription => {
    this.setState({ surveyDescription: desription });
  };

  handleOnPressSubmit = async () => {
    // [...arguments].forEach(element => {
    //   this.setState({ element });
    // });

    try {
      const value = await AsyncStorage.getItem("userID");
      if (value === null) {
        // We have data!!
        console.log("null", value);
      } else {
        var data = JSON.parse(value);
        console.warn("value2", data.user_id, data.userName);

        fetch(`${ip}:3000/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_user: data.user_id,
            username: data.userName,
            phonenumber: this.state.phoneNumber,
            survey_desc: this.state.surveyDescription
          })
        })
          .then(response => response.json())
          .then(res => {
            console.warn("res", res);
          })
          .catch(error => {
            // catch is a must for every fetch
            console.warn("Error:", error);
          });
      }
    } catch (error) {
      // Error retrieving data
      console.warn("Please fill out username and password", error);
    }
  };

  render() {
    const { phoneNumber, surveyDescription } = this.state;

    return (
      <Container>
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
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Phone Number"
              placeholderTextColor="gray"
              underlineColorAndroid="transparent"
              onChangeText={phoneNumber => {
                this.handlePhoneNumberChange(phoneNumber);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Issue Brief Description"
              placeholderTextColor="gray"
              onChangeText={surveyDescription => {
                this.handleSurveyDescriptionChange(surveyDescription);
              }}
            />
          </View>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.submitButton]}
            onPress={() => {
              this.handleOnPressSubmit(phoneNumber, surveyDescription);
            }}
          >
            <Text style={styles.sumitText}>
              <Icon name="send" style={{ color: "white"}} />
              Submit
            </Text>
          </TouchableHighlight>
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
    //backgroundColor: "#DCDCDC"
    backgroundColor: "white"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderBottomWidth: 1,
    width: 250,
    height: 50,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#E65100"
  },
  inputs: {
    height: 45,
    borderBottomColor: "#E65100",
    flex: 1,
    color: "black",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "center",
    fontSize :22
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 250,
    borderRadius: 30
  },
  submitButton: {
    backgroundColor: "#E65100",
    justifyContent:"center"
  },
  sumitText: {
    color: "white",
    alignItems: "center",
    fontSize :17
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    marginTop: -100,
    marginBottom: 100
  },
  wrong: {
    color: "red"
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
