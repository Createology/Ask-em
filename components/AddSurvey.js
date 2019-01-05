import React, { Component } from "react";
import {
	StyleSheet,
	SectionList,
	Text,
	View,
	Modal,
	TouchableHighlight,
	AsyncStorage,
	ScrollView,
	TextInput,
	Image,
	TouchableOpacity
} from "react-native";
import {
	Container,
	Header,
	Content,
	Button,
	Text as Textbase,
	Item,
	Icon as IconMenu,
	Input,
	Form,
	Label,
	Picker,
	Left,
	Right,
	Textarea,
	Toast
} from "native-base";
import { Icon } from 'react-native-elements';

import SurveyListThumbnails from "./SurveyListThumbnails";
import { Col, Row, Grid } from "react-native-easy-grid";

const ip = require("../ip.json");

export default class AddSurvey extends Component {
	static navigationOptions = {
		drawerIcon: ({ tintColor }) => (
			<Icon name="library-books" style={{ fontSize: 30 }} />
		)
	};

	constructor(props) {
		super(props);
		this.state = {
			surveyName: 'test',
			category: '0',
			description: 'test',
			activated: '1',
			newQuestion: 'question',
			surveyQuestions: [],
			smartQuestion: 'smartQuestion',
			smartQuestions: [],
			newAnswer: 'answer',
			surveyAnswers: [],
			smartAnswer: 'smartAnswer',
			smartAnswers: [],
			surveyID: '',
			user_id: '',
			questionID: '',
			answeredQuestionID: '',
			answerUserID: '',
			answerID: '',
		};
	}

	onAddSurvey = async () => {
		try {
			const value = await AsyncStorage.getItem("userID");
			if (value !== null) {
				const token = JSON.parse(value);
				this.setState({
					user_id: ` ${token.user_id} `
				});
				var fetchBody = {
					id_users: this.state.user_id,
					survey_name: this.state.surveyName,
					category: this.state.category,
					description: this.state.description,
					activated: this.state.activated
				}
				console.warn(fetchBody)
				fetch(`${ip}:3000/surveys/save`, {
					method: "POST",
					headers: {
						'Accept': 'application/json',
						"Content-Type": "application/json"
					},
					body: JSON.stringify(fetchBody)
				})
					.then(response => response.json())
					.then(res => {
						console.warn("res", res)
						alert('survey is done')
						this.setState({ surveyID: res.insertId });
						//console.warn('add survey', res)
					})
					.done();
			}
		} catch (error) {
			console.warn("error from the token mysurveys", error);
		}
	};

	saveSmartQuestion = async () => {
		if (this.state.surveyID) {
			var questionBody = {
				id_surveys: `${this.state.surveyID}`,
				id_users: this.state.user_id,
				question: this.state.smartQuestion
			}
			fetch(`${ip}:3000/question/smart/add/`, {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					"Content-Type": "application/json"
				},
				body: JSON.stringify(questionBody)
			})
				.then(response => {
					response.json()
					this.setState({ questionID: JSON.parse(response["_bodyInit"])['insertId']  });
				})
				.then((res) => {					
					this.onAddSmartQuestion()
				})
				.done();
		} else {
			console.warn('please prepare survey')
		}
	};
	
	saveSmartAnswer = async () => {
		if (this.state.questionID) {
			var answerBody = {
				smartanswer: this.state.smartAnswer,
				id_question: this.state.questionID,
				id_users: this.state.user_id,
				id_surveys: this.state.surveyID
			}
			fetch(`${ip}:3000/answer/smart/add`, {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					"Content-Type": "application/json"
				},
				body: JSON.stringify(answerBody)
			})
				.then(response => response.json())
				.then((res) => {
					this.setState({ answerID: res });
					this.onAddSmartAnswer()
				})
				.done();
		} else {
			console.warn('please prepare survey')
		}
	};


	onAddQuestion = () => {
		var myNewQuestion = this.state.newQuestion
		var prevQuestions = this.state.surveyQuestions;
		prevQuestions.push(myNewQuestion);
		this.setState({ questions: prevQuestions })
	}

	onAddAnswer = () => {
		var myNewAnswer = this.state.newAnswer
		var prevAnswers = this.state.surveyAnswers;
		prevAnswers.push(myNewAnswer);
		this.setState({ questions: prevAnswers })
	}

	onAddSmartQuestion = () => {
		var myNewQuestion = this.state.smartQuestion
		var prevQuestions = this.state.smartQuestions;
		prevQuestions.push(myNewQuestion);
		this.setState({ smartQuestions: prevQuestions })
	}

	onAddSmartAnswer = () => {
		var myNewAnswer = this.state.smartAnswer
		var prevAnswers = this.state.smartAnswers;
		prevAnswers.push(myNewAnswer);
		this.setState({ smartAnswers: prevAnswers })
	}

	render() {
		return (
			<Container>
				{/* Header */}
				<Header style={{ backgroundColor: "#E65100" }}>
					<Left>
						<IconMenu
							style={styles.icon}
							name="menu"
							onPress={() => {
								this.props.navigation.openDrawer();
							}}
						/>
					</Left>
					<Text style={styles.headerStyle}>AddSurvey</Text>
				</Header>

				{/* Begin real render */}
				<ScrollView>
					<View style={{ flex: 1 }}>

						{/* Survey info */}
						<TextInput
							style={styles.inputs}
							placeholder="Survey name"
							underlineColorAndroid="transparent"
							ref={input => {
								this.textInput = input;
							}}
							onChangeText={surveyName => this.setState({ surveyName })}
						/>
						<TextInput
							style={styles.inputs}
							placeholder="Description"
							underlineColorAndroid="transparent"
							ref={input => {
								this.textInput = input;
							}}
							onChangeText={description => this.setState({ description })}
						/>
						<Picker
							note
							mode="dropdown"
							style={{ width: undefined }}
							selectedValue={this.state.activated}
							onValueChange={async (item, index) => {
								this.setState({
									activated: item
								});
							}}
						>
							<Picker.Item
								label="ON"
								value="1"
								style={styles.textScreenElements}
							/>
							<Picker.Item
								label="OFF"
								value="0"
								style={styles.textScreenElements}
							/>
						</Picker>
						<Picker
							note
							mode="dropdown"
							style={{ width: undefined }}
							selectedValue={this.state.category}
							onValueChange={async (item, index) => {
								this.setState({
									category: item
								});
							}}
						>
							<Picker.Item
								label="Politics"
								value="0"
								style={styles.textScreenElements}
							/>
							<Picker.Item
								label="Community"
								value="1"
								style={styles.textScreenElements}
							/>
							<Picker.Item
								label="Economy"
								value="2"
								style={styles.textScreenElements}
							/>
							<Picker.Item
								label="Education"
								value="3"
								style={styles.textScreenElements}
							/>
							<Picker.Item
								label="Confidentiality"
								value="4"
								style={styles.textScreenElements}
							/>
						</Picker>

						<TouchableHighlight
							style={styles.button}
							onPress={this.onAddSurvey}
						>
							<Text style={styles.buttonText}>Submit Survey</Text>
						</TouchableHighlight>


						{/* Dumb data */}
						{
							this.state.surveyQuestions.map((question, index) => (
								<Text key={index} style={styles.text}>
									{this.state.questionID}: {question}
								</Text>))
						}
						{
							this.state.surveyAnswers.map((answer, index) => (
								<Text key={index} style={styles.text}>
									{answer}
								</Text>))
						}
						{/* Dumb questions */}
						<TextInput
							style={styles.inputs}
							placeholder="Question"
							underlineColorAndroid="transparent"
							ref={input => {
								this.textInput = input;
							}}
							onChangeText={question => this.setState({ newQuestion: question })}
						/>
						<View style={styles.buttonContainer}>
							<TouchableHighlight
								style={styles.button}
								onPress={this.onAddQuestion}
							>
								<Text style={styles.buttonText}>Submit Question</Text>
							</TouchableHighlight>
						</View>
						{/* Dumb Answers */}
						<TextInput
							style={styles.inputs}
							placeholder="user ID"
							underlineColorAndroid="transparent"
							ref={input => {
								this.textInput = input;
							}}
							onChangeText={ID => this.setState({ answerUserID: ID })}
						/>
						<TextInput
							style={styles.inputs}
							placeholder="Question ID"
							underlineColorAndroid="transparent"
							ref={input => {
								this.textInput = input;
							}}
							onChangeText={ID => this.setState({ answeredQuestionID: ID })}
						/>
						<TextInput
							style={styles.inputs}
							placeholder="Answer"
							underlineColorAndroid="transparent"
							ref={input => {
								this.textInput = input;
							}}
							onChangeText={answer => this.setState({ newAnswer: answer })}
						/>
						<View style={styles.buttonContainer}>
							<TouchableHighlight
								style={styles.button}
								onPress={this.onAddAnswer}
							>
								<Text style={styles.buttonText}>Submit Answer</Text>
							</TouchableHighlight>
						</View>


						{/* Smart data */}
						{
							this.state.smartQuestions.map((question, index) => (
								<Text key={index} style={styles.text}>
									{this.state.questionID}: {question}
								</Text>))
						}
						{
							this.state.smartAnswers.map((answer, index) => (
								<Text key={index} style={styles.text}>
									{answer}
								</Text>))
						}
						{/* Smart questions */}
						<TextInput
							style={styles.inputs}
							placeholder="Smart Question"
							underlineColorAndroid="transparent"
							ref={input => {
								this.textInput = input;
							}}
							onChangeText={question => this.setState({ smartQuestion: question })}
						/>
						<View style={styles.buttonContainer}>
							<TouchableHighlight
								style={styles.button}
								onPress={this.saveSmartQuestion}
							>
								<Text style={styles.buttonText}>Submit Smart Question</Text>
							</TouchableHighlight>
						</View>
						{/* Smart answers */}
						<TextInput
							style={styles.inputs}
							placeholder="user ID"
							underlineColorAndroid="transparent"
							ref={input => {
								this.textInput = input;
							}}
							onChangeText={ID => this.setState({ answerUserID: ID })}
						/>
						<TextInput
							style={styles.inputs}
							placeholder="Question ID"
							underlineColorAndroid="transparent"
							ref={input => {
								this.textInput = input;
							}}
							onChangeText={ID => this.setState({ answeredQuestionID: ID })}
						/>
						<TextInput
							style={styles.inputs}
							placeholder="Smart Answer"
							underlineColorAndroid="transparent"
							ref={input => {
								this.textInput = input;
							}}
							onChangeText={answer => this.setState({ smartAnswer: answer })}
						/>
						<View style={styles.buttonContainer}>
							<TouchableHighlight
								style={styles.button}
								onPress={this.saveSmartAnswer}
							>
								<Text style={styles.buttonText}>Submit Smart Answer</Text>
							</TouchableHighlight>
						</View>

						{/* Foot */}
						<View style={styles.foot}>
						</View>
					</View>
				</ScrollView>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
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
	},
	inputs: {
		height: 45,
		width: 350,
		marginLeft: 16,
		borderBottomColor: "#FFFFFF",
		borderColor: 'black',
		borderWidth: 1,
		borderBottomColor: 'black',
		margin: 10
	},
	textScreenElements: {
		fontSize: 19,
		fontFamily: "Roboto"
	},
	text: {
		flexDirection: "column",
		color: "black",
		marginTop: 7,
		fontSize: 20,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: "stretch",
		justifyContent: 'space-between',
		marginLeft: 5,
		marginRight: 5,

	},
	button: {
		height: 45,
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 40,
		borderColor: 'black',
		//borderWidth: 1,
		backgroundColor: '#002C43',
	},
	buttonText: {
		flexDirection: "column",
		color: "white",
		marginTop: 7,
		fontSize: 20,
	},
	foot: {
		padding: 150,
	},
});
