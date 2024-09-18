import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ProfilePicture from './ProfilePicture'; // Adjust the path as necessary

export default function Post({ username, content, createdAt, profileImageUrl }) {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <ProfilePicture imageUrl={profileImageUrl} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.createdAt}>{formattedDate}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10, // Add some space between the profile picture and the username
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