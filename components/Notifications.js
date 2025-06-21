import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopHeader from './TopHeader'; // jisme menu button hai


const Notifications = () => {
  return (
    <View style={styles.container}>
        <TopHeader/>
      <Text style={styles.text}>Notifications Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default Notifications;
