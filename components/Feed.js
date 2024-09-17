import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Post from './Post';

export default function Feed() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Post />
      <Post />
      <Post />
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});