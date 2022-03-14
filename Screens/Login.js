import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";

import { SafeAreaProvider } from "react-native-safe-area-context";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
    };
  }
  login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        alert("Welcome Back!");
        this.props.navigation.replace("BottomTabNavigator");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <KeyboardAvoidingView>
          <ScrollView>
            <ImageBackground
              source={require("../Images/Backg1.png")}
              style={styles.backgroundImage}
            >
              <Image
                source={require("../Images/Icon3.png")}
                style={styles.image}
              ></Image>
              <Text style={styles.text}>Ride</Text>
              <Text style={styles.weltext}>Welcome Back, Buddy!</Text>

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
                    placeholderTextColor="#000"
                    placeholder="Email"
                    value={this.state.email.trim()}
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
                    placeholderTextColor="#000"
                    placeholder="Password"
                    value={this.state.password.trim()}
                  />
                  <View style={[styles.iconStyle, { borderRightWidth: 0 }]}>
                    <Ionicons
                      name={
                        this.state.showPassword
                          ? "ios-eye-sharp"
                          : "ios-eye-off-sharp"
                      }
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
                <Text style={styles.signUpTxt}>
                  Having Trouble Signing in?{" "}
                  <Text
                    style={{ color: "#15f4ee" }}
                    onPress={() =>
                      this.props.navigation.navigate("ForgetPassword")
                    }
                  >
                    Reset Password
                  </Text>
                </Text>
                <TouchableOpacity
                  style={styles.signin}
                  onPress={() => {
                    this.login();
                  }}
                >
                  <LinearGradient
                    // Button Linear Gradient
                    colors={["#9dfbc8", "#70b2d9"]}
                    start={{ x: 0.1, y: 0.5 }}
                    end={{ x: 0.9, y: 0.1 }}
                    style={{
                      padding: 10,
                      justifyContent: "center",
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        textAlign: "center",
                        padding: 8,
                      }}
                    >
                      Sign In
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.createAcc}>
                  Don't have an account yet?{" "}
                  <Text
                    style={{ color: "#15f4ee", paddingLeft: 15 }}
                    onPress={() => this.props.navigation.replace("SignUp")}
                  >
                    Sign Up
                  </Text>
                </Text>
              </View>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  container2: {
    padding: 10,
    backgroundColor: "#00000099",
    borderRadius: 20,
    margin: 10,
    marginBottom: "40%",
  },
  image: {
    alignSelf: "center",
    height: 150,
    width: 150,
    resizeMode: "cover",
    marginTop: "30%",
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  weltext: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
  },
  signUpTxt: {
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30,
    color: "white",
  },
  signin: {
    backgroundColor: "#797ef6",
    marginTop: 20,
    width: "70%",
    alignSelf: "center",
    borderRadius: 5,
  },
  createAcc: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    paddingRight: 14,
    paddingTop: 10,
    color: "white",
  },
  inputContainer: {
    marginTop: 15,
    alignSelf: "center",
    marginBottom: 10,
    width: "90%",
    height: 50,
    borderColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "white",
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 5,
    flex: 1,
    fontSize: 18,
    color: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
