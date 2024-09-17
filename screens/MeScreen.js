import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { supabase } from '../SupaBase/supabaseClient';

export default function MeScreen() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(user);
        setUsername(user.user_metadata.username || '');
        setEmail(user.email || '');
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const updates = {
      email,
      data: { username },
    };

    // Update user metadata
    const { error } = await supabase.auth.updateUser(updates);

    if (error) {
      Alert.alert('Error updating user:', error.message);
      return; // Exit if there's an error
    }

    // Update the username in the auth.users table
    const { error: updateError } = await supabase
      .from('auth.users') // Reference the correct schema
      .update({ username })
      .eq('id', user.id);

    if (updateError) {
      Alert.alert('Error updating username in users table:', updateError.message);
    } else {
      Alert.alert('User updated successfully!');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
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