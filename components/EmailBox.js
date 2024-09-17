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
    borderWidth: 2, // Thick border
    borderColor: '#ccc',
    borderRadius: 10, // Rounded edges
    padding: 10,
    marginVertical: 10,
    width: '80%', // Set the same width as PasswordBox
  },
  input: {
    width: '100%',
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});