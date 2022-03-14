import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import Notifications from "../Screens/Notifications";
import FindRideDeatils from "../Screens/FindRideDeatils";

const Stack = createStackNavigator();

const StackNavigatorHome = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="FindRideDeatils" component={FindRideDeatils} />
    </Stack.Navigator>
  );
};

export default StackNavigatorHome;
