import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const OnboardingScreen = ({ navigation }) => {
  const Done = ({ ...props }) => (
    <TouchableOpacity style={styles.circleButton} {...props}>
      <Icon name="arrow-forward" size={24} color="#fff" />
    </TouchableOpacity>
  );

  const Next = ({ ...props }) => (
    <TouchableOpacity style={styles.circleButton} {...props}>
      <Icon name="arrow-forward" size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <Onboarding
      onSkip={() => navigation.replace('Login1')}
      onDone={() => navigation.replace('Login1')}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      bottomBarHighlight={false}
      containerStyles={styles.container}
      imageContainerStyles={styles.imageContainer}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      bottomBarHeight={110}
      
      pages={[
        {
          backgroundColor: '#e0f7fa',
          image: (
            <View style={styles.imageWrapper}>
              <Image source={require('../assets/collg.jpg')} style={styles.image} />
              <Image source={require('../assets/upwave.png')} style={styles.wave} />
              <LinearGradient
                colors={['#e0f7fa', '#ffffff']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
            </View>
          ),
          title: 'Buy & Sell Projects',
          subtitle: 'Easily trade your academic projects with classmates.',
        },
        {
          backgroundColor: '#e8f5e9',
          image: (
            <View style={styles.imageWrapper}>
              <Image source={require('../assets/cannten.jpg')} style={styles.image} />
              <Image source={require('../assets/upwave.png')} style={styles.wave} />
              <LinearGradient
                colors={['#e8f5e9', '#ffffff']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
            </View>
          ),
          title: 'Explore Canteen Items',
          subtitle: 'Discover what’s cooking at the canteen daily.',
        },
        {
          backgroundColor: '#fff3e0',
          image: (
            <View style={styles.imageWrapper}>
              <Image source={require('../assets/event.jpg')} style={styles.image} />
              <Image source={require('../assets/upwave.png')} style={styles.wave} />
              <LinearGradient
                colors={['#fff3e0', '#ffffff']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
            </View>
          ),
          title: 'College Events & Sponsors',
          subtitle: 'View sponsors and register for college events.',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    // flex: 1,
  },
  imageContainer: {
    marginTop: 0,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:'100',
    // position: 'relative',
    width: '100%',
    height: 370,
  },
  image: {
    width: 420,
    height: 300,
    borderRadius: 15,
    marginBottom: 30,
    zIndex: 1,
  },
  wave: {
    position: 'absolute',
    bottom: -60,
    width: '100%',
    height: 80,
    resizeMode: 'stretch',
    zIndex: 2,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 1020,
    zIndex: 0,
  },
  title: {
    fontSize: 26,
    color: '#1e88e5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  circleButton: {
    marginLeft: 20,
    marginBottom: 30,
    marginRight:'30',
    width: 50,
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
});

export default OnboardingScreen;
