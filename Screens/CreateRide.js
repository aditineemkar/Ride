import React, { useState, Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import db from "../config.js";
import firebase from "firebase";
import {
  Entypo,
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Feather, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
export default class CreateRide extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      fromDestination: "",
      toDestination: "",
      carDetails: "",
      routeDetails: "",
      departureTime: "",
      noOfSeats: 0,
      cost: "",
      contact: "",
      company: "",
      userId: firebase.auth().currentUser.email,
      dateW: null,
      dt: null,
      date: new Date(1598051730000),
      registrationDate: "",
      gender: "",
      isActive: true,
      image: "http://cdn.onlinewebfonts.com/svg/img_568656.png",
      mode: "date",
      show: false,
      time: "",
    };
  }
  showMode = (currentMode) => {
    this.setState({ show: true });
    this.setState({ mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode("date");
  };

  showTimepicker = () => {
    this.showMode("time");
  };
  getUserDetails = () => {
    db.collection("users")
      .where("email", "==", this.state.userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().name,
            contact: doc.data().contact,
            company: doc.data().company,
            image: doc.data().image,
          });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  componentDidMount() {
    this.getUserDetails();
  }
  checkValue(str, max) {
    if (str.charAt(0) !== "0" || str == "00") {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
          ? "0" + num
          : num.toString();
    }
    return str;
  }
  dateTimeInputChangeHandler = (e) => {
    this.type = "text";
    var input = e;
    var expr = new RegExp(/\D\/$/);
    if (expr.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split("/").map(function (v) {
      return v.replace(/\D/g, "");
    });
    if (values[1]) values[1] = this.checkValue(values[1], 12);
    if (values[0]) values[0] = this.checkValue(values[0], 31);
    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + "/" : v;
    });
    this.setState({
      registrationDate: output.join("").substr(0, 14),
    });
  };
  createUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };
  createRide = async () => {
    var uniqueId = this.createUniqueId();
    await db
      .collection("createRide")
      .doc(uniqueId)
      .set({
        fromDestination: this.state.fromDestination,
        toDestination: this.state.toDestination,
        carDetails: this.state.carDetails,
        routeDetails: this.state.routeDetails,
        departureTime: this.state.departureTime,
        noOfSeats: parseInt(this.state.noOfSeats),
        cost: this.state.cost,
        date: this.state.dt,
        rideOwner: this.state.userId,
        contact: this.state.contact,
        company: this.state.company,
        gender: this.state.gender,
        name: this.state.name,
        rideId: uniqueId,
        isActive: true,
        image: this.state.image,
        passengerNames: firebase.firestore.FieldValue.arrayUnion(
          this.state.userId
        ),
        time: this.state.time,
      });

    await db
      .collection("createRide")
      .doc(uniqueId)
      .collection("passengers")
      .add({
        passengerId: this.state.userId,
        passengerName: this.state.name,
        passengerImage: this.state.image,
      });
    alert("Ride Created!");
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              if (this.state.mode === "date") {
                var pickedDate = new Date(date);
                var finalDate =
                  pickedDate.getDate() +
                  "/" +
                  pickedDate.getMonth() +
                  "/" +
                  pickedDate.getFullYear();
                this.setState({ date: finalDate });
                this.setState({ show: Platform.OS === "ios" });
              } else {
                var pickedTime = new Date(date);
                var finalTime =
                  pickedTime.getHours() + ":" + pickedTime.getMinutes();
                console.log(finalTime);

                this.setState({ departureTime: finalTime });

                this.setState({ show: Platform.OS === "ios" });
              }
            }}
          />
        )}
        <ScrollView>
          <KeyboardAvoidingView>
            <LinearGradient
              // Button Linear Gradient
              colors={["#03e5b7", "#09c7fb"]}
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 0.9, y: 0.1 }}
              style={{ padding: 10, justifyContent: "center" }}
            >
              <View style={styles.heading}>
                <View style={{ marginTop: "2%", marginLeft: "5%" }}>
                  <Feather
                    name="arrow-left-circle"
                    size={35}
                    color="white"
                    onPress={() =>
                      this.props.navigation.navigate("CreateRideHistory")
                    }
                  />
                </View>
                <Text style={styles.headingTest}>Create a Ride</Text>
              </View>
            </LinearGradient>
            <View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  marginLeft: 20,
                  borderColor: "black",
                  padding: 5,
                  borderWidth: 2,
                  borderRadius: 80,
                  flex: 0.2,
                  alignSelf: "center",
                  marginTop: "5%",
                }}
                source={{
                  uri: this.state.image,
                }}
              />
            </View>
            <View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <Ionicons name="location" size={24} color="white" />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={(fromDestination) => {
                    this.setState({ fromDestination });
                  }}
                  placeholderTextColor="#000"
                  value={this.state.fromDestination}
                  placeholder="From"
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <FontAwesome name="dot-circle-o" size={24} color="white" />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={(toDestination) => {
                    this.setState({ toDestination });
                  }}
                  value={this.state.toDestination}
                  placeholder="To"
                  placeholderTextColor="#000"
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <FontAwesome name="dot-circle-o" size={24} color="white" />
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
                  <AntDesign name="car" size={24} color="white" />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={(carDetails) => {
                    this.setState({ carDetails });
                  }}
                  placeholderTextColor="#000"
                  value={this.state.carDetails}
                  placeholder="Car Details"
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <FontAwesome5 name="route" size={24} color="white" />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={(routeDetails) => {
                    this.setState({ routeDetails });
                  }}
                  placeholderTextColor="#000"
                  value={this.state.routeDetails}
                  placeholder="Route Details"
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <FontAwesome5 name="rupee-sign" size={24} color="white" />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={(cost) => {
                    this.setState({ cost });
                  }}
                  keyboardType="numeric"
                  placeholderTextColor="#000"
                  value={this.state.cost}
                  placeholder="Cost"
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <MaterialCommunityIcons
                    name="car-seat"
                    size={24}
                    color="white"
                  />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={(noOfSeats) => {
                    this.setState({ noOfSeats });
                  }}
                  keyboardType="numeric"
                  placeholderTextColor="#000"
                  placeholder="Number of seats available"
                  value={this.state.noOfSeats.toString()}
                />
              </View>
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  onPress={this.showTimepicker}
                  style={{ width: 190 }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.iconStyle}>
                      <Ionicons name="time" size={24} color="white" />
                    </View>
                    <Text
                      style={{
                        padding: 5,

                        fontSize: 18,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {this.state.departureTime}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <Fontisto name="date" size={24} color="white" />
                </View>
                <TextInputMask
                  style={styles.input}
                  placeholder="DD/MM/YYYY"
                  type={"datetime"}
                  options={{
                    format: "DD/MM/YYYY",
                  }}
                  value={this.state.dt}
                  onChangeText={(text) => {
                    this.setState({
                      dt: text,
                    });
                  }}
                  // add the ref to a local var
                  ref={(ref) => (this.datetimeField = ref)}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.signin}
              onPress={() => {
                this.createRide();
                this.setState({
                  fromDestination: "",
                  toDestination: "",
                  carDetails: "",
                  routeDetails: "",
                  departureTime: "",
                  noOfSeats: "",
                  cost: "",
                });
              }}
            >
              <LinearGradient
                // Button Linear Gradient
                colors={["#52a7c1", "#b3f6d8"]}
                start={{ x: 0.1, y: 0.5 }}
                end={{ x: 0.9, y: 0.1 }}
                style={{
                  padding: 10,
                  justifyContent: "center",
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ color: "white", textAlign: "center", padding: 8 }}
                >
                  Create Ride
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  heading: {
    height: 80,
    alignItems: "center",
    flexDirection: "row",
  },
  headingTest: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 80,
  },
  signin: {
    backgroundColor: "#797ef6",
    marginTop: 20,
    width: "70%",
    height: 40,
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 170,
  },
  input: {
    padding: 5,
    flex: 1,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    marginTop: "10%",
    alignSelf: "center",
  },
  inputContainer: {
    marginTop: 10,
    alignSelf: "center",
    marginBottom: 10,
    width: "95%",
    height: 45,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff55",
  },
  iconStyle: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "black",
    borderRightWidth: 1,
    width: 50,
  },
});
