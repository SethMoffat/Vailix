import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function UserForm({ handle, setHandle, email, setEmail, handleUpdate }) {
  const handleHandleChange = (text) => {
    // Ensure the handle starts with '@'
    if (!text.startsWith('@')) {
      text = '@' + text;
    }
    setHandle(text);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Handle</Text>
        <TextInput
          style={styles.input}
          value={handle}
          onChangeText={handleHandleChange}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={false} // Make email unchangeable
          keyboardType="email-address"
        />
        <Button title="Update" onPress={handleUpdate} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});