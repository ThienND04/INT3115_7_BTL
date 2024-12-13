import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ActivityIndicator, ToastAndroid, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ForgotPasswordScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // Trạng thái loading

    const handleForgotPassword = async () => {
        if (email === '') {
            ToastAndroid.show('Vui lòng nhập email!', ToastAndroid.SHORT);
        } else {
            setLoading(true);
            try {
                // Call API to handle forgot password
                // await forgotPassword(email);
                ToastAndroid.show("Yêu cầu đặt lại mật khẩu đã được gửi!", ToastAndroid.SHORT);
                navigation.navigate('Login'); // Điều hướng về màn hình Login
            } catch (error) {
                ToastAndroid.show('Yêu cầu thất bại. Vui lòng thử lại.', ToastAndroid.SHORT);
                console.error('Forgot password error:', error.response?.data || error.message);
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
                    <Text style={styles.title}>Quên mật khẩu</Text>

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

                        {/* Forgot Password Button */}
                        {loading ? (
                            <ActivityIndicator size="large" color="#42a5f5" />
                        ) : (
                            <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
                                <Text style={styles.forgotPasswordText}>Gửi yêu cầu</Text>
                            </TouchableOpacity>
                        )}

                        {/* Footer Links */}
                        <View style={styles.footerLinks}>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.link}>Quay lại đăng nhập</Text>
                            </TouchableOpacity>
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
    forgotPasswordButton: {
        backgroundColor: "#000",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 10,
    },
    forgotPasswordText: {
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
