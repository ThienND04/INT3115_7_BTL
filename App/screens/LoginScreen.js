import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { loginUser } from '../service/userApi';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Trạng thái loading

    const handleLogin = async () => {
        if (email === '' || password === '') {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin!');
        } else {
            setLoading(true);
            try {
                const response = await loginUser(email, password);
                console.log('Login response:', response.data);

                Alert.alert('Thành công', 'Đăng nhập thành công!');
                navigation.navigate('Home'); // Điều hướng về màn hình Home
            } catch (error) {
                console.error('Login error:', error.response?.data || error.message);
                Alert.alert('Thất bại', 'Đăng nhập thất bại. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {loading ? (
                <ActivityIndicator size="large" color="#42a5f5" />
            ) : (
                <Button title="Đăng nhập" onPress={handleLogin} />
            )}
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
