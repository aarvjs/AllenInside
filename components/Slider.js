import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Linking,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = 150;
const SPACING = 12;

const slides = [
  {
    id: '1',
    title: 'Our College',
    description: 'Explore our amazing college campus and community.',
    buttonText: 'Visit College',
    buttonLink: 'https://yourcollegewebsite.com',
    image: require('../assets/man.jpg'),
    colors: ['#6a11cb', '#2575fc'],
  },
  {
    id: '2',
    title: 'Our App',
    description: 'Download our app for the best experience.',
    buttonText: 'Download App',
    buttonLink: 'https://yourappdownloadlink.com',
    image: require('../assets/man.jpg'),
    colors: ['#f7971e', '#ffd200'],
  },
  {
    id: '3',
    title: 'Event & Sponsorship',
    description: 'Join our events and become a sponsor.',
    buttonText: 'Know More',
    buttonLink: 'https://youreventpage.com',
    image: require('../assets/man.jpg'),
    colors: ['#11998e', '#38ef7d'],
  },
];

const Slider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % slides.length;
      flatListRef.current?.scrollToOffset({
        offset: indexRef.current * (CARD_WIDTH + SPACING),
        animated: true,
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ height: CARD_HEIGHT + 40 }}>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: (width - CARD_WIDTH) / 2,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (CARD_WIDTH + SPACING),
            index * (CARD_WIDTH + SPACING),
            (index + 1) * (CARD_WIDTH + SPACING),
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
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                marginRight: SPACING,
                transform: [{ scale }, { translateY }],
              }}
            >
              <LinearGradient
                colors={item.colors}
                style={styles.card}
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
              </LinearGradient>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 5,
    padding: 15,
    justifyContent: 'space-between',
    
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: 'white',
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default Slider;
