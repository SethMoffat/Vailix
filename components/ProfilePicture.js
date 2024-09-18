import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfilePicture({ imageUrl }) {
  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
      ) : (
        <Ionicons name="person-circle-outline" size={50} color="gray" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50, // Adjust the size as necessary
    height: 50, // Adjust the size as necessary
    borderRadius: 25, // Make it a circle
    overflow: 'hidden', // Ensure the image is clipped to the container
    backgroundColor: '#ccc', // Fallback background color
    justifyContent: 'center', // Center the icon/image
    alignItems: 'center', // Center the icon/image
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image covers the container
  },
});