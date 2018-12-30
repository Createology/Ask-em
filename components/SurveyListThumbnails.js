import React, { Component } from "react";
import { TouchableHighlight, View } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";

// props are from home
export default class SurveyListThumbnails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSurveysInfo: props.allSurveys,
      surveyImages: props.surveyImages
    };
  }

  render() {
    const { surveyImages } = this.state;
    return (
      <Container>
        {Array.isArray(this.props.allSurveys) &&
          this.props.allSurveys.map((survey, index) => (
            <List key={survey.id}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail
                    square
                    source={{
                      uri: surveyImages[index]
                    }}
                  />
                </Left>
                <Body>
                  <TouchableHighlight
                    onPress={() => {
                      this.props.selectedSurvey(survey.survey_name);
                      this.props.showHandler();
                    }}
                    underlayColor="gray"
                  >
                    <Text key={survey.id}>{survey.survey_name}</Text>
                  </TouchableHighlight>

                  <Text note numberOfLines={3}>
                    {survey.description}
                  </Text>
                </Body>
                <Right>
                  <TouchableHighlight
                    onPress={() => {
                      this.props.selectedSurvey(survey.survey_name);
                      this.props.showHandler();
                    }}
                    underlayColor="gray"
                  >
                    <Text key={survey.id} style={{ color: "blue" }}>
                      View
                    </Text>
                  </TouchableHighlight>
                </Right>
              </ListItem>
            </List>
          ))}
      </Container>
    );
  }
}
