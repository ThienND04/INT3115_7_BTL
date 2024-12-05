import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { loginUser } from '../service/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadingScreen({navigation}) {
    async function AutoLogin() {
        let route = 'Loading'
        try {
            console.log('auto login')
            let email = await AsyncStorage.getItem('email');
            let password = await AsyncStorage.getItem('password');
            let responseData = await loginUser(email, password);
            route = 'Home'
            console.log("AutoLogin response: ", responseData);
        } catch(error) {
            route = 'Login'
            console.log("Auto Login Error: ", error);
        }
        navigation.navigate(route)
    }

    useEffect(() => {
        AutoLogin();
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#42a5f5" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
});
