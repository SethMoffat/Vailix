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
    borderWidth: 2, // Thick border
    borderColor: '#ccc',
    borderRadius: 10, // Rounded edges
    padding: 10,
    marginVertical: 10,
    width: '80%', // Set the same width as EmailBox
  },
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});