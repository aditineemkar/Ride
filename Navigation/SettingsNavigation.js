import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../Screens/Settings';
import Profile from '../Screens/Profile';
import EditProfile from '../Screens/EditProfile';
const Stack = createStackNavigator();

const StackNavigatorSettings = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default StackNavigatorSettings;
