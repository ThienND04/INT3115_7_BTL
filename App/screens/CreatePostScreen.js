import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    Image,
} from 'react-native';
import { createPost } from '../service/postApi';
// import * as ImagePicker from 'expo-image-picker';

export default function CreatePostScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [error, setError] = useState('');

    const categories = ['Ma tuý', 'Tội phạm', 'Cờ bạc', 'Giao thông'];

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            ToastAndroid.show('Cần quyền truy cập thư viện ảnh.', ToastAndroid.SHORT);
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.uri);
        }
    };

    const handleCreatePost = () => {
        if (!title || !content || !category) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        // Giả lập tạo bài viết
        try {
            createPost(title, content, category)
            ToastAndroid.show('Bài viết đã được tạo!', ToastAndroid.SHORT);
            navigation.goBack(); // Quay lại màn hình trước
        } catch (e) {
            setError('Error: ', error.response?.data || error.message)
        }
    };

    return (
        <View style={styles.container}>
            {/* Thanh Điều Hướng */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tạo bài viết mới</Text>
            </View>
            <ScrollView contentContainerStyle={styles.inputForm}>

                {/* Thông báo lỗi */}
                {error ? <Text style={styles.error}>{error}</Text> : null}

                {/* Trường Tiêu đề */}
                <Text style={styles.label}>Tiêu đề</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tiêu đề bài viết"
                    value={title}
                    onChangeText={(text) => {
                        setError('');
                        setTitle(text);
                    }}
                />

                {/* Trường Nội dung */}
                <Text style={styles.label}>Nội dung</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Nhập nội dung bài viết"
                    value={content}
                    onChangeText={(text) => {
                        setError('');
                        setContent(text);
                    }}
                    multiline={true}
                    numberOfLines={50}
                />

                {/* Trường Danh mục */}
                <Text style={styles.label}>Danh mục</Text>
                <View style={styles.categoryContainer}>
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryItem,
                                category === cat && styles.selectedCategoryItem,
                            ]}
                            onPress={() => setCategory(cat)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    category === cat && styles.selectedCategoryText,
                                ]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Khu vực chọn ảnh */}
                <Text style={styles.label}>Hình ảnh minh hoạ</Text>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                )}
                <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
                    <Text style={styles.imageButtonText}>
                        {imageUri ? 'Đổi ảnh' : 'Chọn ảnh'}
                    </Text>
                </TouchableOpacity>

                {/* Nút Tạo bài viết */}
                <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
                    <Text style={styles.buttonText}>Tạo bài viết</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    inputForm: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 150,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF',
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
    },
    textArea: {
        // height: 120,
        textAlignVertical: 'top',
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    categoryItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        marginRight: 8,
        marginBottom: 8,
    },
    selectedCategoryItem: {
        backgroundColor: '#000',
    },
    categoryText: {
        color: '#333',
    },
    selectedCategoryText: {
        color: '#FFF',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    imageButton: {
        backgroundColor: '#FF6F00',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    imageButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: "#000",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: '#ff4d4d',
        marginBottom: 16,
        textAlign: 'center',
    },
});
