import React, {memo} from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RecentScreen from '../screens/recent/RecentScreen';
import HomeScreen from '../screens/dashboard/HomeScreen';
import AboutScreen from '../screens/about/AboutScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {s} from 'react-native-size-matters';

const MainNav = createBottomTabNavigator();

const colors = {
  iconDefault: '#AD79E1',
  iconFocused: '#0099F2',
};

interface TabBarLabelProps {
  focused: boolean;
  label: string;
}

const TabBarLabel: React.FC<TabBarLabelProps> = ({focused, label}) => (
  <Text
    style={{
      color: focused ? colors.iconFocused : colors.iconDefault,
      fontSize: 12,
    }}>
    {label}
  </Text>
);

interface TabBarIconProps {
  icon: string;
  focused: boolean;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({icon, focused}) => (
  <Icon
    name={icon}
    size={24}
    color={focused ? colors.iconFocused : colors.iconDefault}
  />
);

const UserNavigator = () => {
  return (
    <MainNav.Navigator
      screenOptions={{
        tabBarStyle: {
          flexDirection: 'row',
          // alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#cccc',
          paddingTop: s(16),
          height: s(80),
        },
        tabBarShowLabel: true,
        headerShown: false,
      }}>
      <MainNav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <TabBarLabel focused={focused} label="Home" />
          ),
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} icon="home" />
          ),
        }}
      />
      <MainNav.Screen
        name="Recent"
        component={RecentScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <TabBarLabel focused={focused} label="Recent" />
          ),
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} icon="history" />
          ),
        }}
      />
      <MainNav.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <TabBarLabel focused={focused} label="About" />
          ),
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} icon="information-outline" />
          ),
        }}
      />
    </MainNav.Navigator>
  );
};

export default memo(UserNavigator);
