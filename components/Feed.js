import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Post from './Post';
import { supabase } from '../SupaBase/supabaseClient';
import { FlatList } from 'react-native-gesture-handler';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;

        const emails = postsData.map(post => post.email).filter(Boolean);
        if (emails.length === 0) {
          setPosts(postsData.map(post => ({ ...post, username: 'Unknown' })));
          setLoading(false);
          return;
        }

        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('email, username')
          .in('email', emails);

        if (usersError) throw usersError;

        const usersMap = usersData.reduce((acc, user) => {
          acc[user.email] = user.username;
          return acc;
        }, {});

        const postsWithUsernames = postsData.map(post => ({
          ...post,
          username: usersMap[post.email] || 'Unknown',
        }));

        setPosts(postsWithUsernames);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Post username={item.username} content={item.content} createdAt={item.created_at} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});