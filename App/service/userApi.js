import axiosInstance from './axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Đăng nhập
export const loginUser = async (_email, _password) => {
    try {
        console.log("auto login")
        const response = await axiosInstance.post('/auth/login', {
            email: _email,
            password: _password,
            headers: {
                'Content-Type': 'application/json',
                // 'Accept': '*/*',
            }
        });

        console.log(response.data)

        // Lưu token vào AsyncStorage 
        const { email, id, token, type, username } = response.data;

        console.log('Token type:', typeof token);
        console.log(`token: ${token}`);
        console.log(`email: ${email}`);

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', _password);
        await AsyncStorage.setItem('id', id.toString());

        console.log('Login Success')

        return response.data;
    } catch (error) {
        console.log('Login error1:', error);
        throw error;
    }
};

// Đăng ký
export const registerUser = async (userName, email, password) => {
    try {
        const response = await axiosInstance.post(
            '/auth/signup',
            {
                'username' : userName,
                'email' : email,
                'password' : password
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Accept': '*/*',
                }
            }
        );
        console.log('response data', response.data)
        // console.log(axiosInstance.toString())
        return response.data;
    } catch (error) {
        // console.error('Register error:', error);
        console.log('Registration failed:', error);
        // console.log(error.response.data)
        return Promise.reject(error);
    }
};

export const getUserByEmail = async (email) => {
    try {
        const response = await axiosInstance.get(`/user?email=${email}`);

        console.log(response.data)

        return response.data;
    } catch (error) {
        console.log('Login error:', error);
        throw error;
    }
}

export const getAllUser = async () => {
    try {
        const response = await axiosInstance.get(`/user/all`);

        console.log(response.data)

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export const getMyAvatar = async () => {
    try {
        const response = await axiosInstance.get('/user/myAvatar');
        return response.data; // Expected to return the avatar URL or image data
    } catch (error) {
        console.log('Error fetching my avatar:', error.response?.data || error.message);
        throw error;
    }
};

export const getAvatarByUserId = async (id) => {
    try {
        const response = await axiosInstance.get(`/user/Avatar?id=${id}`);
        return response.data; // Expected to return the avatar URL or image data
    } catch (error) {
        console.log(`Error fetching avatar with id = ${id}:`, error.response?.data || error.message);
        throw error;
    }
};