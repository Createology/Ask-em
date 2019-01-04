import React from "react";
import { View, Text as Textnative, StyleSheet } from "react-native";
import { BarChart, Grid } from "react-native-svg-charts";
import { Text } from "react-native-svg";
import { Col, Row, Grid as GridEasy } from "react-native-easy-grid";
import { Container } from "native-base";

class SurveyStats extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      surveyAnswers: props.surveyAnswers,
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
      statsAnswersKeys: [],
      ages: [23, 25, 33, 29, 26, 28, 24, 27],
      familyNames: [
        "dulaimi",
        "khudhairi",
        "anaqreh",
        "rawashdeh",
        "hajhussein",
        "dulaimi"
      ],
      maritalStatuses: [
        "single",
        "married",
        "divorced",
        "widowed",
        "seperated",
        "single"
      ],
      educationLevels: [
        "primary",
        "secondary",
        "high",
        "bachelor",
        "master",
        "doctoral",
        "doctoral"
      ],
      genders: ["male", "female", "male", "male", "female", "male"]
    };
  }
  async componentWillMount() {
    let that = this;
    // console.warn(this.state.familyNames);
    await this.setState({
      highestPercentFamilyName: that.getHighestPercent(that.state.familyNames),
      highestPercentMaritalStatus: that.getHighestPercent(
        that.state.maritalStatuses
      ),
      highestPercentEducationLevel: that.getHighestPercent(
        that.state.educationLevels
      ),
      highestPercentGender: that.getHighestPercent(that.state.genders),
      highestPercentFamilyNameKey: that.getHighestPercentKey(
        that.state.familyNames
      ),
      highestPercentMaritalStatusKey: that.getHighestPercentKey(
        that.state.maritalStatuses
      ),
      highestPercentEducationLevelKey: that.getHighestPercentKey(
        that.state.educationLevels
      ),
      highestPercentGenderKey: that.getHighestPercentKey(that.state.genders),
      avgAge: that.calculateProbabilities(that.state.ages)
    });

    await this.setState({
      data: [
        that.state.highestPercentFamilyName,
        that.state.highestPercentMaritalStatus,
        that.state.highestPercentEducationLevel,
        that.state.highestPercentGender,
        that.state.avgAge
      ]
    });

    await this.setState({
      statsAnswersKeys: [
        that.state.highestPercentFamilyNameKey,
        that.state.highestPercentMaritalStatusKey,
        that.state.highestPercentEducationLevelKey,
        that.state.highestPercentGenderKey
      ]
    });
  }

  componentDidMount() {
    // let that = this;
  }

  calculateProbabilities = items => {
    const array = items.slice();
    const probabilities = {};
    if (typeof array[0] === "string") {
      if (array.includes("male") || array.includes("female")) {
        const arrayLength = array.length;
        probabilities["female"] = Math.round(
          (array.join("").match(new RegExp("female", "g")).length /
            array.length) *
            100
        );

        for (let i = 0; i < array.length; i++) {
          if (array[i] === "female") {
            array.splice(array.indexOf("female"), 1);
          }
        }

        probabilities["male"] = Math.round(
          (array.join("").match(new RegExp("male", "g")).length / arrayLength) *
            100
        );
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
    if (
      this.state.data.length === 0 ||
      this.state.statsAnswersKeys.length === 0
    ) {
      return <Textnative>Waiting for data!</Textnative>;
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
                    svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
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
                <Textnative style={{ textAlign: "center", fontSize: 14 }}>
                  Highest Percentages Among Surveys
                </Textnative>
              </View>
            </Row>
          </GridEasy>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  chartCaption: {
    alignSelf: "center"
  }
});

export default SurveyStats;
