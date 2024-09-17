import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function Post({ username, content, createdAt }) {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.createdAt}>{new Date(createdAt).toLocaleString()}</Text>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: width * 0.75, // 75% of the screen width
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
  createdAt: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});