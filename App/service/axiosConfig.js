import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL cơ bản của backend
const BASE_URL = 'http://172.19.64.1:8080/api/v1';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
    }
});

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const token = AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                console.warn('Token không tồn tại trong AsyncStorage.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy token từ AsyncStorage:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
