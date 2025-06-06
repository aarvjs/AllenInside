import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topCircle} />

      <View style={styles.content}>
        <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
        <Text style={styles.text}>Allen Inside</Text>
        <Text style={styles.subText}>Empowering Campus Life</Text>
      </View>

      <View style={styles.bottomCircle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  content:{
    alignItems: 'center',
    zIndex: 2,
  },
  logo:{
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  text:{
    color: 'white',
    fontSize: 30,
    marginTop: 20,
    fontWeight: 'bold',
  },
  subText:{
    color: '#f0f8ff',
    fontSize: 16,
    marginTop: 8,
    fontStyle: 'italic',
  },
  bottomCircle:{
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 230,
    height: 230,
    backgroundColor: '#87CEFA',
    borderRadius: 150,
    opacity: 0.3,
    zIndex: 1,
  },
  topCircle:{
    position: 'absolute',
    top: -60,
    right: -60,
    width: 180,
    height: 180,
    backgroundColor: '#87CEFA',
    borderRadius: 90,
    opacity: 0.3,
    zIndex: 1,
  },
});

export default SplashScreen;
