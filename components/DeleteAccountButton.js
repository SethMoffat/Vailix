import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DeleteAccountButton = ({ onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onDelete}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#000000',
  },
});

export default DeleteAccountButton;