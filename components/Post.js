import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Post() {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.postText}>This is a post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  postText: {
    fontSize: 16,
  },
});