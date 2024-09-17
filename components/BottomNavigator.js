import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import FeedTab from '../screens/FeedTab';
import PostScreen from '../screens/PostScreen';
import MeScreen from '../screens/MeScreen'; // Import MeScreen

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'FeedTab') {
            iconName = 'home-outline';
          } else if (route.name === 'Post') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'Me') {
            iconName = 'person-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [{ display: 'flex' }, null],
        headerShown: false, // Hide the top bar
      })}
    >
      <Tab.Screen name="FeedTab" component={FeedTab} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Me" component={MeScreen} />
    </Tab.Navigator>
  );
}