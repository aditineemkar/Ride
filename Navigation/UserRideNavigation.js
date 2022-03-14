import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateRide from '../Screens/CreateRide';
import CreateRideHistory from '../Screens/CreateRideHistory';
import CreateRideDeatils from '../Screens/CreateRideDetails';

const Stack = createStackNavigator();

const StackNavigatorUserRides = () => {
  return (
    <Stack.Navigator
      initialRouteName="CreateRideHistory"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CreateRide" component={CreateRide} />
      <Stack.Screen name="CreateRideHistory" component={CreateRideHistory} />
      <Stack.Screen name="CreateRideDeatils" component={CreateRideDeatils} />
    </Stack.Navigator>
  );
};

export default StackNavigatorUserRides;
