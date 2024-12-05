import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function PostDetailScreen({ route }) {
    const navigation = useNavigation();
    const { post } = route.params;

    return (
        <View style={styles.container}>
            {/* Thanh Điều Hướng */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bài viết</Text>
            </View>

            {/* Ảnh Minh Họa */}
            <Image
                source={{ uri: 'https://images.baodantoc.vn/uploads/2020/Th%C3%A1ng%206/Ng%C3%A0y_16/2051fd49-6d6b-4f43-a023-5e23e07f175c.jpg' }} // Đổi URL thành ảnh bài viết
                style={styles.postImage}
                resizeMode="cover"
            />

            {/* Nội dung Bài viết */}
            <ScrollView style={styles.contentContainer}>
                {/* Tiêu đề */}
                <Text style={styles.title}>{post.title}</Text>

                {/* Danh mục và ngày */}
                <View style={styles.metaContainer}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>{post.category}</Text>
                    </View>
                    <Text style={styles.date}>{new Date(post.date).toLocaleDateString()}</Text>
                </View>

                {/* Nội dung */}
                <Text style={styles.content}>{post.content}</Text>

                {/* Thông tin khác */}
                <View style={styles.footer}>
                    <Text style={styles.viewCount}>Lượt xem: {post.viewCount}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        padding: 20,
        backgroundColor: '#FFF',
        elevation: 3,
        height: 100
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    postImage: {
        width: '100%',
        height: 200, // Chiều cao ảnh
        backgroundColor: '#f0f0f0',
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    category: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginBottom: 16,
    },
    footer: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    viewCount: {
        fontSize: 14,
        color: '#666',
    },
    tag: {
        backgroundColor: '#969695',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});