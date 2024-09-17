import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SignInButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e0e0e0', // Light grey background
    borderWidth: 1,
    borderColor: '#000', // Black border
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#000', // Black text
    fontSize: 16,
    fontWeight: 'bold',
  },
});