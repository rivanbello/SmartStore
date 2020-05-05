import React from 'react';
import {
  LoginScreen,
  HomeScreen,
  ProductScreen,
  CategoryScreen,
} from '../../src/components/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const HomeStack = ({ logged = true }) => (
  <Tab.Navigator initialRouteName={!logged ? "Login" : "Main"}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Info" component={HomeScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Perfil" component={HomeScreen} options={{ headerShown: false }}/>
  </Tab.Navigator>
);

export default HomeStack;