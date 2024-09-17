import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { supabase } from '../SupaBase/supabaseClient'; // Correct the import path
import PasswordBox from '../components/PasswordBox'; // Import PasswordBox component
import EmailBox from '../components/EmailBox'; // Import EmailBox component

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

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setSignUpError(error.message);
    } else {
      alert('Check your email for the confirmation link!');
      navigation.navigate('Home');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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