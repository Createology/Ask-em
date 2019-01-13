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
import AwesomeAlert from 'react-native-awesome-alerts';

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
      password: "",
      showAlert: false
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
        } else {
          //alert(errorMessage);
          this.setState({
            username: ''
          })

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
        var scope = this;
        this.showAlert()
        setTimeout(function () { scope.hideAlert(); }, 2000);
      })
      .catch(error => {
        // catch is a must for every fetch
        console.warn('unsuccessfull signup')
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
    const { gender, country, age } = this.state;
    return (
      <Container>
        <ScrollView>
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
                    style={styles.inputs}
                    underlineColorAndroid="transparent"
                    ref={input => {
                      this.textInput1 = input;
                    }}
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
                    style={styles.inputs}
                    underlineColorAndroid="transparent"
                    ref={input => {
                      this.textInput2 = input;
                    }}
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
                    style={styles.inputs}
                    underlineColorAndroid="transparent"
                    ref={input => {
                      this.textInput3 = input;
                    }}
                    onChangeText={lastname => this.setState({ lastname })}
                  />
                  <Icon active name="person" />
                </Item>
              </View>

              <View style={[styles.inputContainer,{marginLeft: 18}]}>
                <Picker
                  selectedValue={gender}
                  style={{ height: 60, width: 150, marginTop: 20, color: '#586069' }}
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
                <Icon name="ios-arrow-dropdown-circle" style={{ color: "black", fontSize: 20, marginLeft: -90, marginTop: 22 }} />
              </View>

              <View style={[styles.inputContainer,{marginLeft: 18}]}>
                <Picker
                  selectedValue={country}
                  style={{ height: 55, width: 150, color: '#586069' }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ country: itemValue })
                  }
                >
                  <Picker.Item label="Amman" value="Amman" />
                  <Picker.Item label="Irbid" value="Irbid" />
                  <Picker.Item label="Zarqa" value="Zarqa" />
                  <Picker.Item label="Jarash" value="Jarash" />
                  <Picker.Item label="Mafraq" value="Mafraq" />
                  <Picker.Item label="Ajloun" value="Ajloun" />
                  <Picker.Item label="Balqaa" value="Balqaa" />
                  <Picker.Item label="Madaba" value="Madaba" />
                  <Picker.Item label="Karak" value="Karak" />
                  <Picker.Item label="Ma'an" value="Ma'an" />
                  <Picker.Item label="Tafeeleh" value="Tafeeleh" />
                  <Picker.Item label="Aqaba" value="Aqaba" />
                </Picker>
                <Icon name="ios-arrow-dropdown-circle" style={{ color: "black", fontSize: 20, marginLeft: -70 }} />
              </View>

              <View style={styles.inputContainer}>
                <DatePicker
                  style={{ width: 250, padding: 10, marginLeft: 8 }}
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
              <View style={styles.inputContainer}>
                <Item rounded>
                  <Input
                    placeholder="Username"
                    style={styles.inputs}
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    ref={input => {
                      this.textInput4 = input;
                    }}
                    onChangeText={username => this.setState({ username })}
                  />
                  <Icon active name="person" />
                </Item>
              </View>

              <View style={styles.inputContainer}>
                <Item rounded>
                  <Input
                    placeholder="E-mail"
                    style={styles.inputs}
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    ref={input => {
                      this.textInput5 = input;
                    }}
                    onChangeText={email => this.setState({ email })}
                  />
                  <Icon active name="md-mail" />
                </Item>
              </View>

              <View style={styles.inputContainer}>
                <Item rounded>
                  <Input
                    placeholder="Password"
                    style={styles.inputs}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    ref={input => {
                      this.textInput6 = input;
                    }}
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
          <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            title="Successfully Signed up"
            message="You can login now!"
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
    borderRadius: 30,
    marginLeft: 30,
  },
  signupBtn: {
    backgroundColor: "#080708"
  },
  signupText: {
    color: "white",
    textAlign: 'center',
    fontWeight: 'bold'
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
