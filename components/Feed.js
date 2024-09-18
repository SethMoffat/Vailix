import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
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
          .select('id, username')
          .in('id', emails);

        if (usersError) throw usersError;

        // Debugging: Log the data returned from the users table
        console.log('Users Data:', usersData);

        const usersMap = usersData.reduce((acc, user) => {
          acc[user.email] = user.username;
          return acc;
        }, {});

        // Debugging: Log the usersMap to ensure proper mapping
        console.log('Users Map:', usersMap);

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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../assets/TopPNG.png')}
          style={styles.topImage}
        />
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Post
              username={item.username}
              content={item.content}
              createdAt={item.created_at}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  topImage: {
    width: 200,
    height: 85,
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
});