import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getNewPosts } from '../service/postApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
    const navigation = useNavigation();

    const [posts, setPosts] = useState([])
    const [headlinePost, setHeadlinePost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await getNewPosts(0, 20);
            setPosts(data);
            let tmp = null;
            let cnt = 0;

            for (const post of data) {
                cnt ++;
                console.log(cnt);
                if (tmp == null || post.viewCount > tmp.viewCount) {
                    tmp = post
                    console.log('headlinepose ok: ', cnt);
                }
            }
            setHeadlinePost(tmp);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

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

    const renderPost = ({ item }) => (
        <TouchableOpacity
            style={styles.postCard}
            onPress={() => navigation.navigate('PostDetail', { post: item })}
        >
            <Image
                source={{ uri: 'https://images.baodantoc.vn/uploads/2020/Th%C3%A1ng%206/Ng%C3%A0y_16/2051fd49-6d6b-4f43-a023-5e23e07f175c.jpg' }}
                style={styles.postThumbnail}
                onError={(error) => console.log('Error loading image:', error)}
            />
            <View style={styles.postInfo}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postDescription}>{item.content.substring(0, 30) + ' ...'}</Text>
                <View style={styles.postFooter}>
                    <Text style={styles.postDate}>Today • 23 min</Text>
                    <Text style={styles.readMore}>→</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' }}
                    style={styles.avatar}
                />
                <Text style={styles.headerTitle}>Trang chủ</Text>
                <TouchableOpacity onPress={toggleMenu}>
                    <Text style={styles.icon}>☰</Text>
                </TouchableOpacity>
            </View>
            {/* Popup Menu */}
            {menuVisible && (
                <View style={styles.menuContainer}>
                    {/* Overlay nền tối */}
                    <TouchableOpacity
                        style={styles.menuOverlay}
                        onPress={closeMenu}
                        activeOpacity={1}
                    />

                    {/* Menu chính */}
                    <View style={styles.verticalMenu}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                alert('Cài đặt');
                                closeMenu();
                            }}
                        >
                            <Text style={styles.menuText}>Cài đặt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                logOut()
                            }}
                        >
                            <Text style={styles.menuText}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {loading ? (
                <ActivityIndicator size="large" color="#6200EE" />
            ) : (
                <ScrollView>
                    {/* Headline Post */}
                    {headlinePost && (
                        <View style={styles.headline}>
                            <Image source={{ uri: 'https://images.baodantoc.vn/uploads/2020/Th%C3%A1ng%206/Ng%C3%A0y_16/2051fd49-6d6b-4f43-a023-5e23e07f175c.jpg' }} style={styles.headlineImage} />
                            <View style={styles.headlineContent}>
                                <Text style={styles.headlineTitle}>{headlinePost.title}</Text>
                                <Text style={styles.headlineDescription}>{headlinePost.content}</Text>
                                <TouchableOpacity
                                    style={styles.readButton}
                                    onPress={() => navigation.navigate('PostDetail', { post : headlinePost })}
                                >
                                    <Text style={styles.readButtonText}>Đọc</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* Danh sách bài viết mới */}
                    <Text style={styles.sectionTitle}>Tin mới</Text>
                    <FlatList
                        data={posts}
                        renderItem={renderPost}
                        keyExtractor={(item) => item.postId.toString()}
                        contentContainerStyle={styles.postList}
                    />
                </ScrollView>
            )}
            <View style={styles.bottomTab}>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
                    <Icon name="home" size={28} color="#000" />
                    <Text style={styles.tabText}>Trang chủ</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Search')}>
                    <Icon name="search" size={28} color="#000" />
                    <Text style={styles.tabText}>Tìm kiếm</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Quiz')}>
                    <Icon name="quiz" size={28} color="#000" />
                    <Text style={styles.tabText}>Câu đố</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
                    <Icon name="person" size={28} color="#000" />
                    <Text style={styles.tabText}>Hồ sơ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
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
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 16,
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    icon: {
        fontSize: 20,
        color: '#333',
    },
    headline: {
        margin: 16,
        backgroundColor: '#FFF',
        borderRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    headlineImage: {
        width: '100%',
        height: 180,
    },
    headlineContent: {
        padding: 16,
    },
    headlineTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    headlineDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    readButton: {
        backgroundColor: '#6200EE',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    readButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    postList: {
        paddingHorizontal: 16,
    },
    postCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginBottom: 8,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 1,
    },
    postThumbnail: {
        width: 80,
        height: 80,
        margin: 10,
        borderRadius: 8,
        resizeMode: 'contain'
    },
    postContent: {
        flex: 1,
        padding: 10,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    postDescription: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    postDate: {
        fontSize: 12,
        color: '#999',
    },
    postIcon: {
        fontSize: 16,
        color: '#6200EE',
    },
    postInfo: {
        padding: 10
    },
    bottomTab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#f7f6f2',
    },
    tabItem: {
        alignItems: 'center',
        width: '30%'
    },
    tabText: {
        color: '#FFF',
        fontSize: 14,
    },
    bottomTabIcon: {
        width: 20,
        height: 20
    },
    menuContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 999, // Đảm bảo menu luôn trên cùng
    },
    // Overlay nền tối
    menuOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    // Menu chính
    verticalMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '100%',
        backgroundColor: '#fff',
        paddingVertical: 20,
        elevation: 10, // Tăng shadow và độ ưu tiên trên Android
        zIndex: 9999, // Ưu tiên cao nhất cho menu
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    // Item trong menu
    menuItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
    },
    menuText: {
        fontSize: 16,
    },
});