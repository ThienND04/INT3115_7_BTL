import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const newsData = [
  { id: '1', title: 'Tin tức 1: Nâng cao nhận thức về bạo lực gia đình' },
  { id: '2', title: 'Tin tức 2: Cách phòng chống tệ nạn ma túy' },
  { id: '3', title: 'Tin tức 3: Pháp luật và tệ nạn xã hội' },
];

export default function HomeScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.newsItem}>
      <Text style={styles.newsTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trang chủ</Text>
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.newsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  newsList: {
    paddingBottom: 20,
  },
  newsItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  newsTitle: {
    fontSize: 16,
  },
});
