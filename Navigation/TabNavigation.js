import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import StackNavigatorUserRides from "./UserRideNavigation";
import StackNavigatorHome from "./HomeNavigation";
import StackNavigatorSettings from "./SettingsNavigation";
import StackNavigatorYourRides from "./YourRideNavigation";

const Tab = createMaterialBottomTabNavigator();
export default class BottomTabNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={styles.bottomTabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let ionicon;
            if (route.name === "Home") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "CreateRideHistory") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "YourRides") {
              iconName = focused ? "bookmark" : "bookmark-outline";
            }
            return (
              <View>
                <Ionicons
                  name={iconName}
                  size={25}
                  color="#ffffff"
                  style={styles.icons}
                />
              </View>
            );
          },
        })}
        activeColor={"#ffffff"}
        inactiveColor={"grey"}
      >
        <Tab.Screen
          name="Home"
          component={StackNavigatorHome}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="CreateRideHistory"
          component={StackNavigatorUserRides}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="YourRides"
          component={StackNavigatorYourRides}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="Settings"
          component={StackNavigatorSettings}
          options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#000000",
    height: "7%",
    overflow: "hidden",
    position: "absolute",
  },
  icons: {
    width: 30,
    height: 30,
  },
});
