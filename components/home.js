import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import {
  Container,
  Header,
  Text as Textbase,
  Left,
  Icon,
  Button
} from "native-base";
import SurveyModal from "./SurveyModal";
import SurveyListThumbnails from "./SurveyListThumbnails";
import SurveyStats from "./SurveyStats";

const ip = require("../ip.json");

export default class Home extends Component {
  static navigationOptions = {
    title: "Home",
    drawerIcon: () => <Icon name="home" style={{ fontSize: 40 }} />
  };

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      names: [
        {
          key: "Isa",
          imageURI:
            "https://cdn-images-1.medium.com/max/1200/1*jh6bmapyE8nPWju7W_7qEw.png"
        },
        {
          key: "Maram",
          imageURI:
            "https://softwareengineeringdaily.com/wp-content/uploads/2018/12/machinelearning.jpg"
        },
        {
          key: "Anagreh",
          imageURI:
            "https://d2odgkulk9w7if.cloudfront.net/images/default-source/blogs/nativescript-vuef711652a7b776b26a649ff04000922f2.png?sfvrsn=75660efe_0"
        }
      ],
      modalVisible: false,
      selectedSurvey: null,
      surveyName: "",
      surveyDescription: "",
      surveyCategory: "",
      selectedEducation: "",
      selectedMarital: "",
      surveyUserID: "",
      surveyID: "",
      loggedin: "",
      allSurveysInfo: [],
      surveyAnswers: [],
      userID: null,
      images: [
        "https://cdn-images-1.medium.com/max/1200/1*jh6bmapyE8nPWju7W_7qEw.png",
        "https://softwareengineeringdaily.com/wp-content/uploads/2018/12/machinelearning.jpg",
        "https://d2odgkulk9w7if.cloudfront.net/images/default-source/blogs/nativescript-vuef711652a7b776b26a649ff04000922f2.png?sfvrsn=75660efe_0"
      ]
    };
  }

  componentDidMount = async () => {
    
    try {
      const value = await AsyncStorage.getItem("userID");
      if (value !== null && !this.state.loggedin) {
        // We have data!!
        const token = (JSON.parse(value));
        this.showAllSurveys(token.user_id);
        this.setState({
          loggedin: ` ${token.userName} `
        });
      } else {
        this.setState({
          loggedin: ""
        });
      }
    } catch (error) {
      console.warn("errer home didmount", error)
      // Error retrieving data
    }
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  selectedSurvey = item => {
    this.setState({ selectedSurvey: item });
  };

  onChangeSurveyName = name => {
    this.setState({
      surveyName: name
    });
  };

  onChangeSurveyDescription = description => {
    this.setState({
      surveyDescription: description
    });
  };

  onChangeSurveyCategory = category => {
    this.setState({
      surveyCategory: category
    });
  };

  getQuestions(surveyID) {
    fetch(`${ip}:3000/answer/dumb/questions`, {
      method: "POST",
      headers: { 
        'Accept':'application/json',
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        surveyID: surveyID
      })
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        // console.warn(res);
      })
      .done();
  }

  async onPressSubmitModal() {
    const surveyAndUserIDs = [this.state.surveyID, this.state.surveyUserID];
    const args = [...arguments];
    //30 => education level
    //37 => marital status
    const questionsIDs = [30, 37];
    const answersArray = [];

    args.forEach((item, index) => {
      answersArray.push([
        item,
        questionsIDs[index],
        surveyAndUserIDs[0],
        surveyAndUserIDs[1]
      ]);
    });

    await this.setState({ surveyAnswers: answersArray });
    // console.warn(this.state.surveyAnswers);
    fetch(`${ip}:3000/answer/dumb/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: this.state.surveyAnswers })
    })
      .then(response => response.json())
      .then(res => {
        // console.warn(res);
        this.setState({ modalVisible: false });
      });
  }

  async showAllSurveys() {
    try {
      const value = await AsyncStorage.getItem("userID");
      if (value !== null) {
        const token = JSON.parse(value);
        this.setState({
          userID: ` ${token.user_id} `
        });
        fetch(`${ip}:3000/surveys/retrieve`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: this.state.userID })
        })
          .then(response => response.json())
          .then(res => {
            this.setState({ allSurveysInfo: res });
          })
          .done();
      }
    } catch (error) {
      console.warn("Error getting Token!", error);
    }
  }

  getSurveysAnswers = () => {
    fetch(`${ip}:3000/surveysanswers/`, {
      method: "GET"
  // showAllSurveys = (id) => {
  //   fetch(`${ip}:3000/home/`, {
  //     method: "POST",
  //     headers: { 
  //       'Accept':'application/json',
  //       "Content-Type": "application/json" 
  //     },
  //     body: JSON.stringify({ id: id })
    })
      .then(response => response.json())
      .then(res => {
        this.setState({
          surveyAnswers: res
        });
      })
      .done(() => {
      });
  };

  onChangeSurveyInfo = (
    name,
    description,
    category,
    surveyID,
    surveyUserID
  ) => {
    this.setState({
      surveyName: name,
      surveyDescription: description,
      surveyCategory: category,
      surveyID: surveyID,
      surveyUserID: surveyUserID
    });
  };

  render() {
    const {
      modalVisible,
      selectedSurvey,
      allSurveysInfo,
      images,
      surveyDescription,
      surveyCategory,
      surveyName,
      loggedin,
      surveyUserID,
      surveyID
    } = this.state;

    const { navigation } = this.props;
    if (navigation.getParam("accessToken")) {
      if (navigation.getParam("accessToken").length > 0) {
        var itemId = navigation.getParam("accessToken");
      } else {
        var itemId = " ";
      }
    } else {
      var itemId = " ";
    }
    if (loggedin.length > 1) {
      var itemId = loggedin;
    }
    return (
      <View>
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
          <Text style={styles.headerStyle}>Welcome{itemId}to ASKem!</Text>
        </Header>
        <ScrollView>
          <View>
            <SurveyModal
              showHandler={this.setModalVisible.bind(this)}
              visibility={modalVisible}
              selectedSurvey={selectedSurvey}
              allSurveys={allSurveysInfo}
              surveyName={surveyName}
              surveyDescription={surveyDescription}
              surveyCategory={surveyCategory}
              submitModalHandler={this.onPressSubmitModal.bind(this)}
            />
            <SurveyListThumbnails
              allSurveys={allSurveysInfo}
              selectedSurvey={this.selectedSurvey.bind(this)}
              showHandler={this.setModalVisible.bind(this)}
              surveyImages={images}
              onChangeSurveyInfo={this.onChangeSurveyInfo.bind(this)}
              getQuestions={this.getQuestions.bind(this)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    top: 0
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
