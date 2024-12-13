import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

const QuizTab = createBottomTabNavigator();
const questionsData = [
    {
        question: "Tệ nạn xã hội là gì?",
        options: ["Các hành vi vi phạm pháp luật", "Các hoạt động giải trí lành mạnh", "Các chương trình giáo dục", "Hoạt động từ thiện"],
        correctAnswer: 0,
        category: "Định nghĩa và khái niệm"
    },
    {
        question: "Nguyên nhân chính dẫn đến nghiện ma túy là gì?",
        options: ["Do môi trường sống", "Do tò mò và thiếu hiểu biết", "Do giáo dục không đúng", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Nguyên nhân"
    },
    {
        question: "Tác hại của rượu bia đối với xã hội là gì?",
        options: ["Gây tai nạn giao thông", "Tăng nguy cơ bạo lực gia đình", "Gây tổn hại sức khỏe", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Tác hại"
    },
    {
        question: "Biện pháp nào giúp ngăn chặn tệ nạn cờ bạc?",
        options: ["Tuyên truyền giáo dục", "Tăng cường kiểm tra giám sát", "Hình phạt nghiêm minh", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Phòng chống"
    },
    {
        question: "Hậu quả của bạo lực học đường là gì?",
        options: ["Ảnh hưởng đến tâm lý nạn nhân", "Giảm uy tín của trường học", "Gây xáo trộn xã hội", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Hậu quả"
    },
    {
        question: "Tại sao thanh niên dễ bị lôi kéo vào tệ nạn xã hội?",
        options: ["Thiếu sự quản lý của gia đình", "Tò mò và muốn thử nghiệm", "Ảnh hưởng từ bạn bè", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Nguyên nhân"
    },
    {
        question: "Tệ nạn xã hội có ảnh hưởng đến kinh tế không?",
        options: ["Có, làm giảm năng suất lao động", "Không, chỉ ảnh hưởng đến sức khỏe", "Không ảnh hưởng đáng kể", "Chỉ ảnh hưởng đến cá nhân"],
        correctAnswer: 0,
        category: "Hậu quả"
    },
    {
        question: "Nguyên nhân nào không dẫn đến nghiện ma túy?",
        options: ["Thiếu hiểu biết", "Áp lực xã hội", "Hoạt động thể thao", "Môi trường sống tiêu cực"],
        correctAnswer: 2,
        category: "Nguyên nhân"
    },
    {
        question: "Những người nghiện ma túy thường có hành vi gì?",
        options: ["Trộm cắp để có tiền mua ma túy", "Bỏ bê công việc và học tập", "Có xu hướng bạo lực", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Tác hại"
    },
    {
        question: "Mục đích của việc tuyên truyền phòng chống tệ nạn xã hội là gì?",
        options: ["Nâng cao nhận thức cộng đồng", "Hạn chế người tham gia vào tệ nạn", "Xây dựng xã hội lành mạnh", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Phòng chống"
    },
    {
        question: "Bạo lực gia đình có phải là một tệ nạn xã hội không?",
        options: ["Có, ảnh hưởng đến gia đình và xã hội", "Không, chỉ là vấn đề cá nhân", "Không liên quan đến xã hội", "Chỉ ảnh hưởng đến người bị bạo lực"],
        correctAnswer: 0,
        category: "Định nghĩa và khái niệm"
    },
    {
        question: "Hành vi nào không thuộc tệ nạn xã hội?",
        options: ["Học tập chăm chỉ", "Nghiện ma túy", "Cờ bạc", "Mại dâm"],
        correctAnswer: 0,
        category: "Định nghĩa và khái niệm"
    },
    {
        question: "Tệ nạn xã hội có thể ảnh hưởng đến tâm lý như thế nào?",
        options: ["Gây lo âu và căng thẳng", "Gây trầm cảm", "Mất niềm tin vào cuộc sống", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Tác hại"
    },
    {
        question: "Nguyên nhân nào dẫn đến tệ nạn bạo lực học đường?",
        options: ["Thiếu sự quan tâm của gia đình", "Áp lực từ bạn bè", "Ảnh hưởng từ mạng xã hội", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Nguyên nhân"
    },
    {
        question: "Tại sao cờ bạc bị xem là một tệ nạn xã hội?",
        options: ["Gây mất tiền bạc", "Làm suy giảm đạo đức", "Gây tan vỡ gia đình", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Định nghĩa và khái niệm"
    },
    {
        question: "Hình thức tuyên truyền nào hiệu quả nhất trong việc phòng chống tệ nạn xã hội?",
        options: ["Tổ chức hội thảo", "Sử dụng mạng xã hội", "Đưa vào chương trình giáo dục", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Phòng chống"
    },
    {
        question: "Ma túy tổng hợp gây hại gì cho người sử dụng?",
        options: ["Phá hủy hệ thần kinh", "Gây hoang tưởng và ảo giác", "Dẫn đến nghiện nặng", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Tác hại"
    },
    {
        question: "Hậu quả của mại dâm đối với xã hội là gì?",
        options: ["Lây lan các bệnh xã hội", "Tăng tỷ lệ tội phạm", "Phá vỡ hạnh phúc gia đình", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Hậu quả"
    },
    {
        question: "Nguyên nhân nào không phải là yếu tố dẫn đến bạo lực gia đình?",
        options: ["Tình yêu thương trong gia đình", "Áp lực kinh tế", "Rượu bia", "Thiếu kỹ năng quản lý cảm xúc"],
        correctAnswer: 0,
        category: "Nguyên nhân"
    },
    {
        question: "Hình thức hỗ trợ nào giúp người nghiện ma túy tái hòa nhập cộng đồng?",
        options: ["Tạo công ăn việc làm", "Tư vấn tâm lý", "Hỗ trợ cai nghiện", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Phòng chống"
    },
    {
        question: "Tại sao giáo dục là biện pháp quan trọng để ngăn chặn tệ nạn xã hội?",
        options: ["Giúp nâng cao nhận thức", "Giúp trẻ tránh bị lôi kéo", "Xây dựng ý thức trách nhiệm", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Phòng chống"
    },
    {
        question: "Lứa tuổi nào dễ bị tác động bởi tệ nạn xã hội nhất?",
        options: ["Trẻ em", "Thanh thiếu niên", "Người trưởng thành", "Người cao tuổi"],
        correctAnswer: 1,
        category: "Đối tượng"
    },
    {
        question: "Biện pháp nào là hiệu quả nhất để giảm thiểu bạo lực học đường?",
        options: ["Giáo dục kỹ năng sống", "Tăng cường kỷ luật học đường", "Hỗ trợ tâm lý cho học sinh", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Phòng chống"
    },
    {
        question: "Cơ quan nào chịu trách nhiệm chính trong việc phòng chống tệ nạn xã hội?",
        options: ["Công an", "Ủy ban nhân dân", "Trường học", "Tất cả các cơ quan liên quan"],
        correctAnswer: 3,
        category: "Định nghĩa và khái niệm"
    },
    {
        question: "Hành vi nào là giải pháp tích cực để phòng chống nghiện game online?",
        options: ["Tăng cường các hoạt động ngoại khóa", "Quản lý thời gian chơi game", "Tuyên truyền về tác hại của nghiện game", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Phòng chống"
    },
    {
        question: "Nạn buôn người thường nhắm vào đối tượng nào?",
        options: ["Phụ nữ và trẻ em", "Người cao tuổi", "Người giàu có", "Người học cao"],
        correctAnswer: 0,
        category: "Đối tượng"
    },
    {
        question: "Hậu quả của nghiện game online đối với trẻ em là gì?",
        options: ["Suy giảm sức khỏe", "Học tập sa sút", "Giảm kỹ năng giao tiếp", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Tác hại"
    },
    {
        question: "Những ai có vai trò quan trọng trong việc ngăn chặn tệ nạn xã hội?",
        options: ["Gia đình", "Nhà trường", "Cơ quan chức năng", "Tất cả các ý trên"],
        correctAnswer: 3,
        category: "Phòng chống"
    }
]



function QuizzHomeScreen({navigation}) {
    const categories = [
        { id: '1', title: 'Định nghĩa và khái niệm', updatedAt: 'Updated today' },
        { id: '2', title: 'Nguyên nhân', updatedAt: 'Updated today' },
        { id: '3', title: 'Tác hại', updatedAt: 'Updated today' },
        { id: '4', title: 'Phòng chống', updatedAt: 'Updated today' },
        { id: '5', title: 'Hậu quả', updatedAt: 'Updated today' },
    ];

    const [recentQuizzes, setRecentQuizzes] = useState(
            categories.map(category => ({
            id: category.id,
            title: category.title,
            questions: questionsData.filter(q => q.category === category.title).length,
            status: 'Incomplete'
        }))
    );

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
                navigation.navigate('Câu hỏi', { category: item.title });
                addRecentQuiz(item.title, 'Incomplete')
        }}
        >
            <View style={styles.placeholderIcon} />
            <Text style={styles.categoryTitle} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
            <Text style={styles.categorySubtitle}>{item.updatedAt}</Text>
        </TouchableOpacity>
    );

    const handleRandomCategory = () => {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        navigation.navigate('Câu hỏi', { category: randomCategory.title });
        addRecentQuiz(randomCategory.title, 'Incomplete');
    };

    const addRecentQuiz = (title, status) => {
        setRecentQuizzes(prevQuizzes => {
            const existingQuiz = prevQuizzes.find(quiz => quiz.title === title);
            if (existingQuiz) {
                return [
                    { ...existingQuiz, status },
                    ...prevQuizzes.filter(quiz => quiz.title !== title)
                ];
            } else {
                return [
                    { id: (prevQuizzes.length + 1).toString(), title, questions: questionsData.filter(q => q.category === title).length, status },
                    ...prevQuizzes
                ];
            }
        });
    };

    const renderRecentItem = ({ item }) => (
        <View style={styles.recentItem}>
            <View style={styles.recentplaceholderIcon} />
            <View style={styles.recentTextContainer}>
                <Text style={styles.recentTitle}>{item.title}</Text>
                <Text style={styles.recentSubtitle}>{item.questions} câu hỏi</Text>
            </View>
            <Text style={[styles.status, item.status === 'Completed' ? styles.completed : styles.incomplete]}>
                {item.status}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
             {/* TopAppBar with Back Button */}
             <View style={styles.topAppBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Trang chủ</Text>
            </View>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chào bạn User,</Text>
                <Text style={styles.headerSubtitle}>Tiến hành trả lời câu hỏi để nâng cao độ hiểu biết về các vấn đề tệ nạn xã hội và kiểm tra kiến thức của bạn!</Text>
                <TouchableOpacity style={styles.startButton} onPress={handleRandomCategory}>
                    
                    <Text style={styles.startButtonText}>Trả lời bộ câu hỏi ngẫu nhiên </Text>
                    <Icon name="random" size={12} color="#FFF" />
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

function QuestionsScreen({ route, navigation }) {
    const { category } = route.params || {};

    if (!category) {
        alert(
            "Thông báo",
            "Vui lòng chọn một danh mục câu hỏi trước.",
            [
                { text: "OK", onPress: () => navigation.navigate('Trang chủ') }
            ]
        );
        return null;
    }
    const filteredQuestions = questionsData.filter(q => q.category === category)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const totalQuestions = filteredQuestions.length; // Total number of questions
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionPress = (index) => {
        setSelectedOption(index);
        if (index === filteredQuestions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        setTimeout(() => {
            setSelectedOption(null);
            if (currentQuestion < totalQuestions - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                // Hiển thị kết quả hoặc làm gì đó khi hoàn thành tất cả các câu hỏi
                alert(`Bạn đã hoàn thành! Điểm của bạn là ${score}/${totalQuestions}`);
                navigation.navigate('Trang chủ', { updateRecentQuiz: { title: category, status: 'Completed' } });
            }
        }, 200); // Chuyển sang câu hỏi tiếp theo sau 0.5 giây
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.quizzheader}>
                <View style={styles.questionProgress}>
                    <Text style={styles.progressText}>Bộ câu hỏi {category} </Text>
                </View>
                <Text style={styles.progressText}>Câu {currentQuestion + 1} trên {totalQuestions}</Text>
            </View>

            {/* Question */}
            <ScrollView style={styles.questionContainer}>
                <Text style={styles.questionText}>{filteredQuestions[currentQuestion].question}</Text>
            </ScrollView>
            <View style={styles.divider} />
            {/* Options */}
            <Text style={styles.scoreText}>Điểm: {score}</Text>
            <Text style={styles.selectInstruction}>Chọn câu trả lời đúng</Text>
                <View style={styles.optionsContainer}>
                {filteredQuestions[currentQuestion].options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selectedOption === index && styles.optionButton
                        ]}
                        onPress={() => handleOptionPress(index)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Footer Buttons */}
            {/*
            <View style={styles.footer}>
                <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                    <Text style={styles.nextText}>Tiếp</Text>
                </TouchableOpacity>
            </View>
            */}
        
        </View>
    );
}

export default function QuizScreen() {
    return (
        <QuizTab.Navigator>
            <QuizTab.Screen 
                name="Trang chủ" 
                component={QuizzHomeScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                }}
            />
            <QuizTab.Screen 
                name="Câu hỏi" 
                component={QuestionsScreen}
                options={{
                    tabBarIcon: ({color,size}) => (
                        <Icon name="question-circle" color={color} size={size} /> 
                    ),
                }} 
            />
        </QuizTab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
    },
    backButton: {
        marginRight: 16,
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
        flexDirection:'row',
        backgroundColor: '#4CAF50',
        alignItems: 'center',
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
    questionContainer: {
        flex: 1,
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
        flex: 0,
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

    nextButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 8,
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
    scoreText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'right'
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

