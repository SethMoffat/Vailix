import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { supabase } from '../SupaBase/supabaseClient';

export default function PostScreen({ navigation }) {
  const [content, setContent] = useState('');
  const [postError, setPostError] = useState('');

  const handlePost = async () => {
    setPostError('');

    if (!content) {
      setPostError('Content is required');
      return;
    }

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        setPostError('You must be logged in to post');
        return;
      }

      const { error } = await supabase
        .from('posts')
        .insert([{ user_id: user.id, content }]);

      if (error) {
        console.error('Error creating post:', error.message);
        setPostError(error.message);
      } else {
        Alert.alert('Post created successfully!');
        navigation.navigate('FeedTab'); // Navigate back to FeedScreen
      }
    } catch (error) {
      console.error('Error during post creation:', error); // Log detailed error information
      setPostError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>Create a Post</Text>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          value={content}
          onChangeText={setContent}
          maxLength={150}
          multiline
        />
        <Text style={styles.charCounter}>{content.length}/150</Text>
        {postError ? <Text style={styles.errorText}>{postError}</Text> : null}
        <Button title="Post" onPress={handlePost} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 100, // Increased height
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // Ensure text starts at the top
  },
  charCounter: {
    alignSelf: 'flex-end',
    marginRight: 10,
    color: '#888',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});