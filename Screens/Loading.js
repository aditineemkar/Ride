import * as React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.replace("BottomTabNavigator");
      } else {
        this.props.navigation.replace("Login");
      }
    });
  }
  render() {
    return (
      <View>
        <SafeAreaView
          style={{
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 35,
          }}
        >
          <ImageBackground
            source={require("../Images/Ride.png")}
            style={{
              alignSelf: "center",
              resizeMode: "contain",
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height - 5,
            }}
          ></ImageBackground>
        </SafeAreaView>
      </View>
    );
  }
}
