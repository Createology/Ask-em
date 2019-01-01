import React, { Component } from 'react';
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
import { Container } from 'native-base';

export default class Payment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			phone: 0,
			message: ''
		};
	}

	requestPayment = () => {
		var cardDetails = {
			"card[number]": "4242424242424242",
			"card[exp_month]": "12",
			"card[exp_year]": "2019",
			"card[cvc]": "123"
		};
		var formBody = [];
		for (var property in cardDetails) {
			var encodedKey = encodeURIComponent(property);
			var encodedValue = encodeURIComponent(cardDetails[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		}
		formBody = formBody.join("&");
		console.warn(formBody)
		fetch('https://api.stripe.com/v1/tokens', {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer ' + 'pk_test_uxJh964nHbbD6S1vgxkUlnJ0'
			},
			body: `${formBody}`//"card%5Bnumber%5D=4242424242424242&card%5Bexp_month%5D=12&card%5Bexp_year%5D=2019&card%5Bcvc%5D=123"
		})
			.then(function (res) {
				console.warn('res', res)
				res.json()
			})
			.then((response) => {
				console.warn('response', response)
			})
			.catch(err => { console.warn("err", err) })
	};

	render() {
		return (
			<View style={styles.container}>
					<Button
						style={styles.button}
						title="Make a payment"
						onPress={this.requestPayment}
						disabled={this.state.isPaymentPending}
					/>
					<TextInput style={styles.input}/>
					<TextInput style={styles.input}/>
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 150,
	},
	button: {
		width: 80,
		hight: 20,
	},
  input: {
		flex: 4,
    borderBottomColor: "black",
    backgroundColor: "#FFFFFF",
    width: 150,
    height: 35,
    marginBottom: 20,
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1
  },
};