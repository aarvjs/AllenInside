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
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 150;

const posts = [
  {
    id: 1,
    userName: 'Arvind Yadav',
    userAddress: 'Jaunpur, UP',
    productTitle: 'Bluetooth Speaker',
    productDescription: 'Powerful sound with deep bass and long battery life.',
    price: '₹1,799',
    profileImage: require('../assets/man.jpg'),
    productImage: require('../assets/AllenLogo.jpeg'),
  },
  {
    id: 2,
    userName: 'Priya Sharma',
    userAddress: 'Delhi, India',
    productTitle: 'Fitness Smartwatch',
    productDescription: 'Track steps, heart rate, sleep & more in style.',
    price: '₹2,499',
    profileImage: require('../assets/man.jpg'),
    productImage: require('../assets/AllenLogo.jpeg'),
  },
];

const PostCard = () => {
  return (
    <ScrollView style={{backgroundColor:'#fff'}}>
      {posts.map((item) => (
        <View key={item.id} style={styles.card}>
          {/* Profile Overlap */}
          <View style={styles.profileWrapper}>
            <Image source={item.profileImage} style={styles.profileImage} />
          </View>

          {/* Left Section */}
          <View style={styles.leftSection}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.userAddress}>{item.userAddress}</Text>
            <Text style={styles.productTitle}>{item.productTitle}</Text>
            <Text numberOfLines={2} style={styles.productDescription}>
              {item.productDescription}
            </Text>
            <Text style={styles.price}>{item.price}</Text>
            <TouchableOpacity>
              {/* <Text style={styles.moreText}>More</Text> */}
            </TouchableOpacity>
          </View>

          {/* Right Image */}
          <View style={styles.rightImageContainer}>
            <Image source={item.productImage} style={styles.rightImage} />
            <TouchableOpacity style={styles.heartIcon}>
              <Icon name="favorite-border" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginHorizontal: 12,
    marginVertical: 10,
    padding: 12,
    paddingTop: 25,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 5,
    width: width * 0.95,
    height: CARD_HEIGHT,
    alignSelf: 'center',
    overflow: 'visible',
    // marginBottom:30,
    marginTop:20,
  },
  profileWrapper: {
    position: 'absolute',
    top: -18,
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#fff',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  leftSection: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  userAddress: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  productDescription: {
    fontSize: 13,
    color: '#555',
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    color: '#e91e63',
    fontWeight: 'bold',
  },
  moreText: {
    fontSize: 13,
    color: '#1e88e5',
    marginTop: 2,
  },
  rightImageContainer: {
    width: width * 0.32,
    // height: CARD_HEIGHT - 24,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  rightImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#00000088',
    padding: 4,
    borderRadius: 18,
  },
});

export default PostCard;
