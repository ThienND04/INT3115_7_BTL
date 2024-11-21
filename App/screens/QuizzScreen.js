import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function QuizScreen() {
    // Dữ liệu câu đố mẫu
    const quizData = [
        {
            question: "Câu hỏi 1: Em an com chua?",
            options: ["Chua", "Chưa", "Chửa", "Rồi"],
            correctAnswer: "Chưa",
        },
        {
            question: "Câu hỏi 1: Em an com chua?",
            options: ["Chua", "Chưa", "Chửa", "Rồi"],
            correctAnswer: "Chưa",
        },
        {
            question: "Câu hỏi 1: Em an com chua?",
            options: ["Chua", "Chưa", "Chửa", "Rồi"],
            correctAnswer: "Chưa",
        },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleAnswer = (option) => {
        setSelectedOption(option);
        const isCorrect = option === quizData[currentQuestionIndex].correctAnswer;
        Alert.alert(isCorrect ? "Chính xác!" : "Sai rồi!", isCorrect ? "Bạn đã trả lời đúng." : "Đáp án đúng là: " + quizData[currentQuestionIndex].correctAnswer, [
            { text: "OK", onPress: () => moveToNextQuestion() },
        ]);
    };

    const moveToNextQuestion = () => {
        setSelectedOption(null);
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            Alert.alert("Hoàn thành!", "Bạn đã hoàn thành tất cả các câu hỏi.", [{ text: "OK" }]);
        }
    };

    return (
        <View style={styles.container}>
            {/* Câu hỏi */}
            <Text style={styles.question}>
                {quizData[currentQuestionIndex].question}
            </Text>

            {/* Các lựa chọn */}
            {quizData[currentQuestionIndex].options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.optionButton,
                        selectedOption === option && {
                            backgroundColor: "#FFD700",
                        },
                    ]}
                    onPress={() => handleAnswer(option)}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}

            {/* Nút chuyển câu hỏi */}
            {currentQuestionIndex < quizData.length - 1 && (
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={moveToNextQuestion}
                >
                    <Text style={styles.nextButtonText}>Câu tiếp theo</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
    },
    question: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333333",
    },
    optionButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#F5F5F5",
        marginBottom: 15,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    optionText: {
        fontSize: 16,
        color: "#333333",
    },
    nextButton: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#6200EE",
        alignItems: "center",
    },
    nextButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
