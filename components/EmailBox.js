import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function EmailBox({ value, onChangeText, error }) {
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
    onChangeText(email);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={value}
        onChangeText={validateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {!isValidEmail && <Text style={styles.errorText}>Invalid email address</Text>}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1, // Simple border
    borderColor: '#000', // Black border
    borderRadius: 0, // No rounded edges
    padding: 5, // Basic padding
    marginVertical: 10,
    width: '80%', // Set the same width as PasswordBox
    backgroundColor: '#fff', // White background
  },
  input: {
    width: '100%',
    padding: 5, // Basic padding
    borderWidth: 1, // Simple border
    borderColor: '#000', // Black border
    backgroundColor: '#fff', // White background
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});