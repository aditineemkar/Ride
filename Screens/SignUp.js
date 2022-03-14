import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Entypo,
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Ionicons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import firebase from 'firebase';
import db from '../config';
export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      secretCode: '',
      contact: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      company: '',
      gender: '',
    };
  }
  signUp = () => {
    if (this.state.password !== this.state.confirmPassword) {
      alert('Error : Passcode does not Match .. ');
    } else {
      if (
        this.state.name === '' ||
        this.state.email === '' ||
        this.state.contact === '' ||
        this.state.secretCode === '' ||
        this.state.password === '' ||
        this.state.confirmPassword === '' ||
        this.state.company === '' ||
        this.state.confirmPassword === ''
      ) {
        alert(
          'The above input fields are required in order to register for the app.'
        );
      } else if (
        this.state.contact.length > 10 ||
        this.state.contact.length < 9
      ) {
        alert('Invalid mobile number. It should be a 10 digit number.');
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
            db.collection('users').add({
              name: this.state.name.trim(),
              email: this.state.email.trim(),
              contact: this.state.contact.trim(),
              secretCode: this.state.secretCode.trim(),
              company: this.state.company.trim(),
            });
            return alert(this.state.email + ' Successfully Registered ! ');
          })
          .catch((error) => {
            var errorMsg = error.message;
            return alert(errorMsg);
          });
        this.props.navigation.replace('BottomTabNavigator');
      }
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../Images/SignUpBg.png')}
          style={styles.backgroundImage}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView>
              <Image
                source={require('../Images/Icon3.png')}
                style={styles.image}></Image>
              <Text style={styles.weltext}>
                Enter the following details to create an account!
              </Text>
              <View style={styles.container2}>
                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}>
                    <MaterialIcons name="email" size={24} color="white" />
                  </View>
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    onChangeText={(email) => {
                      this.setState({ email });
                    }}
                    placeholder="Email"
                    placeholderTextColor="#000"
                    value={this.state.email}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}>
                    <FontAwesome name="user" size={24} color="white" />
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(name) => {
                      this.setState({ name });
                    }}
                    value={this.state.name}
                    placeholder="Name"
                    placeholderTextColor="#000"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}>
                    <MaterialIcons
                      name="accessibility-new"
                      size={24}
                      color="white"
                    />
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(gender) => {
                      this.setState({ gender });
                    }}
                    value={this.state.gender}
                    placeholder="Gender"
                    placeholderTextColor="#000"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}>
                    <Entypo name="code" size={24} color="white" />
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(secretCode) => {
                      this.setState({ secretCode });
                    }}
                    value={this.state.secretCode}
                    placeholder="Secret Code"
                    placeholderTextColor="#000"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}>
                    <AntDesign name="phone" size={24} color="white" />
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(contact) => {
                      this.setState({ contact });
                    }}
                    value={this.state.contact}
                    placeholder="Contact"
                    placeholderTextColor="#000"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}>
                    <FontAwesome name="industry" size={24} color="white" />
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(company) => {
                      this.setState({ company });
                    }}
                    value={this.state.company}
                    placeholder="Company"
                    placeholderTextColor="#000"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}>
                    <Ionicons name="lock-open" size={24} color="white" />
                  </View>
                  <TextInput
                    style={styles.input}
                    secureTextEntry={
                      this.state.showPassword === false ? true : false
                    }
                    onChangeText={(password) => {
                      this.setState({ password });
                    }}
                    placeholder="Password"
                    value={this.state.password}
                    placeholderTextColor="#000"
                  />
                  <View style={[styles.iconStyle, { borderRightWidth: 0 }]}>
                    <Ionicons
                      name="ios-eye-off-sharp"
                      size={24}
                      color="white"
                      onPress={() => {
                        if (this.state.showPassword === false) {
                          this.setState({ showPassword: true });
                        } else if (this.state.showPassword === true) {
                          this.setState({ showPassword: false });
                        }
                      }}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}>
                    <Ionicons name="lock-open" size={24} color="white" />
                  </View>
                  <TextInput
                    style={styles.input}
                    secureTextEntry={
                      this.state.showPassword === false ? true : false
                    }
                    onChangeText={(confirmPassword) => {
                      this.setState({ confirmPassword });
                    }}
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    placeholderTextColor="#000"
                  />
                  <View style={[styles.iconStyle, { borderRightWidth: 0 }]}>
                    <Ionicons
                      name="ios-eye-off-sharp"
                      size={24}
                      color="white"
                      onPress={() => {
                        if (this.state.showConfirmPassword === false) {
                          this.setState({ showConfirmPassword: true });
                        } else if (this.state.showConfirmPassword === true) {
                          this.setState({ showConfirmPassword: false });
                        }
                      }}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.signin}
                  onPress={() => {
                    this.signUp();
                  }}>
                  <LinearGradient
                    // Button Linear Gradient
                    colors={['#9dfbc8', '#70b2d9']}
                    start={{ x: 0.1, y: 0.5 }}
                    end={{ x: 0.9, y: 0.1 }}
                    style={{
                      padding: 10,
                      justifyContent: 'center',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        textAlign: 'center',
                        padding: 8,
                      }}>
                      Sign Up
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.createAcc}>
                  Already have an account?
                  <Text
                    style={{ color: '#15f4ee' }}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    Sign In
                  </Text>
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container2: {
    backgroundColor: '#00000099',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    marginBottom: 50,
  },
  image: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    marginTop: 5,
    resizeMode: 'contain',
  },
  weltext: {
    fontSize: 18,
    textAlign: 'center',
  },
  signin: {
    backgroundColor: '#797ef6',
    marginTop: 20,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  createAcc: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    color: 'white',
  },
  inputContainer: {
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 10,
    width: '90%',
    height: 45,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'white',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 5,
    flex: 1,
    fontSize: 18,
    color: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});
