import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.90;
const CARD_HEIGHT = 200;
const SPACING = 12;

const slides = [
  {
    id: '1',
    title: 'Our College',
    description: 'Explore our amazing college campus and community.',
    buttonText: 'Visit College',
    buttonLink: 'https://yourcollegewebsite.com',
    image: require('../assets/man.jpg'),  // Replace with your college image
    colors: ['#6a11cb', '#2575fc'], // Purple to blue gradient
  },
  {
    id: '2',
    title: 'Our App',
    description: 'Download our app for the best experience.',
    buttonText: 'Download App',
    buttonLink: 'https://yourappdownloadlink.com',
    image: require('../assets/man.jpg'),  // Replace with your app image
    colors: ['#f7971e', '#ffd200'], // Orange to yellow gradient
  },
  {
    id: '3',
    title: 'Event & Sponsorship',
    description: 'Join our events and become a sponsor.',
    buttonText: 'Know More',
    buttonLink: 'https://youreventpage.com',
    image: require('../assets/man.jpg'),  // Replace with your event image
    colors: ['#11998e', '#38ef7d'], // Green gradient
  },
];

const Slider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);

  useEffect(() => {
    let timer = setInterval(() => {
      scrollRef.current?.scrollTo({ x: ((Math.floor(scrollX._value / CARD_WIDTH) + 1) % slides.length) * CARD_WIDTH, animated: true });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={{ height: CARD_HEIGHT + 50 }}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: SPACING / 2 }}
      >
        {slides.map((item, index) => {
          const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [20, 0, 20],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.card,
                {
                  backgroundColor: item.colors[0],
                  transform: [{ scale }, { translateY }],
                  marginHorizontal: SPACING / 2,
                },
              ]}
            >
              <LinearGradient
                colors={item.colors}
                style={styles.linearGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardContent}>
                  <View style={styles.leftContent}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => Linking.openURL(item.buttonLink)}
                    >
                      <Text style={styles.buttonText}>{item.buttonText}</Text>
                    </TouchableOpacity>
                  </View>
                  <Image source={item.image} style={styles.image} />
                </View>
                <Svg
                  height={50}
                  width="100%"
                  viewBox="0 0 1440 320"
                  style={styles.wave}
                >
                  <Path
                    fill="white"
                    d="M0,224L30,214.3C60,203,120,181,180,176C240,171,300,181,360,197.3C420,213,480,235,540,245.3C600,256,660,256,720,229.3C780,203,840,149,900,149.3C960,149,1020,203,1080,224C1140,245,1200,235,1260,202.7C1320,171,1380,117,1410,90.7L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
                  />
                </Svg>
              </LinearGradient>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 5,
  },
  linearGradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: 'white',
    marginBottom: 12,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width:'100%',
  },
});

export default Slider;
