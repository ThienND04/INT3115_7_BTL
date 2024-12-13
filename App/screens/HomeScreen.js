import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
    const navigation = useNavigation();

    const [posts, setPosts] = useState([]);
    const [headlinePost, setHeadlinePost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const [categories, setCategories] = useState(['Tất cả', 'Ma tuý', 'Tội phạm', 'Cờ bạc', 'Giao thông']);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');

    useEffect(() => {
        fetchPosts();
    }, [selectedCategory]);

    const fetchPosts = async () => {
        try {
            let data;
            if (selectedCategory === 'Tất cả') {
                data = hardcodedPosts;
            } else {
                data = hardcodedPosts.filter(post => post.category === selectedCategory);
            }
            setPosts(data);
            let tmp = null;
            let cnt = 0;

            for (const post of data) {
                cnt++;
                console.log(cnt);
                if (tmp == null || post.viewCount > tmp.viewCount) {
                    tmp = post;
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
            await AsyncStorage.clear();
            navigation.navigate('Login');
            ToastAndroid.show("Đăng xuất!", ToastAndroid.SHORT);
        } catch (error) {
            console.log(error);
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

    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={[styles.categoryItem, selectedCategory === item && styles.selectedCategoryItem]}
            onPress={() => setSelectedCategory(item)}
        >
            <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image
                        source={{ uri: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' }}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Trang chủ</Text>
                <TouchableOpacity onPress={toggleMenu}>
                    <Text style={styles.icon}>☰</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesBar}
                contentContainerStyle={styles.categoriesContentContainer}
            />
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
                                logOut();
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
                <FlatList
                    data={posts}
                    renderItem={renderPost}
                    keyExtractor={(item) => item.postId.toString()}
                    ListHeaderComponent={
                        <>
                            {/* Headline Post */}
                            {headlinePost && (
                                <View style={styles.headline}>
                                    <Image source={{ uri: 'https://images.baodantoc.vn/uploads/2020/Th%C3%A1ng%206/Ng%C3%A0y_16/2051fd49-6d6b-4f43-a023-5e23e07f175c.jpg' }} style={styles.headlineImage} />
                                    <View style={styles.headlineContent}>
                                        <Text style={styles.headlineTitle}>{headlinePost.title}</Text>
                                        <Text style={styles.headlineDescription}>{headlinePost.content}</Text>
                                        <TouchableOpacity
                                            style={styles.readButton}
                                            onPress={() => navigation.navigate('PostDetail', { post: headlinePost })}
                                        >
                                            <Text style={styles.readButtonText}>Đọc</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                            {/* Danh sách bài viết mới */}
                            <Text style={styles.sectionTitle}>Tin mới</Text>
                        </>
                    }
                    contentContainerStyle={styles.postList}
                />
            )}
            <TouchableOpacity
                style={styles.floatingActionButton}
                onPress={() => navigation.navigate('CreatePost')}
            >
                <Icon name="add" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.bottomTab}>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
                    <Icon name="home" size={28} color="#000" />
                    <Text style={styles.tabText}>Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Quiz')}>
                    <Icon name="quiz" size={28} color="#000" />
                    <Text style={styles.tabText}>Câu đố</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => navigation.navigate('Discussion')}
                >
                    <MaterialIcons name="forum" size={28} color="#000" />
                    <Text style={styles.tabText}>Thảo luận</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const hardcodedPosts = [
    { postId: 1, title: 'Nguy cơ từ ma tuý trong học đường', content: 'Ma tuý đang len lỏi vào môi trường học đường, gây ảnh hưởng nghiêm trọng đến thế hệ trẻ.', category: 'Ma tuý', viewCount: 120 },
    { postId: 2, title: 'Hành vi phạm tội gia tăng trong đô thị', content: 'Các khu đô thị lớn đang chứng kiến sự gia tăng đáng kể của các vụ phạm tội, đặc biệt là trộm cắp và cướp giật.', category: 'Tội phạm', viewCount: 180 },
    { postId: 3, title: 'Cảnh báo tác hại của cờ bạc online', content: 'Cờ bạc trực tuyến không chỉ làm mất tiền bạc mà còn gây ảnh hưởng tiêu cực đến tâm lý người chơi.', category: 'Cờ bạc', viewCount: 210 },
    { postId: 4, title: 'Tai nạn giao thông gia tăng trong dịp lễ', content: 'Số lượng tai nạn giao thông tăng cao trong các kỳ nghỉ lễ, chủ yếu do vi phạm tốc độ và uống rượu khi lái xe.', category: 'Giao thông', viewCount: 260 },
    { postId: 5, title: 'Những cách nhận biết ma tuý tổng hợp', content: 'Ma tuý tổng hợp ngày càng phổ biến với nhiều hình thức khác nhau, cần nhận biết để phòng tránh.', category: 'Ma tuý', viewCount: 310 },
    { postId: 6, title: 'Công nghệ và hành vi phạm tội mạng', content: 'Sự phát triển của công nghệ kéo theo các hình thức phạm tội mạng ngày càng tinh vi và khó phát hiện.', category: 'Tội phạm', viewCount: 230 },
    { postId: 7, title: 'Cờ bạc trái phép trong các sòng bài tự phát', content: 'Những sòng bài tự phát tại địa phương gây ra nhiều hậu quả nghiêm trọng cho cộng đồng.', category: 'Cờ bạc', viewCount: 190 },
    { postId: 8, title: 'Biện pháp giảm ùn tắc giao thông tại đô thị', content: 'Các giải pháp thông minh như giao thông thông minh và mở rộng hạ tầng giao thông đang được triển khai.', category: 'Giao thông', viewCount: 280 },
    { postId: 9, title: 'Cảnh giác trước các loại ma tuý mới', content: 'Các loại ma tuý mới xuất hiện liên tục, gây khó khăn trong việc kiểm soát và xử lý.', category: 'Ma tuý', viewCount: 350 },
    { postId: 10, title: 'Những thủ đoạn lừa đảo phổ biến', content: 'Những chiêu trò lừa đảo qua mạng đang khiến nhiều người mất cảnh giác và thiệt hại lớn.', category: 'Tội phạm', viewCount: 270 },
];


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
        height: 100,
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
        // margin: 16,
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
        backgroundColor: '#000',
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
        resizeMode: 'contain',
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
        marginVertical: 4,
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
        padding: 10,
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
        width: '30%',
    },
    tabText: {
        color: '#FFF',
        fontSize: 14,
    },
    bottomTabIcon: {
        width: 20,
        height: 20,
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
    floatingActionButton: {
        position: 'absolute',
        bottom: 80,
        right: 16,
        backgroundColor: '#F7F7F7',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Tạo hiệu ứng nổi
    },
    floatingActionButtonText: {
        marginLeft: 8,
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    categoriesBar: {
        paddingVertical: 10,
        maxHeight: 60,
        minHeight: 60,
        paddingHorizontal: 16,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    categoriesContentContainer: {
        minHeight: 40,
        maxHeight: 40, // Limit the height of the categories bar
    },
    categoryItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        marginRight: 8,
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
});