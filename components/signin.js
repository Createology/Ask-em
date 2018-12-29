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
  AsyncStorage
} from "react-native";
import {Icon} from 'react-native-elements';


const ip = require("../ip.json");

export default class Signin extends Component {
  static navigationOptions = {
    drawerIcon : ({tintColor})=>(
        <Icon name='star' style={{fontSize : 40 }} />
    )
};
  constructor(props) {
    super(props);
    this.state = {
      username: "DEFAULT",
      password: "DEFAULT",
      loggedin: "Login"
    };
  }

  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem("userID");
      if (value !== null) {
        // We have data!!
        const token = JSON.parse(value);
        this.setState({
          loggedin: `Welcome ${token.userName}!`
        });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  onLoginPressed() {
    if (this.state.username && this.state.password) {
      this.onLogin();
    } else {
      alert("Please fill username and password!");
    }
  }

  onLogin() {
    //this.setState({ showProgress: true });
    this.setState({
      loggedin: `You will recieve your data soon, please wait!`
    });

    fetch(`${ip}:3000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (typeof response === "object") {
          //Handle success
          const accessToken = {
            user_id: response.userId,
            userName: response.username,
            userEmail: response.userEmail
          };

          this.textInput1.clear()
          this.textInput2.clear()
          this.setState({
            username: '',
            password: ''
          });

          //On success we will store the access_token in the AsyncStorage
          this.storeToken(accessToken);

          this.setState({
            loggedin: ``
          });

          this.props.navigation.navigate('Home', {
            accessToken: ` ${accessToken.userName} `
          })
        } else {
          //Handle error
          let error = response;
          console.warn("response error", response.status);
        }
      })
      .catch(error => {
        // catch is a must for every fetch
        console.warn("Wrong username or password");
      });
  }

  storeToken = async accessToken => {
    try {
      await AsyncStorage.setItem("userID", JSON.stringify(accessToken));
    } catch (error) {
      console.warn("storeToken error:", error);
    }
  };

  checkLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem("userID");
      if (value === null) {
        // We have data!!
        this.onLoginPressed();
      } else {
        console.warn("You are logged in!");
      }
    } catch (error) {
      // Error retrieving data
      console.warn("Please fill out username and password");
    }
  };

  logoutBottun = async () => {
    try {
      const value = await AsyncStorage.removeItem("userID");
      if (value !== null) {
        // We have data!!
        console.warn("You are not Logged out, try again");
      } else {
        this.setState({
          loggedin: `Login`
        });
        this.props.navigation.navigate('Home', {
          accessToken: ''
      })
      }
    } catch (error) {
      // Error retrieving data
      console.warn("error", error);
    }
  };

  render() {
    const { loggedin } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{loggedin}</Text>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="username"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            ref={input => { this.textInput1 = input }}
            onChangeText={username => this.setState({ username })}
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
            ref={input => { this.textInput2 = input }}
            onChangeText={password => this.setState({ password })}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.checkLoggedIn()}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.logoutBottun()}
        >
          <Text>Logout</Text>
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
    //backgroundColor: "#DCDCDC"
    backgroundColor: "white"
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
    marginBottom: 10,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    marginTop: -100,
    marginBottom: 100
  }
});
