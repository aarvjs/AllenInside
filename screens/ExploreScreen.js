import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopHeader from '../components/TopHeader';

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <TopHeader />
      <View style={styles.center}>
        <Text>Explore Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: '#fff' },
  center: { flex:1, justifyContent:'center', alignItems:'center' },
});

export default ExploreScreen;
