import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.88;
const CARD_HEIGHT = 210;

const memberships = [
  {
    id: 1,
    title: 'Premium Access',
    description: 'Get unlimited access to all features and future updates.',
    image: require('../assets/memb.jpg'),
    buttonText: 'Join Now',
  },
  {
    id: 2,
    title: 'Pro Member',
    description: 'Exclusive tools and member-only content included.',
    image: require('../assets/memb.jpg'),
    buttonText: 'Upgrade',
  },
];

const MembershipSlider = () => {
  return (
   <View style={{ marginTop: 20 }}>
  <Text style={styles.sectionTitle}>Join Premium</Text>

  <ScrollView
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    style={styles.scrollContainer}
  >
    {memberships.map((item) => (
      <View key={item.id} style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.bottomContent}>
          <View style={styles.leftContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{item.buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>
</View>

  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 20,
    
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginHorizontal: (width - CARD_WIDTH) / 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    overflow: 'hidden',
    marginBottom: 40,
  },
  sectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: 'black',
  marginLeft: 25,
//   marginBottom: 10,
},

  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  bottomContent: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
});

export default MembershipSlider;
