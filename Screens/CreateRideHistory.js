import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import db from "../config";
import { AntDesign } from "@expo/vector-icons";
export default class CreateRideHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yourActiveRides: [],
      userId: firebase.auth().currentUser.email,
    };
  }
  getActiveRides = async () => {
    await db
      .collection("createRide")
      .where("rideOwner", "==", this.state.userId)
      .where("isActive", "==", true)
      .onSnapshot((snapshot) => {
        var rides = [];
        snapshot.docs.map((doc) => {
          var ride = doc.data();
          ride["docId"] = doc.id;
          rides.push(ride);
        });

        this.setState({ yourActiveRides: rides });
      });
  };
  componentDidMount() {
    this.getActiveRides();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingTest}>
            Your ongoing and upcoming rides
          </Text>
        </View>

        <FlatList
          data={this.state.yourActiveRides}
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
                        justifyContent: "space-evenly",

                        alignSelf: "flex-end",
                        flex: 1,
                        alignItems: "flex-end",
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
                        <AntDesign name="clockcircle" size={18} color="white" />
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

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("CreateRide")}
          style={styles.fab}
        >
          <AntDesign name="plus" size={32} color="white" />
        </TouchableOpacity>
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
    textAlign: "center",
    marginLeft: "9%",
  },

  fab: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 10,
    top: 75,
    backgroundColor: "#1F60C2",
    borderRadius: 30,
    elevation: 8,
  },
});
