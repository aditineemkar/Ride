
import React from 'react';
import YourRideDetails from '../Screens/YourRideDetails'
import YourRides from '../Screens/YourRides'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const StackNavigatorYourRides = () => {
  return (
    <Stack.Navigator
      initialRouteName="YourRides"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="YourRides" component={YourRides} />
      <Stack.Screen name="YourRideDetails" component={YourRideDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigatorYourRides;