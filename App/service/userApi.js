import axiosInstance from './axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Đăng nhập
export const loginUser = async (_email, _password) => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email: _email,
            password: _password,
        });

        console.log(response.data)
        
        // Lưu token vào AsyncStorage 
        const { email, id, token, type, username } = response.data;

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('id', id.toString());

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Đăng ký
export const registerUser = async (userName, email, password) => {
    try {
        const response = await axiosInstance.post('/auth/signup', { userName, email, password });

        return response.data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};

export const getUserByEmail = async(email) => {
    try {
        const response = await axiosInstance.get(`/user?email=${email}`);

        console.log(response.data)

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export const getAllUser = async() => {
    try {
        const response = await axiosInstance.get(`/user/all`);

        console.log(response.data)

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}