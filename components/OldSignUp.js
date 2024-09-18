import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function OldSignup({ onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.signupText}>Don't have an account? Sign Up Here.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: 'blue', // Blue text
    textDecorationLine: 'underline', // Underlined text
    fontSize: 16,
    marginHorizontal: 5,
  },
});