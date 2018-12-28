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

var ip = require("../ip.json");

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      midname: "",
      lastname: "",
      gender: 0,
      country: "Amman",
      age: "1980-01-01",
      username: "",
      email: "",
      password: ""
    };
  }

  onClickListener() {
    //this.setState({ showProgress: true });
    
    if (this.state.gender == "Female") {
      this.setState({ gender: 1 });
    } else {
        this.setState({ gender: 0 });
    }
    fetch(`${ip}:3000/signup`, {
      method: "POST",
      headers: {
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
        console.warn('catch', error);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="First Name"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={firstname => this.setState({ firstname })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Midlle name"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={midname => this.setState({ midname })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Last name"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={lastname => this.setState({ lastname })}
            />
          </View>

          <View>
            <Picker
              selectedValue={this.state.gender}
              style={{ height: 60, width: 150, marginTop: -20 }}
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

          <View>
            <Picker
              selectedValue={this.state.country}
              style={{ height: 55, width: 200, marginTop: -20 }}
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
              date={this.state.age}
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
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Username"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={username => this.setState({ username })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.signupBtn]}
            onPress={() => this.onClickListener()}
          >
            <Text style={styles.signupText}>Signup</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "white"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
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
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  signupBtn: {
    backgroundColor: "#00b5ec"
  },
  signupText: {
    color: "white"
  }
});
