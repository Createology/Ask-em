import React from "react";
import {
  View,
  Text as Textnative,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ScrollView
} from "react-native";
import { BarChart, Grid } from "react-native-svg-charts";
import { Text } from "react-native-svg";
import { Col, Row, Grid as GridEasy } from "react-native-easy-grid";
import {
  Container,
  Header,
  Content,
  Button,
  Input,
  Form,
  Label,
  Left,
  Right,
  Textarea,
  Toast,
  Spinner,
  Text as Textbase
} from "native-base";
import PropTypes from "prop-types";

class SurveyStats extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      avgAge: 0,
      highestPercentFamilyName: "",
      highestPercentFamilyNameKey: "",
      highestPercentMaritalStatus: "",
      highestPercentMaritalStatusKey: "",
      highestPercentEducationLevel: "",
      highestPercentEducationLevelKey: "",
      highestPercentGender: "",
      highestPercentGenderKey: "",
      data: [],
      test: [1, 2, 3],
      statsAnswersKeys: [],
      ages: [1, 2],
      familyNames: ["default"],
      maritalStatuses: ["default"],
      educationLevels: ["default"],
      genders: ["male"],
      finalSmartAnswer: "",
      x: "", // these are random number from the customer for the smart final answer
      y: "",
      z: ""
    };
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.birthdays !== this.props.birthdays) {
      console.warn("ages1", this.state.ages, "test1", this.state.test);
      await this.setState({
        ages: nextProps.birthdays.map(({ birthday }) => {
          return Math.floor(
            (new Date() - new Date(birthday)) / 1000 / 60 / 60 / 24 / 30 / 12
          );
        })
      });
      console.warn("ages2", this.state.ages, "test2", this.state.test);
    }

    if (nextProps.genders !== this.props.genders) {
      console.warn("genders1", this.state.genders, "test1", this.state.test);
      await this.setState({
        genders: nextProps.genders.map(({ gender }) => {
          if (gender === "1") {
            return "female";
          } else {
            return "male";
          }
        })
      });
      console.warn("genders2", this.state.genders, "test2", this.state.test);
    }

    if (nextProps.lastnames !== this.props.lastnames) {
      console.warn(
        "lastnames1",
        this.state.lastnames,
        "test1",
        this.state.test
      );
      await this.setState({
        lastnames: nextProps.lastnames.map(({ lastname }) => lastname)
      });
      console.warn(
        "lastnames2",
        this.state.lastnames,
        "test2",
        this.state.test
      );
    }
  }
  // async componentWillReceiveProps(nextProps) {
  //   // console.warn(this.state.familyNames);
  //   console.warn("OMAR", this.state.ages, "test", this.state.test);
  //   if (this.props.birthdays !== nextProps.birthdays) {
  //     await this.setState({
  //       highestPercentFamilyName: this.getHighestPercent(
  //         this.state.familyNames
  //       ),
  //       highestPercentMaritalStatus: this.getHighestPercent(
  //         this.state.maritalStatuses
  //       ),
  //       highestPercentEducationLevel: this.getHighestPercent(
  //         this.state.educationLevels
  //       ),
  //       highestPercentGender: this.getHighestPercent(this.state.genders),
  //       highestPercentFamilyNameKey: this.getHighestPercentKey(
  //         this.state.familyNames
  //       ),
  //       highestPercentMaritalStatusKey: this.getHighestPercentKey(
  //         this.state.maritalStatuses
  //       ),
  //       highestPercentEducationLevelKey: this.getHighestPercentKey(
  //         this.state.educationLevels
  //       ),
  //       highestPercentGenderKey: this.getHighestPercentKey(this.state.genders),
  //       avgAge: this.calculateProbabilities(this.state.ages)
  //     });

  //     await this.setState({
  //       data: [
  //         this.state.highestPercentFamilyName,
  //         this.state.highestPercentMaritalStatus,
  //         this.state.highestPercentEducationLevel,
  //         this.state.highestPercentGender,
  //         this.state.avgAge
  //       ]
  //     });

  //     await this.setState({
  //       statsAnswersKeys: [
  //         this.state.highestPercentFamilyNameKey,
  //         this.state.highestPercentMaritalStatusKey,
  //         this.state.highestPercentEducationLevelKey,
  //         this.state.highestPercentGenderKeyr
  //       ]
  //     });
  //   }
  // }

  calculateProbabilities = items => {
    const array = items.slice();
    const probabilities = {};
    if (typeof array[0] === "string") {
      if (array.includes("male") || array.includes("female")) {
        const arrayLength = array.length;
        let femaleCounts = 0;
        let maleCounts = 0;
        for (let i = 0; i < array.length; i++) {
          if (array[i] === "female") {
            femaleCounts++;
          }
          if (array[i] === "male") {
            maleCounts++;
          }
        }
        probabilities["female"] = Math.round(
          (femaleCounts / array.length) * 100
        );
        probabilities["male"] = Math.round((maleCounts / array.length) * 100);
      } else {
        array.forEach((item, index) => {
          probabilities[item] = Math.round(
            (array.join("").match(new RegExp(item, "g")).length /
              array.length) *
              100
          );
        });
      }
      return probabilities;
    } else if (typeof array[0] === "number") {
      return Math.round(
        array.reduce((acc, currVal) => acc + currVal) / array.length
      );
    }
  };

  //don't use it for age
  getHighestPercentKey = items => {
    const item = this.calculateProbabilities(items);
    return Object.keys(item).sort((a, b) => item[a] - item[b])[
      Object.keys(item).sort((a, b) => item[a] - item[b]).length - 1
    ];
  };
  //don't use it for age
  getHighestPercent = items => {
    const item = this.calculateProbabilities(items);
    return Math.max(...Object.values(item));
  };

  render() {
    // console.warn("stat", this.state.ages);
    if (
      this.state.data.length === 0 ||
      this.state.statsAnswersKeys.length === 0
    ) {
      return (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Spinner color="#E65100" />
          <Textbase style={{ textAlign: "center" }}>Loading...</Textbase>
        </View>
      );
    } else {
      const { data } = this.state;
      const CUT_OFF = 20;
      const Labels = ({ x, y, bandwidth, data }) =>
        data.map((value, index) => (
          <Text
            key={index}
            x={x(index) + bandwidth / 2}
            y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
            fontSize={14}
            fill={value >= CUT_OFF ? "white" : "black"}
            alignmentBaseline={"middle"}
            textAnchor={"middle"}
            belowChart={true}
          >
            {`
          ${
            index === 4
              ? "Age"
              : this.state.statsAnswersKeys[index][0].toUpperCase() +
                this.state.statsAnswersKeys[index].slice(1)
          }
          ${index === 4 ? value + " years" : value + "%"}
        `}
          </Text>
        ));

      return (
        <Container>
          <ScrollView>
            <GridEasy>
              <Row size={3}>
                <Col>
                  <View
                    style={{
                      flexDirection: "row",
                      height: 200,
                      paddingVertical: 16,
                      marginTop: 60
                    }}
                  >
                    <BarChart
                      style={{ flex: 1 }}
                      data={data}
                      svg={{ fill: this.props.randomColor }}
                      contentInset={{ top: 10, bottom: 10 }}
                      spacing={0.2}
                      gridMin={0}
                    >
                      <Grid direction={Grid.Direction.HORIZONTAL} />
                      <Labels />
                    </BarChart>
                  </View>
                </Col>
              </Row>
              <Row size={0.5}>
                <Col style={{ marginLeft: 30 }}>
                  <Textnative>Family Name</Textnative>
                </Col>
                <Col style={{ marginLeft: 5 }}>
                  <Textnative>Marital Status</Textnative>
                </Col>
                <Col>
                  <Textnative>Education Level</Textnative>
                </Col>
                <Col style={{ marginLeft: 20 }}>
                  <Textnative>Gender</Textnative>
                </Col>
                <Col>
                  <Textnative>Average Age</Textnative>
                </Col>
              </Row>
              <Row size={0.5}>
                <View style={{ justifyContent: "center", flex: 1 }}>
                  <Textnative
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      color: "black"
                    }}
                  >
                    Highest Percentages Among Surveys
                  </Textnative>
                </View>
              </Row>
            </GridEasy>
            <View>
              <TextInput
                style={styles.TextInput}
                editable={true}
                maxLength={40}
                numberOfLines={4}
                ref={input => {
                  this.textInput = input;
                }}
                onChangeText={x => this.setState({ x })}
                placeholder="About you"
              />
              <TextInput
                style={styles.TextInput}
                editable={true}
                maxLength={40}
                numberOfLines={4}
                ref={input => {
                  this.textInput = input;
                }}
                onChangeText={y => this.setState({ y })}
                placeholder="About you"
              />
              <TextInput
                style={styles.TextInput}
                editable={true}
                maxLength={40}
                numberOfLines={4}
                ref={input => {
                  this.textInput = input;
                }}
                onChangeText={y => this.setState({ y })}
                placeholder="About you"
              />
              <TouchableHighlight
                style={{ color: "black" }}
                onPress={() => {
                  this.finalSmartAnswer(
                    this.state.x,
                    this.state.y,
                    this.state.z
                  );
                }}
              >
                Smart Response
              </TouchableHighlight>
              <Textnative style={{ color: "black" }}>
                {this.state.finalSmartAnswer}
              </Textnative>
            </View>
          </ScrollView>
        </Container>
      );
    }
  }
}

export default SurveyStats;
const styles = StyleSheet.create({
  text: {
    fontSize: 25
  },
  TextInput: {
    height: 40,
    flex: 0.9,
    borderWidth: 1,
    borderColor: "#002C43",
    backgroundColor: "white"
  }
});

SurveyStats.propTypes = {
  birthdays: PropTypes.array,
  genders: PropTypes.array,
  lastnames: PropTypes.array,
  randomColor: PropTypes.string
};
