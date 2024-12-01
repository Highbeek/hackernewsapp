import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';
import AboutScreen from '../screens/about/AboutScreen';
import StoryDetailScreen from '../screens/StoryDetailScreen';
import LoginScreen from '../screens/Login/LoginScreen';

const RootStack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <RootStack.Screen name="Tabs" component={BottomNavigator} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="About" component={AboutScreen} />
      <RootStack.Screen name="StoryDetail" component={StoryDetailScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
