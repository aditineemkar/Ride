import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Feather, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Entypo,
  Fontisto,
  FontAwesome5,
  Octicons,
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

import db from "../config";
import { LinearGradient } from "expo-linear-gradient";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      name: "",
      contact: "",
      company: "",
      image: "http://cdn.onlinewebfonts.com/svg/img_568656.png",
    };
  }
  logoutUser = () => {
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.props.navigation.replace("Login");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      Alert.alert("An error occured. Please try again later.");
    }
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
        console.log(this.state.image);
      })

      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  componentDidMount() {
    this.getUserDetails();
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: "black",
          height: Dimensions.get("window").height,
        }}
      >
        <View style={{ backgroundColor: "#12867B" }}>
          <LinearGradient
            // Button Linear Gradient
            colors={["#03e5b7", "#09c7fb"]}
            start={{ x: 0.1, y: 0.5 }}
            end={{ x: 0.9, y: 0.1 }}
            style={{ padding: 10, justifyContent: "center" }}
          >
            <View style={styles.heading}>
              <View style={{ marginTop: "10%", marginLeft: "5%" }}>
                <Feather
                  name="arrow-left-circle"
                  size={35}
                  color="white"
                  onPress={() => this.props.navigation.goBack()}
                />
              </View>
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 90,
                }}
              >
                Profile
              </Text>
            </View>
          </LinearGradient>
          <View
            style={{
              backgroundColor: "#C8FAEF",
              height: 220,
              marginTop: 140,
              width: "90%",
              alignSelf: "center",
              borderRadius: 20,
              position: "absolute",
            }}
          >
            <View style={{ marginTop: 20, alignSelf: "center" }}>
              <View style={{ alignSelf: "center" }}>
                <Image
                  source={{ uri: this.state.image }}
                  style={{ width: 130, height: 130, borderRadius: 90 }}
                />
                <View
                  style={{
                    position: "absolute",
                    marginLeft: "53%",
                  }}
                >
                  <Feather
                    name="edit"
                    size={24}
                    color="black"
                    onPress={() =>
                      this.props.navigation.navigate("EditProfile")
                    }
                  />
                </View>
              </View>
              <Text style={{ textAlign: "center" }}>{this.state.name}</Text>
              <Text style={{ textAlign: "center" }}>{this.state.userId}</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <View>
            <View style={styles.ss1}>
              <AntDesign name={"mobile1"} size={24} color="white" />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Aboutapp");
                }}
                style={styles.sss}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {this.state.contact}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ss}>
              <FontAwesome name="industry" size={24} color="white" />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Aboutapp");
                }}
                style={styles.sss}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {this.state.company}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ss3}>
              <Ionicons name="log-out" size={27} color="white"></Ionicons>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Alert!",
                    "Are you sure you want to Logout?",
                    [
                      {
                        text: "Yes",
                        onPress: () => this.logoutUser(),
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
                style={styles.sss}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
// <View style={styles.ss}>
//   <AntDesign name="car" size={24} color="black" />
//   <TouchableOpacity
//     onPress={() => {
//       this.props.navigation.navigate('Aboutapp');
//     }}
//     style={styles.sss}>
//     <Text style={{ color: '#0f00b0', fontSize: 16 }}>
//       Car Details
//     </Text>
//   </TouchableOpacity>
// </View>
const styles = StyleSheet.create({
  ss1: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 180,
  },
  ss: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 5,
  },
  ss3: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 5,
    marginBottom: 100,
  },
  sss: {
    height: 50,
    width: "100%",
    borderBottomWidth: 1.5,
    justifyContent: "center",
    borderBottomColor: "white",
    marginHorizontal: 10,
  },
});
