import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    const navigation = useNavigation();

    const newsData = [
        { id: '1', title: 'Tin tức 1', description: 'Mô tả tin tức 1', time: 'Today • 23 min' },
        { id: '2', title: 'Tin tức 2', description: 'Mô tả tin tức 2', time: 'Today • 23 min' },
        { id: '3', title: 'Tin tức 3', description: 'Mô tả tin tức 3', time: 'Today • 23 min' },
        { id: '4', title: 'Tin tức 4', description: 'Mô tả tin tức 4', time: 'Today • 23 min' },
        { id: '5', title: 'Tin tức 5', description: 'Mô tả tin tức 5', time: 'Today • 23 min' },
        { id: '6', title: 'Tin tức 6', description: 'Mô tả tin tức 6', time: 'Today • 23 min' },
        { id: '7', title: 'Tin tức 7', description: 'Mô tả tin tức 7', time: 'Today • 23 min' },
        { id: '8', title: 'Tin tức 8', description: 'Mô tả tin tức 8', time: 'Today • 23 min' },
    ];

    const renderNewsItem = ({ item }) => (
        <View style={styles.newsItem}>
            <Image style={styles.newsImage} source={{ uri: 'https://via.placeholder.com/50' }} />
            <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDescription}>{item.description}</Text>
                <Text style={styles.newsTime}>{item.time}</Text>
            </View>
            <TouchableOpacity 
                onPress={() =>
                    navigation.navigate('NewsDetails', {
                    title: item.title,
                    description: item.description,
                    imageUri: 'https://via.placeholder.com/300',
                    time: item.time,
                    })
                }>
                <Text style={styles.playButton}>▶</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.mainContent}>
                    <View style={styles.highlight}>
                        <Image style={styles.highlightImage} source={{ uri: 'https://via.placeholder.com/80' }} />
                        <View>
                            <Text style={styles.highlightTitle}>Headline</Text>
                            <Text style={styles.highlightSubtitle}>supporting text</Text>
                            <TouchableOpacity style={styles.readButton}>
                                <Text style={styles.readButtonText}>Đọc</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.paragraph}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                    </Text>
                    <Text style={styles.paragraph}>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...
                    </Text>
                    <Text style={styles.sectionTitle}>Tin mới</Text>
                    <FlatList
                        data={newsData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderNewsItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={<View style={{ height: 50 }} />}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        </ScrollView>
        
    );
}

export function TabBottom() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === "Home") {
                            iconName = "home-outline";
                        } else if (route.name === "Quiz") {
                            iconName = "help-circle-outline";
                        } else if (route.name === "News") {
                            iconName = "newspaper-outline";
                        } else if (route.name === "Profile") {
                            iconName = "person-outline";
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#6200EE",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: { backgroundColor: "#F5F5F5" },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Trang Chủ" }} />
                <Tab.Screen name="Quiz" component={QuizScreen} options={{ title: "Câu Đố" }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Hồ Sơ" }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#6200EE',
        padding: 20,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    mainContent: {
        padding: 20,
    },
    highlight: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    highlightImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
    },
    highlightTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    highlightSubtitle: {
        fontSize: 14,
        color: '#757575',
    },
    readButton: {
        marginTop: 10,
        backgroundColor: '#6200EE',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    readButtonText: {
        color: 'white',
    },
    paragraph: {
        marginBottom: 10,
        fontSize: 14,
        color: '#616161',
    },
    sectionTitle: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    newsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    newsImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#E0E0E0',
        marginRight: 10,
    },
    newsContent: {
        flex: 1,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    newsDescription: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 5,
    },
    newsTime: {
        fontSize: 12,
        color: '#BDBDBD',
    },
    playButton: {
        fontSize: 18,
        color: '#6200EE',
    },
});
