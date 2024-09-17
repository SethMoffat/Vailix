import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feed from '../components/Feed';

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Feed/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});