import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { supabase } from '../SupaBase/supabaseClient';
import SignInButton from '../components/SignInButton'; // Adjust the path as necessary
import OldSignup from '../components/OldSignUp';
import BottomButtons from '../components/BottomButtons';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const session = supabase.auth.session();
      if (session) {
        navigation.navigate('Feed');
      }
    };

    checkSession();
  }, []);

  const handleSignIn = async () => {
    setSignInError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setSignInError(error.message);
      } else if (data.user) {
        navigation.navigate('Feed');
      } else {
        setSignInError('Sign in failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      setSignInError('An unexpected error occurred. Please try again.');
    }
  };

  const handleSignupPress = () => {
    navigation.navigate('SignUp'); // Adjust the navigation target as necessary
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image
            source={require('../assets/TopPNG.png')}
            style={styles.topImage}
          />
          <Text style={styles.title}>Sign In</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {signInError ? <Text style={styles.errorText}>{signInError}</Text> : null}
          <SignInButton title="Sign In" onPress={handleSignIn} />
          <OldSignup onPress={handleSignupPress} />
        </View>
        <BottomButtons />

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Added padding to ensure proper spacing
    paddingVertical: 225, // Added vertical padding to ensure proper spacing
  },
  topImage: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 200, // Adjusted width
    height: 85, // Adjusted height
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
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