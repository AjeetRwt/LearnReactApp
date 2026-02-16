import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import Filter from '../assets/svg/fiter';
import Favorite from '../screens/Favourite';
import Profile from '../assets/svg/profile';
import Fav from '../assets/svg/fav';
import Home from '../assets/svg/home';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarIcon: ({ focused }) => {
          const color = focused ? '#000' : '#999';
          if (route.name === 'Home')
            return focused ? (
              <Home size={24} color={color} />
            ) : (
              <Home size={24} color={color} />
            );
          if (route.name === 'Favorite') return <Fav size={24} color={color} />;
          if (route.name === 'Profile')
            return <Profile size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
