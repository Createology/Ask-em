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
      highestPercentLastName: "",
      highestPercentLastNameKey: "",
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
      lastNames: ["default"],
      maritalStatuses: ["default"],
      educationLevels: ["default"],
      genders: ["male"],
      x: "default", // these are random number from the customer for the smart final answer
      y: "default",
      z: "default"
    };
  }

  async componentWillReceiveProps(nextProps) {
    //;--------------------------------------------------------------------------------------------
    //get and set birthdays
    if (nextProps.birthdays !== this.props.birthdays) {
      // ages: input: [{birthdays}], output: []
      await this.setState({
        ages: nextProps.birthdays.map(({ birthday }) => {
          return Math.floor(
            (new Date() - new Date(birthday)) / 1000 / 60 / 60 / 24 / 30 / 12
          );
        })
      });
      // avgAge: input: [], output: number
      await this.setState({
        avgAge: this.calculateProbabilities(this.state.ages)
      });
    }

    //;--------------------------------------------------------------------------------------------
    //get and set genders
    if (nextProps.genders !== this.props.genders) {
      // avgAge: input: [{}], output: []
      await this.setState({
        genders: nextProps.genders.map(({ gender }) => {
          if (gender === "1") {
            return "female";
          } else {
            return "male";
          }
        })
      });
      // avgAge: input: [], output: number
      await this.setState({
        highestPercentGender: this.getHighestPercent(this.state.genders)
      });

      // avgAge: input: [], output: string
      await this.setState({
        highestPercentGenderKey: this.getHighestPercentKey(this.state.genders)
      });
    }

    //;--------------------------------------------------------------------------------------------
    //get and set lastNames
    if (nextProps.lastNames !== this.props.lastNames) {
      // avgAge: input: [{}], output: []
      await this.setState({
        lastNames: nextProps.lastNames.map(({ lastname }) => lastname)
      });
      // avgAge: input: [], output: number
      await this.setState({
        highestPercentLastName: this.getHighestPercent(this.state.lastNames)
      });
      // avgAge: input: [], output: string
      await this.setState({
        highestPercentLastNameKey: this.getHighestPercentKey(
          this.state.lastNames
        )
      });
    }

    //;--------------------------------------------------------------------------------------------
    //get and set maritalStatuses
    if (nextProps.maritalStatuses !== this.props.maritalStatuses) {
      // avgAge: input: [{}], output: []
      await this.setState({
        maritalStatuses: nextProps.maritalStatuses.map(({ answer }) => answer)
      });
      // avgAge: input: [], output: number
      await this.setState({
        highestPercentMaritalStatus: this.getHighestPercent(
          this.state.maritalStatuses
        )
      });
      // avgAge: input: [], output: string
      await this.setState({
        highestPercentMaritalStatusKey: this.getHighestPercentKey(
          this.state.maritalStatuses
        )
      });
    }

    //;--------------------------------------------------------------------------------------------
    //get and set educationLevels
    if (nextProps.educationLevels !== this.props.educationLevels) {
      // avgAge: input: [{}], output: []
      await this.setState({
        educationLevels: nextProps.educationLevels.map(({ answer }) => answer)
      });
      // avgAge: input: [], output: number
      await this.setState({
        highestPercentEducationLevel: this.getHighestPercent(
          this.state.educationLevels
        )
      });
      // avgAge: input: [], output: string
      await this.setState({
        highestPercentEducationLevelKey: this.getHighestPercentKey(
          this.state.educationLevels
        )
      });
    }

    //;--------------------------------------------------------------------------------------------

    // inputs are ordered numbers
    await this.setState({
      data: [
        this.state.highestPercentLastName,
        this.state.highestPercentMaritalStatus,
        this.state.highestPercentEducationLevel,
        this.state.highestPercentGender,
        this.state.avgAge
      ]
    });
    // inputs are strings
    await this.setState({
      statsAnswersKeys: [
        this.state.highestPercentLastNameKey,
        this.state.highestPercentMaritalStatusKey,
        this.state.highestPercentEducationLevelKey,
        this.state.highestPercentGenderKey
      ]
    });
  }
  // input: [], output: {keys: numbers}
  calculateProbabilities = items => {
    if (items) {
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
    }
  };

  // input: [], output: string
  //don't use it for age
  getHighestPercentKey = items => {
    const item = this.calculateProbabilities(items);
    return Object.keys(item).sort((a, b) => item[a] - item[b])[
      Object.keys(item).sort((a, b) => item[a] - item[b]).length - 1
    ];
  };

  // input: [], output: number
  //don't use it for age
  getHighestPercent = items => {
    const item = this.calculateProbabilities(items);
    return Math.max(...Object.values(item));
  };

  render() {
    var xx = this.state.x;
    var yy = this.state.y;
    var zz = this.state.z;
    var finalSmartAnswerFunction = this.props.finalSmartAnswer;
    if (
      this.state.data.length < 3 &&
      this.state.statsAnswersKeys.length < 1
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
      const Labels = ({ x, y, bandwidth, data }) => {
        // console.warn("data", data);
        return data.map((value, index) => (
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
      };

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
              <Text style={{ color: "black", fontSize: 18 }}>Fill smart data</Text>
              <Row size={1}>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 40, }}>
                  <TextInput
                    placeholder="Issue Brief Description"
                    placeholderTextColor="gray"
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
                    placeholder="Issue Brief Description"
                    placeholderTextColor="gray"
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
                    placeholder="Issue Brief Description"
                    placeholderTextColor="gray"
                    style={styles.TextInput}
                    editable={true}
                    maxLength={40}
                    numberOfLines={4}
                    ref={input => {
                      this.textInput = input;
                    }}
                    onChangeText={z => this.setState({ z })}
                    placeholder="About you"
                  />
                </View>
              </Row>
              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => {
                    finalSmartAnswerFunction(xx, yy, zz);
                  }}
                >
                  <Textnative
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      color: "black"
                    }}
                  >
                    {this.props.finalSmartAnswerValue}
                  </Textnative>

                </TouchableHighlight>
              </View>
            </GridEasy>
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
    width: 220,
    borderBottomWidth: 1,
    borderBottomColor: "#002C43",
    backgroundColor: "white",
    color: 'black'
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    height: 40,
    marginBottom: 10,
    width: 200,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#037FBC'
  },
})

SurveyStats.propTypes = {
  birthdays: PropTypes.array,
  genders: PropTypes.array,
  lastNames: PropTypes.array,
  randomColor: PropTypes.string
}

//;------------------------
