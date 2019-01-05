import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput ,Alert, AsyncStorage } from "react-native";
import { Container, Header, Text as Textbase, Left, Icon , Button } from "native-base";
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
        console.log('null', value)
      } else { 

        var data = JSON.parse(value);
        console.warn("value2", data.user_id,data.userName);

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
            console.warn('res', res);
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
      <View>
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

        <View style={styles.textContainer}>
          <TextInput
            style={styles.input1}            
            placeholder="Phone Number"
            placeholderTextColor="white"
            onChangeText={phoneNumber => {
              this.handlePhoneNumberChange(phoneNumber);
            }}
          />
          <TextInput
            style={styles.input2}
            placeholder="Issue Brief Description"
            placeholderTextColor="white"
            onChangeText={surveyDescription => {
              this.handleSurveyDescriptionChange(surveyDescription);
            }}
          />

          <View style={styles.buttonRow}>
            <View style={styles.buttonSend}>
              <Button style={{ backgroundColor: "#E65100" }}
                primary
                full
                block
                onPress={() => {
                  this.handleOnPressSubmit(phoneNumber, surveyDescription);
                }}
              >
                {/* need to changeicon color */}
                <Icon name="send" style={{ color: "white" }} />
                <Textbase>Submit</Textbase>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    textAlignVertical: "center",
    textAlign: "center",
    marginBottom: 40
  },
  input1: {
    height: 65,
    backgroundColor: "#ffc0cb",
    margin: 30,
    color: "white",
    fontSize: 23,
    width: "80%"
  },
  input2: {
    height: 120,
    backgroundColor: "#ffc0cb",
    margin: 30,
    color: "white",
    fontSize: 23,
    width: "80%"
  },
  textContainer: {
    width: "100%"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    textAlignVertical: "center",
    width: "100%",
    marginTop: 20
  },

  buttonSend: {
    width: "45%",
    textAlignVertical: "center",
    justifyContent: "center"
  },
  icon: {
    color: "white",
    margin: 10,
    fontSize: 40,
    textAlign: "left"
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
  header: {
    marginBottom: "15%"
  },
  text: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: "left"
  },
  icon: {
    color: "white",
    margin: 10,
    fontSize: 40,
    textAlign: "left"
  }
});
