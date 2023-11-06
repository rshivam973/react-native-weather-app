/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet,Text,View,} from 'react-native';

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeScreen from './screens/HomeScreen/HomeScreen';
import { WeatherProvider } from './contexts/WeatherContext';

const App=()=> {
 
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <WeatherProvider>
      <Stack.Navigator>
        <Stack.Screen name='Home' options={{headerShown:false}} component={HomeScreen} />
      </Stack.Navigator>
      </WeatherProvider>
    </NavigationContainer>
  );
}


export default App;
