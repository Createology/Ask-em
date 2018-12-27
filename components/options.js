import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, SectionList, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Switch } from 'native-base';
import {Icon, Button, parseIconName } from 'react-native-elements';
import {
  DrawerItems,
  SafeAreaView,
  TabBarBottom,
  createAppContainer
} from "react-navigation";
import Home from "./home";
import Signup from "./signup";
import Signin from "./signin";

export default class Options extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      modalVisible: false
     
    };
  }

  handlePress(visible) {
    this.props.navigateForward(item.sceneId);
  this.props.closeDrawer();
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <ListItem icon>
            <Left>
              <Button  onPress={this.handlePress} title='' style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="plane" />
              </Button>
            </Left>
            <Body>
              <Text>My Profile</Text>
            </Body>
            <Right>
            <Icon active name="arrow-forward" />
              {/* <Switch value={false} /> */}
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button onPress={this.handlePress}  title='' style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Sign In</Text>
            </Body>
            <Right>
              <Text></Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button onPress={this.handlePress}  title='' style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="bluetooth" />
              </Button>
            </Left>
            <Body>
              <Text>Sign Up</Text>
            </Body>
            <Right>
              <Text></Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button onPress={this.handlePress}  title='' style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="bluetooth" />
              </Button>
            </Left>
            <Body>
              <Text>Log Out</Text>
            </Body>
            <Right>
              <Text></Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
      </Container>
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
  }
})