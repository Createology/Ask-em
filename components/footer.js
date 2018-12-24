import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, SectionList, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Container, Footer, Title, Button, FooterTab, Content } from 'native-base';
import { List, ListItem, Icon, parseIconName } from 'react-native-elements';

// props are from App component
export default class FooterComponent extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            servey: this.props.selectedSurvey,
        }
    }
    
    try() {
        alert('try')
    }

    render() {
        return (
            <Footer>
                <FooterTab style={styles.footerTab}>
                    <Button onPress={this.try.bind(this)}>
                        <Icon size={40} name='home' color='grey' />
                    </Button>
                    <Button onPress={this.try.bind(this)}>
                        <Icon size={40} name='library-books' color='grey' />
                    </Button>
                    <Button onPress={this.try.bind(this)}>
                        <Icon size={40} name='account-box' color='grey' />
                    </Button>
                    <Button>
                        <Icon size={40} name='more-horiz' color='grey' />
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

const styles = StyleSheet.create({
    footerTab: {
        backgroundColor: "#FFF",
        borderStyle: 'solid',
        borderWidth: 0,
        borderTopWidth: 1,
        borderColor: 'grey',
    },
});