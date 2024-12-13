import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateDiscussionScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleCreateDiscussion = () => {
        if (!user || !title || !content) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Handle the creation of the discussion (e.g., API call)
        console.log('Discussion created:', { user, title, content });
        Alert.alert('Thành công', 'Bài viết của bạn đã được tạo.');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tạo bài viết</Text>
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Người dùng</Text>
                <TextInput
                    style={styles.input}
                    value={user}
                    onChangeText={setUser}
                    placeholder="Nhập tên người dùng"
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Tiêu đề</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Nhập tiêu đề"
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nội dung</Text>
                <TextInput
                    style={styles.input}
                    value={content}
                    onChangeText={setContent}
                    placeholder="Nhập nội dung"
                    multiline
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCreateDiscussion}>
                <Text style={styles.buttonText}>Tạo bài viết</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    button: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CreateDiscussionScreen;
