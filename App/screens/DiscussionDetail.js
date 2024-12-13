import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const DiscussionDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { discussion } = route.params;
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([
        { id: '1', user: 'Tô Linh', avatar: 'https://inkythuatso.com/uploads/thumbnails/800/2022/03/4a7f73035bb4743ee57c0e351b3c8bed-29-13-53-17.jpg', text: 'Tôi có cùng câu hỏi?' },
        { id: '2', user: 'Rau Diếp', avatar: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg', text: 'Tiếng Việt' },
    ]);
    const [newComment, setNewComment] = useState('');
    const [likes, setLikes] = useState(discussion.likes);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        setComments([...comments, { id: comments.length.toString(), user: 'New User', avatar: 'https://via.placeholder.com/40', text: newComment }]);
        setNewComment('');
    };

    const renderCommentItem = ({ item }) => (
        <View style={styles.commentItem}>
            <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
            <View style={styles.commentContent}>
                <Text style={styles.commentUser}>{item.user}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Discussion Detail</Text>
                </View>
                {loading ? (
                    <ActivityIndicator size="large" color="#6200EE" />
                ) : (
                    <View style={styles.content}>
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>{discussion.user[0]}</Text>
                                </View>
                                <View style={styles.userInfo}>
                                    <Text style={styles.username}>{discussion.user}</Text>
                                </View>
                            </View>
                            <Text style={styles.title}>{discussion.title}</Text>
                            <Text style={styles.contentText}>{discussion.content}</Text>
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
                                    <Icon name="thumb-up" size={24} color={liked ? "#0000FF" : "#888"} />
                                    <Text style={[styles.actionText, liked && styles.likedText]}>Like ({likes})</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.commentsSection}>
                            <Text style={styles.commentsTitle}>Comments</Text>
                            <FlatList
                                data={comments}
                                renderItem={renderCommentItem}
                                keyExtractor={(item) => `${item.id}-${item.user}`}
                                contentContainerStyle={styles.commentsList}
                            />
                        </View>
                    </View>
                )}
                <View style={styles.commentInputContainer}>
                    <TextInput
                        style={styles.commentInput}
                        value={newComment}
                        onChangeText={setNewComment}
                        placeholder="Add a comment..."
                    />
                    <TouchableOpacity onPress={handleAddComment} style={styles.addCommentButton}>
                        <Icon name="send" size={24} color="#4CAF50" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    content: {
        padding: 16,
        flex: 1,
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
    contentText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 12,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    actionText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#888',
    },
    likedText: {
        color: '#0000FF',
    },
    commentsSection: {
        marginTop: 16,
        flex: 1,
    },
    commentsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    commentsList: {
        paddingBottom: 16,
    },
    commentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 1,
    },
    commentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    commentContent: {
        flex: 1,
    },
    commentUser: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    commentText: {
        fontSize: 14,
        color: '#333',
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    commentInput: {
        flex: 1,
        height: 48,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    addCommentButton: {
        marginLeft: 8,
    },
});

export default DiscussionDetail;
