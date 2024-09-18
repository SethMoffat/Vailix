import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../components/Button'; // Adjust the path as necessary

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2006.svg' }}
          style={styles.logo}
        />
        <Text style={styles.tagline}>Welcome to Vailix</Text>
      </View>
      <Text style={styles.introText}>Join Vailix today.</Text>
      <CustomButton
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
        style={styles.button}
      />
      <CustomButton
        title="Sign in to Vailix"
        onPress={() => navigation.navigate('SignIn')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff', // Light blue background
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  introText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
});