
'use strict';
import React, { Component } from 'react';

import {
    AppRegistry,
    Text,
    View,
    Navigator,
    AsyncStorage
} from 'react-native';


import Signup from './src/pages/signup';
import Account from './src/pages/account';

import Header from './src/components/header';
import styles from './src/styles/common-styles.js';

import Global from './src/global/globals';

class RNFirebaseAuth extends Component {    

    constructor(props){
        super(props);
        this.state = {
            component: null,
            loaded: false
        };
    }

    componentWillMount(){

        AsyncStorage.getItem('user_data').then((user_data_json) => {

            let user_data = JSON.parse(user_data_json);
            let token = user_data.stsTokenManager.accessToken;
            console.log(token);
            let component = {component: Signup};
            if(user_data != null){
                let self = this;

                Global.FirebaseApp.auth().signInWithCustomToken(token).then(
                    function(){
                        self.setState({component: Account});
                    }, function(error) {
                        self.setState(component);
                    });
            }else{
                this.setState(component);
            }
        });

    }

    render(){

        if(this.state.component){
            return (
                <Navigator
                    initialRoute={{component: this.state.component}}
                    configureScene={() => {
                        return Navigator.SceneConfigs.FloatFromRight;
                    }}
                    renderScene={(route, navigator) => {
                        if(route.component){
                            return React.createElement(route.component, { navigator });
                        }
                    }}
                />
            );
        }else{
            return (
            <View style={styles.container}>
                <Header text="React Native Firebase Auth" loaded={this.state.loaded} />  
                <View style={styles.body}></View>
            </View>
            );
        }
    }
}

AppRegistry.registerComponent('RNFirebaseAuth', () => RNFirebaseAuth);
