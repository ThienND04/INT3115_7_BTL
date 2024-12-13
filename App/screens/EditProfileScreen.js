import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserByEmail } from '../service/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({
        email: "",
        userName: "",
        userBirthday: "",
        userJob: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = async () => {
        try {
            setLoading(true);
            const { email, userBirthday, userJob, userName } = await getUserByEmail(await AsyncStorage.getItem('email'));
            setUserInfo({
                email: email,
                userName: userName,
                userBirthday: userBirthday,
                userJob: userJob,
            });
            setLoading(false);
        } catch (error) {
            console.log('fetch info error: ', error.message);
        }
    };

    const handleSaveChanges = () => {
        if (!userInfo.email || !userInfo.userName) {
            Alert.alert('Lỗi', 'Email và Tên người dùng không được để trống!');
            return;
        }

        // Giả sử lưu thành công, điều hướng về màn hình Profile
        console.log('Thông tin đã lưu:', userInfo);
        Alert.alert('Thành công', 'Thông tin của bạn đã được cập nhật.');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chỉnh sửa thông tin cá nhân</Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#6200EE" />
            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    {/* Email */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={userInfo.email}
                            onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
                            placeholder="Nhập email"
                            keyboardType="email-address"
                        />
                    </View>

                    {/* Tên người dùng */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Tên người dùng</Text>
                        <TextInput
                            style={styles.input}
                            value={userInfo.userName}
                            onChangeText={(text) => setUserInfo({ ...userInfo, userName: text })}
                            placeholder="Nhập tên người dùng"
                        />
                    </View>

                    {/* Ngày sinh */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Ngày sinh</Text>
                        <TextInput
                            style={styles.input}
                            value={userInfo.userBirthday || ''}
                            onChangeText={(text) => setUserInfo({ ...userInfo, userBirthday: text })}
                            placeholder="Nhập ngày sinh (YYYY-MM-DD)"
                            keyboardType="default"
                        />
                    </View>

                    {/* Nghề nghiệp */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nghề nghiệp</Text>
                        <TextInput
                            style={styles.input}
                            value={userInfo.userJob || ''}
                            onChangeText={(text) => setUserInfo({ ...userInfo, userJob: text })}
                            placeholder="Nhập nghề nghiệp"
                        />
                    </View>

                    {/* Nút chức năng */}
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSaveChanges}
                        >
                            <Text style={styles.buttonText}>Lưu thay đổi</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.buttonText}>Hủy bỏ</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        height: 100,
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    backButton: {
        marginRight: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#28A745',
        padding: 12,
        borderRadius: 8,
        marginRight: 8,
        alignItems: 'center',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#FF3B30',
        padding: 12,
        borderRadius: 8,
        marginLeft: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default EditProfileScreen;
