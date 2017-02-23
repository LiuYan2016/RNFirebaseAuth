
'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  Text,
  TextInput,
  View
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';
import Account from './account';

import styles from '../styles/common-styles.js';

import Global from '../global/globals';

export default class signup extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }

  signup(){

    this.setState({
      loaded: false
    });


    var itemsRef = Global.FirebaseApp.database().ref();

    var self = this;
    Global.FirebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).
        then(
            function() {
                alert('Your account was created!');
                self.setState({
                    email: '',
                    password: '',
                    loaded: true
                });
            }, function(error) {
                alert(error.message);
                self.setState({
                    email: '',
                    password: '',
                    loaded: true
                });
            });
  }

  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
        <View style={styles.body}>

            <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
                placeholder={"Email Address"}
            />
            <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true}
                placeholder={"Password"}
            />
            <Button
                text="Signup"
                onpress={this.signup.bind(this)}
                button_styles={styles.primary_button}
                button_text_styles={styles.primary_button_text} />

            <Button
                text="Got an Account?"
                onpress={this.goToLogin.bind(this)}
                button_styles={styles.transparent_button}
                button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
}


