import React, { useEffect, useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen.js";
import QuizScreen from "./screens/QuizzScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen.js";
import LoadingScreen from './screens/LoadingScreen.js';
import SignUpScreen from './screens/SignUpScreen.js';
import PostDetailScreen from './screens/PostDetailScreen.js';
import CreatePostScreen from './screens/CreatePostScreen.js';
import EditProfileScreen from './screens/EditProfileScreen.js';
import DiscussionScreen from './screens/DiscussionScreen.js';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PostDetail"
                    component={PostDetailScreen}
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
                <Stack.Screen
                    name="CreatePost"
                    component={CreatePostScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Discussion"
                    component={DiscussionScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
