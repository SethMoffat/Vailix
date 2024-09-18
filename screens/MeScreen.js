import React, { useState, useEffect } from 'react';
import { Alert, View, Image, StyleSheet, SafeAreaView, Text, TextInput, Button } from 'react-native';
import { supabase } from '../SupaBase/supabaseClient';
import Loading from '../components/Loading';

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
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../assets/TopPNG.png')}
          style={styles.topImage}
        />
        <Text style={styles.header}>User Profile</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Button title="Update" onPress={handleUpdate} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light grey background
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#ffffff', // White background for the main container
    borderWidth: 1,
    borderColor: '#000000', // Black border
    borderRadius: 5,
    boxShadow: '0px 0px 10px #888888', // Simple shadow effect
  },
  topImage: {
    width: 200,
    height: 85,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0000ff', // Blue text color
    fontFamily: 'Arial', // Basic font
  },
  form: {
    width: '100%',
    alignItems: 'flex-start',
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
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000000', // Black border
    borderRadius: 5,
    backgroundColor: '#ffffff', // White background
    fontFamily: 'Arial', // Basic font
  },
});