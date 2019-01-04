import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Container,
    StatusBar,
    View,
    KeyboardAvoidingView,
    TouchableHighlight,
    AsyncStorage,
} from "react-native";
import Options from './components/options';

export default class App extends Component{
    render(){
        return(
            <Options/>
        )
    }
}
