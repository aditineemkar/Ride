import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import call from "react-native-phone-call";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

export default class FindRideDeatils extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: this.props.route.params.details["contact"],
      routeDetails: this.props.route.params.details["routeDetails"],
      noOfSeats: this.props.route.params.details["noOfSeats"],
      rideOwner: this.props.route.params.details["rideOwner"],
      departureTime: this.props.route.params.details["departureTime"],
      name: this.props.route.params.details["name"],
      toDestination: this.props.route.params.details["toDestination"],
      date: this.props.route.params.details["date"],
      cost: this.props.route.params.details["cost"],
      fromDestination: this.props.route.params.details["fromDestination"],
      gender: this.props.route.params.details["gender"],
      carDetails: this.props.route.params.details["carDetails"],
      company: this.props.route.params.details["company"],
      rideId: this.props.route.params.details["rideId"],
      image: this.props.route.params.details["image"],
      userId: firebase.auth().currentUser.email,
      requesterName: "",
      requesterContact: "",
      requesterImage: "",
      upActive: "",
      docId: this.props.route.params.details["docId"],
      passengers: [],
      requestSend: false,
    };
  }

  componentDidMount = async () => {
    await db
      .collection("notifications")
      .where("rideId", "==", this.state.rideId)
      .where("notificationType", "==", "request")
      .where("requesterId", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length !== 0) {
          this.setState({
            requestSend: true,
          });
        } else {
          this.setState({ requestSend: false });
        }
      });
    await db
      .collection("createRide")
      .doc(this.state.docId)
      .collection("passengers")
      .onSnapshot(async (snapshot) => {
        var dbPassengers = [];
        await snapshot.docs.map(async (doc) => {
          var passenger = doc.data();

          dbPassengers.push(passenger);
        });
        this.setState({
          passengers: dbPassengers,
        });
      });
  };
  updateDb = () => {
    db.collection("createRide").doc(this.state.docId).update({
      isActive: false,
    });
    alert("Ride left!");
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <ScrollView style={{ flex: 1, marginBottom: 100 }}>
          <LinearGradient
            // Button Linear Gradient
            colors={["#03e5b7", "#09c7fb"]}
            start={{ x: 0.1, y: 0.5 }}
            end={{ x: 0.9, y: 0.1 }}
            style={{
              margin: 5,
              backgroundColor: "#ffffffaa",
              borderLeftWidth: 3,
              borderColor: "#000080aa",
              padding: 30,
              borderBottomRightRadius: 40,
            }}
          >
            <View style={{ marginTop: "5%", marginLeft: "5%" }}>
              <Feather
                name="arrow-left-circle"
                size={35}
                color="white"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
            <View style={{ alignSelf: "center" }}>
              <Image
                source={{ uri: this.state.image }}
                style={{
                  borderRadius: 80,
                  height: 90,
                  width: 90,
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "black",
                }}
              >
                {this.state.name}
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 16, color: "black" }}
              >
                {this.state.company}
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 16, color: "black" }}
              >
                {this.state.carDetails}
              </Text>
            </View>
          </LinearGradient>
          <Text style={{ color: "white", marginLeft: "5%", marginTop: 10 }}>
            Passengers:
          </Text>
          <View style={{ flexDirection: "row" }}>
            {this.state.passengers.length !== 0 ? (
              this.state.passengers.map((passenger, index) => (
                <View
                  style={{
                    backgroundColor: "black",
                    padding: 10,
                    margin: 5,
                    borderRadius: 10,
                  }}
                  key={index}
                >
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      marginLeft: "5%",
                    }}
                    source={{ uri: passenger.passengerImage }}
                  />
                  <Text style={{ color: "white", marginLeft: "8%" }}>
                    {passenger.passengerName}
                  </Text>
                </View>
              ))
            ) : (
              <ActivityIndicator
                size="large"
                color="#03e5b7"
                style={styles.spinner}
              />
            )}
          </View>
          <View
            style={{
              marginTop: 25,
              alignSelf: "center",
              marginBottom: 50,
              width: "90%",
              borderColor: "black",
              borderRadius: 5,
            }}
          >
            <LinearGradient
              // Button Linear Gradient
              colors={["#02809088", "#00bfb288"]}
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 0.9, y: 0.1 }}
              style={{
                padding: 25,
                borderRadius: 20,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../Images/Location.png")}
                  style={{
                    width: 80,
                    height: 60,
                    resizeMode: "contain",
                    marginTop: "5%",
                  }}
                />
                <View style={{ marginTop: "4.5%" }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: "white",
                      marginBottom: 13,
                    }}
                  >
                    From: {this.state.fromDestination}
                  </Text>
                  <Text style={{ fontSize: 17, color: "white" }}>
                    Destination: {this.state.toDestination}
                  </Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", marginLeft: 30, marginTop: 20 }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                >
                  Route Details:
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                    marginBottom: 5,
                  }}
                >
                  {this.state.routeDetails}
                </Text>
              </View>
            </LinearGradient>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: "#E8E9EA55",
                marginTop: 10,
                alignSelf: "center",
                marginBottom: 10,
                width: "20%",
                height: 50,
                borderRadius: 5,
                alignItems: "center",
                marginRight: 5,
                marginLeft: "3%",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  paddingTop: 14.5,
                  fontSize: 15,
                  color: "white",
                }}
              >
                ₹ {this.state.cost}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#E8E9EA55",
                marginTop: 10,
                alignSelf: "center",
                marginBottom: 10,
                width: "30%",
                height: 50,
                borderRadius: 5,
                alignItems: "center",
                marginRight: 5,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  paddingTop: 14.5,
                  fontSize: 15,
                  color: "white",
                }}
              >
                Seats: {this.state.noOfSeats}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#E8E9EA55",
                marginTop: 10,
                alignSelf: "center",
                marginBottom: 10,
                width: "40%",
                height: 50,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  paddingTop: 14.5,
                  fontSize: 15,
                  color: "white",
                }}
              >
                Dep. Time: {this.state.departureTime}
              </Text>
            </View>
          </View>
          <View>
            {this.state.rideOwner !== this.state.userId ? (
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                  marginLeft: "15%",
                  marginRight: "15%",
                  marginBottom: 100,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: this.state.requestSend
                      ? "white"
                      : "#797ef6",
                    marginTop: 20,
                    width: "50%",
                    alignSelf: "center",
                    borderRadius: 5,
                  }}
                  disabled={this.state.requestSend}
                  onPress={() => {
                    this.updateRide();
                  }}
                >
                  <LinearGradient
                    // Button Linear Gradient
                    colors={["#39e5b6", "#9dfbc8"]}
                    start={{ x: 0.1, y: 0.5 }}
                    end={{ x: 0.9, y: 0.1 }}
                    style={{
                      padding: 10,
                      justifyContent: "center",
                      borderRadius: 5,
                    }}
                  >
                    {this.state.requestSend ? (
                      <Text
                        style={{
                          color: "gray",
                          textAlign: "center",
                          padding: 8,
                        }}
                      >
                        Request Send
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          padding: 8,
                        }}
                      >
                        I'm interested
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#797ef6",
                    marginTop: 20,
                    width: "40%",

                    alignSelf: "center",
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    const args = {
                      number: this.state.contact, // String value with the number to call
                      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
                    };

                    call(args).catch((err) => {
                      console.log(err.message);
                    });
                  }}
                >
                  <LinearGradient
                    // Button Linear Gradient
                    colors={["#39e5b6", "#9dfbc8"]}
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
                        color: "white",
                        textAlign: "center",
                        padding: 8,
                      }}
                    >
                      Contact
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    width: "40%",

                    alignSelf: "center",
                    borderRadius: 5,
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    // alert('Are you sure you want to leave this ride?');
                    Alert.alert(
                      "Alert!",
                      "Are you sure you want to leave this ride?",
                      [
                        {
                          text: "Yes",
                          onPress: () => this.updateDb(),
                        },
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                >
                  <LinearGradient
                    // Button Linear Gradient
                    colors={["#05e8ba", "#087ee1"]}
                    start={{ x: 0.1, y: 0.5 }}
                    end={{ x: 0.9, y: 0.1 }}
                    style={{
                      padding: 10,
                      justifyContent: "center",
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        padding: 8,
                      }}
                    >
                      Mark as left
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  updateRide = async () => {
    //sedn notification
    try {
      await db
        .collection("users")
        .where("email", "==", this.state.userId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.setState({
              requesterName: doc.data().name,
              requesterImage: doc.data().image,
              requesterContact: doc.data().contact,
            });
          });
        });
      await db.collection("notifications").add({
        rideId: this.state.rideId,
        requesterId: this.state.userId,
        requesterImage: this.state.requesterImage,
        rideOwner: this.state.rideOwner,
        sendTo: this.state.rideOwner,
        date: this.state.date,
        fromDestination: this.state.fromDestination,
        toDestination: this.state.toDestination,
        requesterName: this.state.requesterName,
        requesterContact: this.state.requesterContact,
        notificationType: "request",
        isRead: false,
      });
      alert("Successfully send request. Look out in notifications");
      this.props.navigation.navigate("Home");
    } catch (e) {
      console.log(e);
    }
  };
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
  },
});
