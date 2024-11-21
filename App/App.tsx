import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-ionicons";

import HomeScreen from "./screens/HomeScreen.js";
import QuizScreen from "./screens/QuizzScreen";
import NewsScreen from "./screens/NewsDetailScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === "Home") {
                            iconName = "home-outline";
                        } else if (route.name === "Quiz") {
                            iconName = "help-circle-outline";
                        } else if (route.name === "News") {
                            iconName = "newspaper-outline";
                        } else if (route.name === "Profile") {
                            iconName = "person-outline";
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#6200EE",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: { backgroundColor: "#F5F5F5" },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Trang Chủ" }} />
                <Tab.Screen name="Quiz" component={QuizScreen} options={{ title: "Câu Đố" }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Hồ Sơ" }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
