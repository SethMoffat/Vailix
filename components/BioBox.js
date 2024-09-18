import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function BioBox({ bio, setBio }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Bio:</Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={4}
          placeholder="Write something about yourself..."
          maxLength={150} // Set character limit
        />
        <Text style={styles.charCounter}>{bio.length}/150</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000', // Black text color
    fontFamily: 'Arial', // Basic font
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000', // Black border
    borderRadius: 5,
    backgroundColor: '#ffffff', // White background
    fontFamily: 'Arial', // Basic font
    textAlignVertical: 'top', // Ensure text starts at the top
  },
  charCounter: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: '#888888', // Grey text color for character counter
    fontFamily: 'Arial', // Basic font
  },
});