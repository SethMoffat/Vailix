import React from 'react';
import { View, StyleSheet } from 'react-native';
import Feed from '../components/Feed';

export default function FeedTab() {
  return (
    <View style={styles.container}>
      <Feed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});