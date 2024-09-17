import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../SupaBase/supabaseClient';
import UserForm from '../components/userForm';
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
    <UserForm
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      handleUpdate={handleUpdate}
    />
  );
}