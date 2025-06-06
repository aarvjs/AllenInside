import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import TopHeader from '../components/TopHeader';
import Slider from '../components/Slider';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TopHeader />
      <Slider />

      <ScrollView contentContainerStyle={styles.content}>
        {[1,2,3].map(post => (
          <View key={post} style={styles.postCard}>
            <Text style={styles.title}>Post: {post}</Text>
            <Text>This is some post content.</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 15 },
  postCard: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
});

export default HomeScreen;
