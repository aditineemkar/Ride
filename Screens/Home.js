import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      rideId: "",
      rides: [],
      search: "",
      searchResults: "",
    };
  }
  getData = async () => {
    await db
      .collection("createRide")
      .where("isActive", "==", true)
      .onSnapshot((snapshot) => {
        var rides = [];
        snapshot.docs.map((doc) => {
          var ride = doc.data();
          ride["docId"] = doc.id;

          rides.push(ride);
        });

        this.setState({ rides: rides });
      });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.heading}>
            <Text style={styles.headingTest}>Find a Ride</Text>
            <View style={{ marginLeft: "85%" }}>
              <MaterialCommunityIcons
                name="bell"
                size={30}
                color="white"
                onPress={() => this.props.navigation.navigate("Notifications")}
              />
            </View>
          </View>
          <LinearGradient
            colors={[
              "#00FFFF",
              "#17C8FF",
              "#329BFF",
              "#4C64FF",
              "#6536FF",
              "#8000FF",
            ]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.linear}
          >
            <View style={styles.inputContainer}>
              <View style={{ paddingLeft: 15, paddingRight: 10 }}>
                <FontAwesome name="search" size={24} color="black" />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(search) => {
                  this.setState({ search });
                }}
                placeholder="Search a ride"
                value={this.state.search.trim()}
              />
            </View>
          </LinearGradient>
          <FlatList
            contentContainerStyle={{ marginBottom: 100 }}
            data={this.state.rides}
            onPress={() => this.props.navigation.navigate("Login")}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.list}
                onPress={() => {
                  this.props.navigation.navigate("FindRideDeatils", {
                    details: item,
                  });
                }}
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#03e5b7", "#09c7fb"]}
                  start={{ x: 0.1, y: 0.5 }}
                  end={{ x: 0.9, y: 0.1 }}
                  style={{
                    margin: "3%",
                    backgroundColor: "#ffffffaa",
                    borderLeftWidth: 3,
                    borderColor: "#000080aa",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <View style={styles.list}>
                    <View
                      style={{
                        flexDirection: "row",

                        alignItems: "center",
                        padding: 5,
                      }}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                        }}
                      />
                      <View
                        style={{
                          marginLeft: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {item.name}
                        </Text>

                        <Text
                          style={{
                            color: "grey",
                          }}
                        >
                          {item.carDetails}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: "#00008044",
                          position: "absolute",
                          top: 10,
                          right: 10,
                          padding: 10,
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{ color: "white", textAlign: "center" }}>
                          ₹ {item.cost}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={require("../Images/Location.png")}
                        style={{
                          width: 80,
                          height: 60,
                          resizeMode: "contain",
                          marginTop: "5%",
                        }}
                      />
                      <View style={{ marginTop: "4%" }}>
                        <Text style={{ color: "grey" }}>
                          From: {item.fromDestination}
                        </Text>
                        <Text style={{ marginTop: 20, color: "grey" }}>
                          Destination: {item.toDestination}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          flex: 1,
                          alignItems: "flex-end",
                          justifyContent: "space-evenly",
                          padding: 5,
                          marginRight: 5,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#00008044",
                            borderRadius: 10,
                            flexDirection: "row",
                            padding: 5,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <AntDesign
                            name="clockcircle"
                            size={18}
                            color="white"
                          />
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              paddingRight: "2%",
                              paddingLeft: 5,
                            }}
                          >
                            {item.departureTime}
                          </Text>
                        </View>
                        <View
                          style={{
                            backgroundColor: "#00008044",
                            borderRadius: 10,
                            padding: 5,
                            marginRight: 5,
                            justifyContent: "center",

                            marginTop: 5,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",

                              padding: 5,
                            }}
                          >
                            {item.date}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
            keyExtractor={(index, item) => {
              index.toString();
            }}
            bottomDivider
          />

          <View style={{ marginBottom: 100 }}></View>
        </SafeAreaView>
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
    position: "absolute",
    marginLeft: "39%",
  },
  input: {
    padding: 5,
    flex: 1,
    fontSize: 18,
    color: "white",
    borderColor: "white",
  },
  inputContainer: {
    alignSelf: "center",
    width: "98%",
    height: 45,
    borderColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "#B2BEB5",
    justifyContent: "center",
    marginLeft: "1%",
  },
  linear: {
    alignSelf: "center",
    width: "89%",
    height: 50,
    borderColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "white",
  },
});
