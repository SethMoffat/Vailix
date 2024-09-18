import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { supabase } from '../SupaBase/supabaseClient'; // Correct the import path
import PasswordBox from '../components/PasswordBox'; // Import PasswordBox component
import EmailBox from '../components/EmailBox'; // Import EmailBox component
import BottomButtons from '../components/BottomButtons'; // Import BottomButtons component

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signUpError, setSignUpError] = useState('');

  const handleSignUp = async () => {
    setEmailError('');
    setPasswordError('');
    setSignUpError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign up error:', error.message);
        setSignUpError(error.message);
        return;
      }

      const user = data.user;

      if (!user) {
        setSignUpError('Sign up failed. Please try again.');
        return;
      }

      // Insert account information into the profiles table
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([{ id: user.id, email }]);

      if (insertError) {
        console.error('Insert profile error:', insertError.message);
        setSignUpError(insertError.message);
      } else {
        alert('Sign up successful!');
        navigation.navigate('FeedScreen'); // Navigate to FeedScreen
      }
    } catch (error) {
      console.error('Error during sign up:', error); // Log detailed error information
      setSignUpError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>Sign Up</Text>
          <EmailBox
            value={email}
            onChangeText={setEmail}
            error={emailError}
          />
          <PasswordBox
            value={password}
            onChangeText={setPassword}
            error={passwordError}
          />
          {signUpError ? <Text style={styles.errorText}>{signUpError}</Text> : null}
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>
        <BottomButtons />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});