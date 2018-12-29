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
  Picker
} from "react-native";
import DatePicker from "react-native-datepicker";
import {Icon} from 'react-native-elements';


export default class Signup extends Component {
  static navigationOptions = {
    drawerIcon : ({tintColor})=>(
        <Icon name='add' style={{fontSize : 30 }} />
    )
};
  constructor(props) {
    super(props);
    state = {
      firsname: "",
      midname: "",
      lastname: "",
      gender: "",
      country: "",
      region: "",
      age: "25",
      username: "",
      email: "",
      password: ""
    };
  }

  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  render() {
    return (
      <View style={styles.container}>
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
            selectedValue={() => this.state.gender}
            style={{ height: 60, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ gender: itemValue })
            }
          >
            <Picker.Item label="Male" value="0" />
            <Picker.Item label="Female" value="1" />
          </Picker>
        </View>

        <View>
          <Picker
            selectedValue={() => this.state.country}
            style={{ height: 55, width: 200 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ country: itemValue })
            }
          >
            <Picker.Item label="Amman" value="Amman" />
            <Picker.Item label="Irbid" value="Irbid" />
          </Picker>
        </View>

        <DatePicker
          style={{ height: 55, width: 150 }}
          date={date => this.state.age}
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
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={date => {
            this.setState({ age: date });
          }}
        />

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
          onPress={() => this.onClickListener("SignUp")}
        >
          <Text style={styles.signupText}>Signup</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
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
