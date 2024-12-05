import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Alert, ActivityIndicator, ToastAndroid, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import { loginUser } from '../service/userApi';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Trạng thái loading

    const handleLogin = async () => {
        if (email === '' || password === '') {
            ToastAndroid.show('Vui lòng nhập đầy đủ thông tin!', ToastAndroid.SHORT);
        } else {
            setLoading(true);
            try {
                const response = await loginUser(email, password);
                console.log('Login response:', response.data);

                ToastAndroid.show("Đăng nhập thành công!", ToastAndroid.SHORT);
                navigation.navigate('Home'); // Điều hướng về màn hình Home
            } catch (error) {
                ToastAndroid.show('Đăng nhập thất bại. Vui lòng thử lại.', ToastAndroid.SHORT);
                console.error('Login error 2:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.inner}>
                    <Text style={styles.title}>Đăng nhập</Text>

                    <View style={styles.form}>
                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập email"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />
                        </View>

                        {/* Password */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mật khẩu"
                                placeholderTextColor="#999"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        {/* Login Button */}
                        {loading ? (
                            <ActivityIndicator size="large" color="#42a5f5" />
                        ) : (
                            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                                <Text style={styles.loginText}>Đăng nhập</Text>
                            </TouchableOpacity>
                        )}

                        {/* Footer Links */}
                        <View style={styles.footerLinks}>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                                <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
                            </TouchableOpacity>
                            <Text style={styles.link}>Quên mật khẩu?</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        width: "90%",
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: "#555",
        marginBottom: 5,
    },
    input: {
        height: 50,
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        borderColor: "#DDD",
        borderWidth: 1,
    },
    loginButton: {
        backgroundColor: "#000",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 10,
    },
    loginText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    footerLinks: {
        marginTop: 20,
        alignItems: "center",
    },
    link: {
        color: "#555",
        fontSize: 14,
        marginTop: 5,
        textDecorationLine: "underline",
    },
});
