import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Picker,
  ScrollView
} from "react-native";
import DatePicker from "react-native-datepicker";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Left,
  Icon
} from "native-base";
import * as firebase from "firebase";

const ip = require("../ip.json");
const firebaseConfig = {
  apiKey: "AIzaSyDc0MrwW4j1k-RP6Xg9eWA2n1DKvEf8pUU",
  authDomain: "askem-f1ff4.firebaseapp.com",
  databaseURL: "https://askem-f1ff4.firebaseio.com",
  projectId: "askem-f1ff4",
  storageBucket: "askem-f1ff4.appspot.com"
  //messagingSenderId: "145750228870"
};

firebase.initializeApp(firebaseConfig);

export default class Signup extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="add" style={{ fontSize: 30 }} />
  };
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      midname: "",
      lastname: "",
      gender: 0, // default value
      country: "Amman", // default value
      age: "1980-01-01", // default value
      username: "",
      email: "",
      password: ""
    };
  }

  onClickListener() {
    //this.setState({ showProgress: true });

    // this is to transform gender into number
    if (this.state.gender == "Female") {
      this.setState({ gender: 1 });
    } else {
      this.setState({ gender: 0 });
    }

    // this is to make a firebase account
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
      });

    // this is to make a mysql account
    fetch(`${ip}:3000/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstname,
        midname: this.state.midname,
        lastName: this.state.lastname,
        gender: this.state.gender,
        country: this.state.country,
        age: this.state.age,
        email: this.state.email
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        alert(`Please ${this.state.username} login now`);
      })
      .catch(error => {
        // catch is a must for every fetch
      });
  }

  render() {
    const { gender, country, age } = this.state;
    return (
      <Container>
        <ScrollView>
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
            <Text style={styles.headerStyle}>Sign Up</Text>
          </Header>
        </View>
          <View style={styles.container}>
            <Form>
              <View style={styles.inputContainer}>
                <Item rounded>
                  <Input
                    placeholder="First Name"
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    onChangeText={firstname => this.setState({ firstname })}
                  />
                  <Icon active name="person" />
                </Item>
              </View>

              <View style={styles.inputContainer}>
                <Item rounded>
                  <Input
                    placeholder="Middle Name"
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    onChangeText={midname => this.setState({ midname })}
                  />
                  <Icon active name="person" />
                </Item>
              </View>

              <View style={styles.inputContainer}>
                <Item rounded>
                  <Input
                    placeholder="Last Name"
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    onChangeText={lastname => this.setState({ lastname })}
                  />
                  <Icon active name="person" />
                </Item>
              </View>

              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={gender}
                  style={{ height: 60, width: 150, marginTop: 20 }}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemValue === "Male") {
                      this.setState({ gender: itemValue });
                    } else {
                      this.setState({ gender: itemValue });
                    }
                  }}
                >
                  <Picker.Item label="Male" value="0" />
                  <Picker.Item label="Female" value="1" />
                </Picker>
              </View>

              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={country}
                  style={{ height: 55, width: 200 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ country: itemValue })
                  }
                >
                  <Picker.Item label="Amman" value="Amman" />
                  <Picker.Item label="Irbid" value="Irbid" />
                </Picker>
              </View>

              <View style={styles.inputContainer}>
                <DatePicker
                  style={{ width: 250, padding: 10, marginLeft: 0 }}
                  date={age}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="1900-01-01"
                  maxDate="2050-01-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      left: -8,
                      top: 3.5,
                      marginLeft: 10
                    },
                    dateInput: {
                      marginLeft: 25,
                      borderRadius: 20,
                      width: 50,
                      height: 45,
                      borderWidth: 0
                    },
                    dateText: {
                      color: "grey",
                      fontSize: 17,
                      marginLeft: -40
                    }
                  }}
                  onDateChange={date => {
                    this.setState({ age: date });
                  }}
                />
              </View>
              {/* <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
              }}
              onDateChange={date => {
                this.setState({ age: date });
              }}
            /> */}

              <View style={styles.inputContainer}>
                <Item rounded>
                  <Input
                    placeholder="Username"
                    style={styles.inputs}
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    onChangeText={username => this.setState({ username })}
                  />
                  <Icon active name="person-pin" />
                </Item>
              </View>

              <View style={styles.inputContainer}>
                <Item rounded>
                  <Input
                    placeholder="E-mail"
                    style={styles.inputs}
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    onChangeText={email => this.setState({ email })}
                  />
                  <Icon active name="email" />
                </Item>
              </View>

              <View style={styles.inputContainer}>
                <Item rounded>
                  <Input
                    placeholder="Password"
                    style={styles.inputs}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    onChangeText={password => this.setState({ password })}
                  />
                  <Icon active name="lock" />
                </Item>
              </View>

              <TouchableHighlight
                style={[styles.buttonContainer, styles.signupBtn]}
                onPress={() => this.onClickListener()}
              >
                <Text style={styles.signupText}>Signup</Text>
              </TouchableHighlight>
            </Form>
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
    marginTop: 15,
    backgroundColor: "white",
    alignItems: "center"
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    width: 300
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    flex: 1,
    borderBottomColor: "#FFFFFF"
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
    marginTop: 30,
    width: 250,
    borderRadius: 30
  },
  signupBtn: {
    backgroundColor: "#E65100"
  },
  signupText: {
    color: "white"
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
