import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Loading from "./Screens/Loading";
import BottomTabNavigator from "./Navigation/TabNavigation";
import Login from "./Screens/Login";
import SignUp from "./Screens/SignUp";
import ForgetPassword from "./Screens/ResetPassword";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import 'react-native-gesture-handler';

const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
