import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByEmail } from '../service/userApi';

const ProfileScreen = () => {
    const navigation = useNavigation();
    // Thông tin người dùng
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
            setLoading(true)
            const { email, userAvatarlink, userBirthday, userId, userJob, userName } = await getUserByEmail(await AsyncStorage.getItem('email'));
            console.log("email: ", email)
            await setUserInfo({
                email: email,
                userName: userName,
                userBirthday: userBirthday,
                userJob: userJob,
            })
            console.log(userInfo)
            setLoading(false)
        } catch (error) {
            console.log('fetch info error: ', error.message)
        }
    }

    const logOut = async () => {
        try {
            await AsyncStorage.clear()
            navigation.navigate('Login')
            ToastAndroid.show("Đăng xuất!", ToastAndroid.SHORT);
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#6200EE" />
            ) :
                (<ScrollView contentContainerStyle={styles.container}>
                    {/* Ảnh đại diện */}
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{
                                uri: 'https://via.placeholder.com/100', // Link ảnh placeholder
                            }}
                            style={styles.avatar}
                        />
                        <Text style={styles.userName}>{userInfo.userName}</Text>
                    </View>

                    {/* Thông tin người dùng */}
                    <View style={styles.infoContainer}>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.value}>{userInfo.email}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Ngày sinh:</Text>
                            <Text style={styles.value}>
                                {userInfo.userBirthday ? userInfo.userBirthday : "Chưa cập nhật"}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Nghề nghiệp:</Text>
                            <Text style={styles.value}>
                                {userInfo.userJob ? userInfo.userJob : "Chưa cập nhật"}
                            </Text>
                        </View>
                    </View>

                    {/* Các nút chức năng */}
                    <TouchableOpacity
                        style={styles.buttonEdit}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonLogout}
                        onPress={logOut}
                    >
                        <Text style={styles.buttonText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </ScrollView>)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 16,
        backgroundColor: '#f9f9f9',
        // alignItems: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        // backgroundColor: '#FFF',
        height: 100
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
    infoContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        color: '#666',
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonEdit: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        marginLeft: 100,
        marginRight: 100,
        alignItems: 'center',
    },
    buttonLogout: {
        backgroundColor: '#FF3B30',
        padding: 12,
        borderRadius: 8,
        marginLeft: 100,
        marginRight: 100,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
