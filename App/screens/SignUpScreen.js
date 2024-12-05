import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Alert, ToastAndroid, ActivityIndicator, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import { loginUser, registerUser } from '../service/userApi';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); // Trạng thái loading

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const updateUsername = (value) => {
        setUsername(value);
        if (!value) {
            setUsernameError("Username không được để trống.");
        } else {
            setUsernameError("")
        }
    };

    // Hàm tùy chỉnh cập nhật email
    const updateEmail = (value) => {
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Kiểm tra định dạng email
        if (!value) {
            setEmailError("Email không được để trống.");
        }
        else if (!emailRegex.test(value)) {
            setEmailError("Email sai định dạng");
        } else {
            setEmailError("")
        }
    };

    // Hàm tùy chỉnh cập nhật password
    const updatePassword = (value) => {
        setPassword(value);
        if (value.length < 6) {
            setPasswordError("Mật khẩu phải dài ít nhất 6 ký tự.");
        } else {
            setPasswordError("")
        }
    };

    // Hàm tùy chỉnh cập nhật confirmPassword
    const updateConfirmPassword = (value) => {
        setConfirmPassword(value);
        if (value !== password) {
            setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
        } else {
            setConfirmPasswordError("")
        }
    };

    const handleSignUp = async () => {
        let isValid = true;
        setLoading(true);

        // Reset errors
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");

        // Validate username
        if (username.length < 3) {
            setUsernameError("Username phải dài hơn 3.");
            isValid = false;
        } 

        // Validate email
        if (!email) {
            setEmailError("Email không được để trống.");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email không đúng định dạng.");
            isValid = false;
        }

        // Validate password
        if (!password) {
            setPasswordError("Mật khẩu không được để trống.");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Mật khẩu phải dài ít nhất 6 ký tự.");
            isValid = false;
        }

        // Validate confirm password
        if (!confirmPassword) {
            setConfirmPasswordError("Vui lòng xác nhận mật khẩu.");
            isValid = false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
            isValid = false;
        }

        if (isValid) {
            try {
                await registerUser(username, email, password);
                ToastAndroid.show('Đăng kí thành công', ToastAndroid.SHORT);
                navigation.navigate("Login");
            } catch (error) {
                // console.log('Registration failed:', error.response.data);
                ToastAndroid.show(error.response.data, ToastAndroid.SHORT)
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
                    <Text style={styles.title}>Đăng kí</Text>

                    <View style={styles.form}>
                        {/* Username */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Username</Text>
                            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập username"
                                placeholderTextColor="#999"
                                value={username}
                                onChangeText={updateUsername}
                            />
                        </View>

                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập email"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={updateEmail}
                                keyboardType="email-address"
                            />
                        </View>

                        {/* Password */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mật khẩu"
                                placeholderTextColor="#999"
                                secureTextEntry
                                value={password}
                                onChangeText={updatePassword}
                            />
                        </View>

                        {/* Confirm password */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Xác nhận mật khẩu</Text>
                            {confirmPasswordError ? (
                                <Text style={styles.errorText}>{confirmPasswordError}</Text>
                            ) : null}
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập lại mật khẩu"
                                placeholderTextColor="#999"
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={updateConfirmPassword}
                            />
                        </View>

                        {/* SIgn up Button */}
                        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                            <Text style={styles.loginText}>Đăng kí</Text>
                        </TouchableOpacity>

                        {/* Footer Links */}
                        <View style={styles.footerLinks}>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.link}>Bạn đã có tài khoản? Đăng nhập</Text>
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
    errorText: {
        color: "red",
        fontSize: 12,
    },
});
