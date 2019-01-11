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
import { connect } from "react-redux";
import { loggedIn } from "../store/actions/index";
import {
  Container,
  Header,
  Title,
  Content,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Form,
  Spinner,
  Icon
} from "native-base";
const ip = require("../ip.json");

class Signin extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="star" style={{ fontSize: 30 }} />
  };
  constructor(props) {
    super(props);
    this.state = {
      password: "DEFAULT",
      loggedin: "Login", // custormer notification
      wrong: "", // if wrong username or password
      loggedout: '',
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

  onLoginPressed = async () => {
    try {
      // check if logged in
      const value = await AsyncStorage.getItem("userID");
      if (value === null) {
        if (this.state.username && this.state.password) {
          this.onLogin();
        } else {
          alert("Please fill username and password!");
        }
      } else {
        console.warn("You are logged in!");
      }
    } catch (error) {
      // Error retrieving data
      console.warn("error", error);
    }
  };

  onLogin() {
    // notify user about loging in
    this.setState({
      loggedin: `You will recieve your data soon, please wait!`
    });

    fetch(`${ip}:3000/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
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
          // accessToken is an object to store inside asyncStorage
          const accessToken = {
            user_id: response.userId,
            userName: response.username,
            userEmail: response.userEmail
          };

          // clear inputTexts
          this.textInput1.clear();
          this.textInput2.clear();

          // clear username and password states
          this.setState({
            username: "",
            password: ""
          });

          // save username into global
          this.props.onAddUsername(accessToken.userName);

          // on success we will store the access_token in the AsyncStorage
          this.storeToken(accessToken);

          // no need to notify anything after loggin
          this.setState({
            loggedin: `Welcome ${this.props.username}`
          });

          // navigate to Home after login
          this.props.navigation.navigate("Home", {
            accessToken: ` ${accessToken.userName} `
          });
        } else {
          //Handle error
          let error = response;
          console.warn("response error", response.status);
        }
      })
      .catch(error => {
        // catch is a must for every fetch
        this.setState({
          wrong: "Wrong username or password",
          loggedin: "Login"
        });
      });
  }

  storeToken = async accessToken => {
    try {
      await AsyncStorage.setItem("userID", JSON.stringify(accessToken));
    } catch (error) {
      console.warn("storeToken error:", error);
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
          loggedIn: 'Login',
          loggedout: `You are logged out`
        });
        // save username into global
        this.props.onAddUsername("");

        // redirect to home screen
        this.props.navigation.navigate("Home", {
          accessToken: ""
        });
      }
    } catch (error) {
      // Error retrieving data
      console.warn("error", error);
    }
  };

  render() {
    const { loggedin } = this.state;
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
            <Text style={styles.headerStyle}>Sign In</Text>
          </Header>
        </View>
        <View style={styles.container}>
          {this.state.loggedin !==
            "You will recieve your data soon, please wait!" ? (
              <Text style={styles.welcome}>{""}</Text>
            ) : (
              <Spinner color="blue" />
            )}
          <View style={styles.inputContainer}>
            <Icon active name="md-person" />
            <TextInput
              placeholderTextColor='black'
              placeholder="Username"
              style={styles.inputs}
              underlineColorAndroid="transparent"
              ref={input => {
                this.textInput1 = input;
              }}
              onChangeText={username => {
                this.setState({ username });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon active name="lock" />
            <TextInput
              placeholderTextColor='black'
              placeholder="Password"
              style={styles.inputs}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              ref={input => {
                this.textInput2 = input;
              }}
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.onLoginPressed()}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>

          <Text style={styles.wrong}>{this.state.wrong}</Text>

          {this.state.loggedin !== "Login" ? (
            <TouchableHighlight
              style={[styles.buttonContainer, styles.logoutButton]}
              onPress={() => this.logoutBottun()}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableHighlight>
          ) : (
              <Text>{this.state.loggedout}</Text>
            )}
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
    borderRadius: 50,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    color: "#080708",
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
    width: 200,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#080708"
  },
  logoutButton: {
    marginTop: -20,
    backgroundColor: "white"
  },
  loginText: {
    color: "white",
    fontWeight: 'bold'
  },
  logoutText: {
    color: "black"
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

// global states
const mapStateToProps = state => {
  return {
    username: state.username.username
  };
};

// global functions
const mapDispatchToProps = dispatch => {
  return {
    onAddUsername: username => dispatch(loggedIn(username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
