import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PasswordBox({ value, onChangeText, error }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
        <Ionicons
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1, // Simple border
    borderColor: '#000', // Black border
    borderRadius: 0, // No rounded edges
    padding: 5, // Basic padding
    marginVertical: 10,
    width: '80%', // Set the same width as EmailBox
    backgroundColor: '#fff', // White background
  },
  input: {
    flex: 1,
    padding: 5, // Basic padding
    borderWidth: 1, // Simple border
    borderColor: '#000', // Black border
    backgroundColor: '#fff', // White background
  },
  icon: {
    padding: 5, // Basic padding
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});