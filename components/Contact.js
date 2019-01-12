import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  TouchableHighlight,
  ScrollView
} from "react-native";
import {
  Container,
  Header,
  Text as Textbase,
  Left,
  Icon
} from "native-base";
import { BorderlessButton } from "react-native-gesture-handler";
const ip = require("../ip.json");

export default class Contact extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="library-books" style={{ fontSize: 30 }} />
  };
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      surveyDescription: "",
      name: ''
    };
  }

  handlePhoneNumberChange = number => {
    this.setState({ phoneNumber: number });
  };

  handleSurveyDescriptionChange = desription => {
    this.setState({ surveyDescription: desription });
  };

  handleNameChange = name => {
    this.setState({ name: name });
  };

  handleOnPressSubmit = async () => {
    try {
      const value = await AsyncStorage.getItem("userID");
      if (value === null) {
        // We have data!!
        console.log("null", value);
      } else {
        var data = JSON.parse(value);

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
          <Header style={{ backgroundColor: "#037FBC" }}>
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
        <ScrollView>
        <Text style={{ color: 'black', textAlign: 'center', marginTop: 80, marginBottom: 40,fontSize: 20, color: '#080708' }}>Contact us to make your own survey</Text>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Name"
              placeholderTextColor="gray"
              underlineColorAndroid="transparent"
              onChangeText={name => {
                this.handleNameChange(name);
              }}
            />
          </View>
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
              multiline={true}
              numberOfLines={4}
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
              {/* <Icon name="send" style={{ color: "black", fontSize: 20, marginLeft: -8 }} /> */}
              <Text style={{ color: "#080708", fontSize: 18 }}>Submit</Text>
              
            </Text>
          </TouchableHighlight>
        </View>
        </ScrollView>
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
    backgroundColor: "white",
    marginBottom: 100
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    width: 250,
    height: 30,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#E65100",
    borderBottomWidth: 0.5,
    borderBottomColor: '#080708'
    //borderWidth: 0.5,
  },
  inputs: {
    height: 38,
    borderBottomColor: "#E65100",
    flex: 1,
    color: "black",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 17
  },
  buttonContainer: {
    height: 40,
    //flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 200,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#037FBC'//'#080708'//'#E5504B'
  },
  submitButton: {
    //backgroundColor: "#C5CCD0",
    justifyContent: "center"
  },
  sumitText: {
    color: "#080708",
    alignItems: "center",
    fontSize: 17,
    fontWeight: 'bold',
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
