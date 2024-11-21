import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NewsDetailsScreen({ route }) {
    const navigation = useNavigation();
    const { title, description, imageUri, time } = route.params;

    return (
        <View style={styles.container}>
            {/* Nội dung bài viết */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Image style={styles.image} source={{ uri: imageUri || 'https://via.placeholder.com/300' }} />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.time}>{time}</Text>
                <Text style={styles.description}>{description}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#6200EE',
    },
    backButton: {
        marginRight: 10,
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentContainer: {
        padding: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#E0E0E0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
    time: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#4F4F4F',
    },
});
