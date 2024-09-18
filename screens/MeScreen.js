import React, { useState, useEffect } from 'react';
import { Alert, View, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '../SupaBase/supabaseClient';
import Loading from '../components/Loading';
import BioBox from '../components/BioBox'; // Import BioBox
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import DeleteAccountButton from '../components/DeleteAccountButton'; // Import DeleteAccountButton

export default function MeScreen() {
  const [user, setUser] = useState(null);
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState(''); // Add state for bio
  const [profilePicture, setProfilePicture] = useState(''); // Add state for profile picture

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(user);
        setHandle(user.user_metadata.handle || '');
        setEmail(user.email || '');
        setBio(user.user_metadata.bio || ''); // Fetch bio if available
        setProfilePicture(user.user_metadata.profile_picture || ''); // Fetch profile picture if available
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const updates = {
      email,
      data: { handle, bio, profile_picture: profilePicture }, // Include handle, bio, and profile picture in updates
    };

    // Update user metadata
    const { error: authError } = await supabase.auth.updateUser(updates);

    if (authError) {
      Alert.alert('Error updating user:', authError.message);
      console.error('Auth update error:', authError);
      return; // Exit if there's an error
    }

    // Update the handle, bio, and profile picture in the users table
    const { data, error: updateError } = await supabase
      .from('users') // Ensure the correct table name
      .update({ handle, bio, profile_picture: profilePicture })
      .eq('id', user.id);

    if (updateError) {
      Alert.alert('Error updating user in users table:', updateError.message);
      console.error('Table update error:', updateError);
    } else {
      Alert.alert('User updated successfully!');
      console.log('Update response:', data);
    }
  };

  const handleHandleChange = (text) => {
    console.log('Handle before set:', text);
    setHandle(text);
    console.log('Handle after set:', handle);
  };

  const handleDeleteAccount = async () => {
    const { error } = await supabase.auth.api.deleteUser(user.id);
    if (error) {
      Alert.alert('Error deleting account:', error.message);
      console.error('Delete account error:', error);
    } else {
      Alert.alert('Account deleted successfully!');
      console.log('Account deleted');
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Icon
          name="user-circle"
          size={100}
          color="#000000" // Black color for the icon
          style={styles.profileIcon}
        />
        <Text style={styles.header}>User Profile</Text>
        <View style={styles.form}>
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
            editable={false} // Make email unchangeable
            keyboardType="email-address"
          />
          <BioBox bio={bio} setBio={setBio} />
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <DeleteAccountButton onDelete={handleDeleteAccount} />
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
  profileIcon: {
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
  button: {
    backgroundColor: '#e0e0e0', // Light grey background
    borderWidth: 1,
    borderColor: '#000000', // Black border
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000', // Black text color
    fontFamily: 'Arial', // Basic font
    fontSize: 16,
  },
});