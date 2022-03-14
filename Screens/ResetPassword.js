import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";

export default class ForgetPassword extends React.Component {
  resetPass = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  constructor() {
    super();
    this.state = {
      email: "",
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView>
          <ScrollView>
            <ImageBackground
              source={require("../Images/PasswordBg.jpg")}
              style={styles.backgroundImage}
            >
              <View style={styles.container1}>
                <View style={{ marginTop: "10%", marginLeft: "5%" }}>
                  <Feather
                    name="arrow-left-circle"
                    size={35}
                    color="black"
                    onPress={() => this.props.navigation.navigate("Login")}
                  />
                </View>
                <Image
                  source={require("../Images/Icon3.png")}
                  style={styles.image}
                ></Image>
                <Text style={styles.text}>Ride</Text>
                <Text style={styles.weltext}>
                  Troubled while signing in? No worries!
                </Text>
                <Text style={styles.weltext}>
                  Enter your registered mail id and get a password reset link
                  now!
                </Text>
              </View>
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
                    value={this.state.email.trim()}
                  />
                </View>
                <TouchableOpacity
                  style={styles.signin}
                  onPress={() => {
                    this.resetPass();
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
                      Send Reset Password Link
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container1: {
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    height: 400,
  },
  image: {
    alignItems: "center",
    alignSelf: "center",
    height: "40%",
    width: "40%",
    resizeMode: "contain",
    marginBottom: 30,
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  weltext: {
    marginLeft: "5%",
    fontSize: 18,
    textAlign: "center",
    marginRight: "7%",
    marginTop: 5,
  },
  input: {
    padding: 5,
    flex: 1,
    fontSize: 18,
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
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
  signin: {
    backgroundColor: "#797ef6",
    marginTop: 20,
    width: "70%",
    alignSelf: "center",
    borderRadius: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container2: {
    padding: 10,
    backgroundColor: "#00000099",
    borderRadius: 20,
    margin: 10,
    marginBottom: "40%",
  },
});
