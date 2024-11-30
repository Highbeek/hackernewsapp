import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecentScreen from '../screens/recent/RecentScreen';
import BottomNavigator from './BottomNavigator';
import LoginScreen from './LoginScreen';
import HomeScreen from '../screens/dashboard/HomeScreen';
import AboutScreen from '../screens/about/AboutScreen';
import StoryDetailScreen from '../screens/StoryDetailScreen';

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
