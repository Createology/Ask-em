import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  AsyncStorage,
  ScrollView
} from "react-native";
import {
  Container,
  Header,
  Text,
  Input as TextInput,
  Left,
  Icon as IconMenu
} from "native-base";
import myStripe from '../stripe.json'
import { Icon as Iconelements } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Payment extends Component {
  static navigationOptions = {
    drawerIcon: () => (
      <Iconelements name='payment' style={{ fontSize: 30 }} />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      "card[number]": "4242424242424242", //Default
      "card[exp_month]": "12", //Default
      "card[exp_year]": "2019", //Default
      "card[cvc]": "123", //Default
      userName: 'test', //logged in username
      token: {
        userName: "issa", //Default
        userToken: {}
      },
      money: '100', //cent //Default
      currency: 'usd', //Default
      showAlert: false
    };
  }

  checkUser = async () => {
    try {
      var value = await AsyncStorage.getItem("userID");
      if (value !== null) {
        // We have data!!
        var value = JSON.parse(value);
        this.setState({
          userName: value.userName
        });
      } else {
        console.warn('Please login!')
      }
    } catch (error) {
      // Error retrieving data
      console.warn('checkuser error', error)
    }
  }

  makeFormBody() {
    var cardDetails = {
      "card[number]": this.state["card[number]"],
      "card[exp_month]": this.state["card[exp_month]"],
      "card[exp_year]": this.state["card[exp_year]"],
      "card[cvc]": this.state["card[cvc]"]
    };
    var formBody = [];
    for (var property in cardDetails) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(cardDetails[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody = formBody.join("&");
  }

  requestPayment = async () => {    
    const scope = this;
    await this.checkUser()
    if (this.state.userName) {
      let formBody = scope.makeFormBody()
      fetch('https://api.stripe.com/v1/tokens', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + 'pk_test_uxJh964nHbbD6S1vgxkUlnJ0'
        },
        body: `${formBody}`
      })
        .then(function (res) {
          scope.setState({
            token: {
              userToken: res,
              userName: scope.state.userName
            }
          })
          res.json()
          scope.chargeCustomer()
        })
        .then(() => {
        })
        .catch(err => { console.warn("Token is not made, err:", err) })
    } else {
      console.warn('Please login!')
    }
  };

  makeChargeBody() {
    var cardDetails = {
      "amount": this.state.money,
      "currency": this.state.currency,
      "source": JSON.parse(this.state.token.userToken._bodyInit)['id']
    };
    var chargeBody = [];
    for (var property in cardDetails) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(cardDetails[property]);
      chargeBody.push(encodedKey + "=" + encodedValue);
    }
    return chargeBody = chargeBody.join("&");
  }

  chargeCustomer = async () => {
    const scope = this;
    await this.checkUser()
    if (this.state.userName) {
      let chargeBody = scope.makeChargeBody()
      fetch('https://api.stripe.com/v1/charges', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + `${myStripe[0].secret}`
        },
        body: `${chargeBody}`
      })
        .then(function (res) {
          res.json()
          if (res.status < 400) {
            scope.showAlert()
            setTimeout(function () { scope.hideAlert(); }, 2000);
          } else {
            alert('Error, contact admin!')
          }
        })
        .then(() => {
        })
        .catch(err => { console.warn("Charge is not made, err:", err) })
    } else {
      console.warn('Please login!')
    }
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
    const { showAlert } = this.state;
    if (showAlert) {
      return (
        <Container>
          <View style={{ height: '100%', backgroundColor: "white" }}>
            <Header style={{ backgroundColor: "#037FBC" }}>
              <Left>
                <IconMenu style={styles.icon} name='menu' onPress={() => { this.props.navigation.openDrawer() }} />
              </Left>
              <Text style={styles.headerStyle}>Payment</Text>
            </Header>

            <ScrollView>
              <View style={styles.card}>
                <View style={styles.inCard}>
                  <View style={styles.logo}>
                    <Icon.Button name="cc-visa" backgroundColor="#037FBC" color='#fdb827' size={25} />
                  </View>
                  <View style={styles.cardNumber}>
                    <Text style={styles.textNumber}>{this.state["card[number]"]}</Text>
                  </View>
                  <View style={styles.cardExpiration}>
                    <Text style={styles.textExpiration}>{this.state["card[exp_month]"]}/{this.state["card[exp_year]"]}</Text>
                  </View>
                </View>
              </View>

              <View style={{ height: 65 }}>
                <TextInput
                  style={styles.inputNumber}
                  placeholder='Account Number'
                  onChangeText={Number => {
                    this.setState({ 'card[number]': Number });
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputExp_month}
                  placeholder='Exp_month'
                  onChangeText={Exp_month => {
                    this.setState({ 'card[exp_month]': Exp_month });
                  }}
                />
                <TextInput style={styles.inputExp_year}
                  placeholder='Exp_year'
                  onChangeText={Exp_year => {
                    this.setState({ 'card[exp_year]': Exp_year });
                  }}
                />
                <TextInput
                  style={styles.inputCvc}
                  placeholder='CVC'
                  onChangeText={cvc => {
                    this.setState({ 'card[cvc]': cvc });
                  }}
                />
              </View>
              <View style={styles.inputContainerPay}>
                <TextInput
                  style={styles.inputMoney}
                  placeholder="Money Amount '$'"
                  onChangeText={money => {
                    this.setState({ 'money': `${money}` });
                  }}
                />
              </View>
              <View style={styles.pay}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.requestPayment}
                >
                  <Text style={styles.text}>Submit Payment</Text>
                </TouchableHighlight>
              </View>

              <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Payment Success"
                message="You have successfully paid!"
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
          </View>
        </Container>
      )
    } else {
      return (
        <Container>
          <View style={{ height: '100%', backgroundColor: "white" }}>
            <Header style={{ backgroundColor: "#037FBC" }}>
              <Left>
                <IconMenu style={styles.icon} name='menu' onPress={() => { this.props.navigation.openDrawer() }} />
              </Left>
              <Text style={styles.headerStyle}>Payment</Text>
            </Header>
            <ScrollView>
              <View style={styles.card}>
                <View style={styles.inCard}>
                  <View style={styles.logo}>
                    <Icon.Button name="cc-visa" backgroundColor="#037FBC" color='#fdb827' size={25} />
                  </View>
                  <View style={styles.cardNumber}>
                    <Text style={styles.textNumber}>{this.state["card[number]"]}</Text>
                  </View>
                  <View style={styles.cardExpiration}>
                    <Text style={styles.textExpiration}>{this.state["card[exp_month]"]}/{this.state["card[exp_year]"]}</Text>
                  </View>
                </View>
              </View>

              <View style={{ height: 65, marginLeft: 5, marginRight: 5 }}>
                <TextInput
                  placeholderTextColor="gray"
                  style={styles.inputNumber}
                  placeholder=' Account Number'
                  onChangeText={Number => {
                    this.setState({ 'card[number]': Number });
                  }}
                />
              </View>
              <View style={[styles.inputContainer, { marginLeft: 10 }]}>
                <TextInput
                  placeholderTextColor="gray"
                  style={styles.inputExp_month}
                  placeholder=' Exp_month'
                  onChangeText={Exp_month => {
                    this.setState({ 'card[exp_month]': Exp_month });
                  }}
                />
                <TextInput style={styles.inputExp_year}
                  placeholderTextColor="gray"
                  placeholder=' Exp_year'
                  onChangeText={Exp_year => {
                    this.setState({ 'card[exp_year]': Exp_year });
                  }}
                />
                <TextInput
                  placeholderTextColor="gray"
                  style={styles.inputCvc}
                  placeholder=' CVC'
                  onChangeText={cvc => {
                    this.setState({ 'card[cvc]': cvc });
                  }}
                />
              </View>
              <View style={styles.inputContainerPay}>
                <TextInput
                  placeholderTextColor="gray"
                  style={styles.inputMoney}
                  placeholder=" Money Amount '$'"
                  onChangeText={money => {
                    this.setState({ 'money': `${money}` });
                  }}
                />
              </View>
              <TouchableHighlight
                style={styles.button}
                onPress={this.requestPayment}
              >
                <Text style={styles.text}>Submit Payment</Text>
              </TouchableHighlight>
            </ScrollView>
          </View>
        </Container>
      )
    }
  }
}

const styles = {
  container: {
    flexDirection: "column",
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 150,
  },
  card: {
    margin: 40,
    marginBottom: 0,
    padding: 90,
    borderRadius: 20,
    borderColor: "#A3D0E6",
    borderWidth: 3,
    backgroundColor: 'white',
  },
  inCard: {
    margin: -85,
    padding: 90,
    borderRadius: 20,
    borderColor: "#A3D0E6",
    borderWidth: 1,
    backgroundColor: 'white',
  },
  logo: {
    marginLeft: -70,
    marginTop: -70,
    height: 20,
    width: 80,
    alignItems: 'center',
    borderRadius: 1,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: 'white',
  },
  cardNumber: {
    color: '#080708',
    height: 10,
    borderRadius: 10,
    borderColor: "#A3D0E6",
    marginBottom: -80,
    marginTop: 60,
    marginLeft: -45,
    backgroundColor: 'white',
  },
  cardExpiration: {
    color: '#080708',
    height: 10,
    width: 90,
    borderRadius: 10,
    borderColor: "#A3D0E6",
    marginBottom: -100,
    marginTop: 100,
    marginLeft: 130,
    backgroundColor: 'white',
  },
  textNumber: {
    color: '#080708',
    fontSize: 20
  },
  textExpiration: {
    marginTop: 10,
    color: '#080708',
    fontSize: 18
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "stretch",
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,

  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: '#037FBC',
    height: 40,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    width: 200,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#037FBC',
    marginLeft: '27%'
  },
  pay: {
    justifyContent: 'center',
    justifyItems: 'center',
    marginBottom: 150,
  },
  text: {
    flexDirection: "column",
    color: "white",
    //marginTop: 7,
    fontSize: 18,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    position: "relative",
    marginLeft: 5,
    marginRight: 10,
  },
  inputContainerPay: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 5,
    marginTop: 20,
    width: 170,
  },
  input: {
    height: 45,
    marginBottom: 10,
    width: 50,
    borderRadius: 30
  },
  inputNumber: {
    flex: 1,
    marginTop: 15,
    borderBottomColor: "black",
    backgroundColor: "#FFFFFF",
    margin: 10,
    alignItems: "center",
    //borderWidth: 1,
    //borderRadius: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  inputExp_month: {
    flex: 3,
    borderBottomColor: "black",
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 40,
    alignItems: "center",
    // borderWidth: 1,
    // borderRadius: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  inputExp_year: {
    flex: 5,
    borderBottomColor: "black",
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 40,
    alignItems: "center",
    //borderWidth: 1,
    //borderRadius: 30,
    marginLeft: 5,
    marginRight: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  inputCvc: {
    flex: 3,
    borderBottomColor: "black",
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 40,
    alignItems: "center",
    //borderWidth: 1,
    marginLeft: 1,
    //borderRadius: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  inputMoney: {
    flex: 3,
    borderBottomColor: "black",
    backgroundColor: "#FFFFFF",
    width: 80,
    height: 40,
    alignItems: "center",
    //borderWidth: 2,
    marginLeft: 1,
    marginTop: 0,
    //borderRadius: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  avatar: {
    width: 400,
    height: 200,
    //borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: "center",
    position: "relative",
    marginTop: 10
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
};