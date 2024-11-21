import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import NewsDetailsScreen from './screens/NewsDetailScreen.js';
import QuizScreen from './screens/QuizzScreen.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
                <Stack.Screen name="Quiz" component={QuizScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
