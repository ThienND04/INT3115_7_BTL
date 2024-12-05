import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const QuizTab = createBottomTabNavigator();

function QuizzHomeScreen() {
    const categories = [
        { id: '1', title: 'Title', updatedAt: 'Updated today' },
        { id: '2', title: 'Title', updatedAt: 'Updated today' },
        { id: '3', title: 'Title', updatedAt: 'Updated today' },
        { id: '4', title: 'Title', updatedAt: 'Updated today' },
        { id: '5', title: 'Title', updatedAt: 'Updated today' },
    ];

    const recentQuizzes = [
        { id: '1', title: 'Title', questions: 20, status: 'Completed' },
        { id: '2', title: 'Title', questions: 15, status: 'Incomplete' },
        { id: '3', title: 'Title', questions: 20, status: 'Completed' },
        { id: '4', title: 'Title', questions: 10, status: 'Completed' },
        { id: '5', title: 'Title', questions: 15, status: 'Incomplete' },
    ];

    const renderCategoryItem = ({ item }) => (
        <View style={styles.categoryItem}>
            <View style={styles.placeholderIcon} />
            <Text style={styles.categoryTitle}>{item.title}</Text>
            <Text style={styles.categorySubtitle}>{item.updatedAt}</Text>
        </View>
    );

    const renderRecentItem = ({ item }) => (
        <View style={styles.recentItem}>
            <View style={styles.recentplaceholderIcon} />
            <View style={styles.recentTextContainer}>
                <Text style={styles.recentTitle}>{item.title}</Text>
                <Text style={styles.recentSubtitle}>{item.questions} questions</Text>
            </View>
            <Text style={[styles.status, item.status === 'Completed' ? styles.completed : styles.incomplete]}>
                {item.status}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chào bạn User,</Text>
                <Text style={styles.headerSubtitle}>Bạn đã hoàn thành 15/30 bộ câu hỏi</Text>
                <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.startButtonText}>Tiếp tục bộ câu hỏi 1 !</Text>
                </TouchableOpacity>
            </View>

            {/* Categories */}
            <Text style={styles.sectionTitle}>Danh mục câu hỏi</Text>
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
            />

            {/* Recent quizzes */}
            <Text style={styles.sectionTitle}>Gần đây</Text>
            <FlatList
                data={recentQuizzes}
                renderItem={renderRecentItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.recentList}
            />
        </View>
    );
}

function QuestionsScreen() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const totalQuestions = 10; // Total number of questions
    const question = 'Chất gây nghiện là gì?';
    const options = [
        'Là chất kích thích',
        'Là chất gây ức chế thần kinh',
        'Là chất dễ gây tình trạng nghiện',
        'Cả 3 đáp án trên',
    ];

    const renderOption = (option, index) => (
        <TouchableOpacity key={index} style={styles.optionButton}>
            <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.quizzheader}>
                <View style={styles.questionProgress}>
                    <Text style={styles.progressText}>Bộ câu hỏi 1</Text>
                </View>
                <Text style={styles.progressText}>Câu {currentQuestion} trên {totalQuestions}</Text>
            </View>

            {/* Question */}
            <Text style={styles.questionText}>{question}</Text>
            <View style={styles.divider} />
            {/* Options */}
            <Text style={styles.selectInstruction}>Chọn câu trả lời đúng</Text>
            <View style={styles.optionsContainer}>
                {options.map((option, index) => renderOption(option, index))}
            </View>

            {/* Footer Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.hintButton}>
                    <Text style={styles.hintText}>Gợi ý</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton}
                    onPress={() => setCurrentQuestion(currentQuestion + 1)}
                >
                    <Text style={styles.nextText}>Tiếp</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function QuizScreen() {
    return (
        <QuizTab.Navigator>
            <QuizTab.Screen name="Trang chủ" component={QuizzHomeScreen} />
            <QuizTab.Screen name="Câu hỏi" component={QuestionsScreen} />
        </QuizTab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
    },
    header: {
        marginBottom: 24,
        padding: 16,
        backgroundColor: '#EDE9D7',
        borderRadius: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    startButton: {
        backgroundColor: '#4CAF50',
        marginTop: 8,
        marginBottom: 8,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    startButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    categoriesList: {
        marginBottom: 8,
    },
    categoryItem: {
        width: 100,
        height: 200,
        //backgroundColor: '#F3F3F3',
        marginRight: 8,
        borderRadius: 8,
        alignItems: 'left',
        //justifyContent: 'center',
        padding: 4,
    },
    placeholderIcon: {
        width: 90,
        height: 90,
        backgroundColor: '#CCC',
        borderRadius: 16,
        marginBottom: 8,
    },
    categoryTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        //textAlign: 'left',
    },
    categorySubtitle: {
        fontSize: 12,
        color: '#666',
        //textAlign: 'left',
    },
    recentList: {
        paddingTop: 4,
    },
    recentplaceholderIcon: {
        width: 80,
        height: 80,
        backgroundColor: '#CCC',
        borderRadius: 16,
        marginBottom: 4,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        //padding: 0,
        //backgroundColor: '#F3F3F3',
        borderRadius: 8,
    },
    recentTextContainer: {
        flex: 1,
        marginLeft: 12,
    },
    recentTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    recentSubtitle: {
        fontSize: 12,
        color: '#666',
    },
    status: {
        fontSize: 12,
        fontWeight: 'bold',
        padding: 4,
        borderRadius: 4,
    },
    completed: {
        color: '#FFF',
        backgroundColor: '#4CAF50',
    },
    incomplete: {
        color: '#FFF',
        backgroundColor: '#F44336',
    },
    quizzheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    questionProgress: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 16,
    },
    progressText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    questionText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 250,
    },
    selectInstruction: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    optionsContainer: {
        marginBottom: 16,
        backgroundColor: '#E3E1E9',
        padding: 16,
        borderRadius: 30,
    },
    optionButton: {
        backgroundColor: '#F5F2FA',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 24,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    hintButton: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        backgroundColor: '#F5F2FA',
        borderRadius: 8,
    },
    hintText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    nextButton: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        backgroundColor: '#90CAF9',
        borderRadius: 8,
    },
    nextText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    divider: {
        height: 1,
        backgroundColor: '#CCC',
        marginVertical: 16,
    },



    score: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    points: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4CAF50', // Màu xanh
        marginBottom: 20,
    },
    congratulations: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
    },
    pointsText: {
        fontSize: 20,
        color: '#FFD700', // Màu vàng
    },
});

