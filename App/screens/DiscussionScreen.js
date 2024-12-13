import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DiscussionScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    // Dữ liệu giả lập bài viết
    const discussions = [
        { id: '1', user: 'Nguyễn Đức Thiện', title: 'Hỏi đáp', content: 'Hiến pháp năm 2013 quy định ngôn ngữ quốc gia là tiếng gì?' },
        { id: '2', user: 'Nguyễn minh triết', title: 'Pháp luật', content: 'Hiến pháp năm 2013 quy định Quốc ca nước Cộng hòa xã hội chủ nghĩa Việt Nam là nhạc và lời của bài:' },
        { id: '3', user: 'Thiện', title: 'Buôn ma tuý', content: 'Buôn ma tuý bao nhiêu thì bị tử hình?' },
    ];

    useEffect(() => {
        // Simulate loading
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const renderDiscussionItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.user[0]}</Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{item.user}</Text>
                </View>
                <TouchableOpacity>
                    <MaterialIcons name="more-vert" size={24} color="#888" />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Discussion</Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#6200EE" />
            ) : (
                <FlatList
                    data={discussions}
                    renderItem={renderDiscussionItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                />
            )}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreatePostScreen')}
            >
                <MaterialIcons name="edit" size={24} color="white" />
                <Text style={styles.fabText}>Viết bài</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 16,
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
    listContent: {
        padding: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#D8ECD4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    userInfo: {
        flex: 1,
        marginLeft: 12,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    content: {
        fontSize: 14,
        color: '#555',
        marginBottom: 12,
    },
    placeholder: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    placeholderShape: {
        width: 40,
        height: 40,
        borderRadius: 4,
        backgroundColor: '#E5E5E5',
    },
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        elevation: 5,
    },
    fabText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default DiscussionScreen;
