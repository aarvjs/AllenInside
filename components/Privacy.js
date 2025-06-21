import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Privacy = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Privacy Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default Privacy;
