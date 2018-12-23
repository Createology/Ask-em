import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, SectionList, ScrollView, Modal, TouchableHighlight } from 'react-native';

// props are from App component
export default class SurveysList extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            names: props.names
        }
    }

    render() {
        return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.names}
                        renderItem={({ item }) => (
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.selectedSurvey(item.key);
                                    this.props.showHandler();
                                }}>
                                <Text style={styles.text}>
                                    {item.key}
                                </Text>
                            </TouchableHighlight>)
                        }
                    />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        textAlign: 'left',
    },
    text: {
        fontSize: 25,
    }
});