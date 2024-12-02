import React, { useEffect, useState } from 'react';
import  {ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Icon from "react-native-ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from "./screens/HomeScreen.js";
import QuizScreen from "./screens/QuizzScreen";
import NewsScreen from "./screens/NewsDetailScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen.js";
import NewsDetailsScreen from "./screens/NewsDetailScreen";
import { loginUser } from "./service/userApi.js";
import LoadingScreen from './screens/LoadingScreen.js';

const Stack = createStackNavigator();

export default function App() {
    const [loading, setLoading] = useState(true);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Loading'>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NewsDetail"
                    component={NewsDetailsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Quiz"
                    component={QuizScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Loading"
                    component={LoadingScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
