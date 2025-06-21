import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const data = [
  {
    id: 1,
    user: 'Arvind',
    profile: 'https://randomuser.me/api/portraits/men/32.jpg',
    productName: 'Figma UI Kit',
    price: '₹499',
    image: 'https://images.pexels.com/photos/4065899/pexels-photo-4065899.jpeg',
  },
  {
    id: 2,
    user: 'Riya',
    profile: 'https://randomuser.me/api/portraits/women/45.jpg',
    productName: 'Web Template',
    price: '₹799',
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg',
  },
  {
    id: 3,
    user: 'Shyam',
    profile: 'https://randomuser.me/api/portraits/men/76.jpg',
    productName: 'Room Rent',
    price: '₹3500',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
  },
    {
    id: 4,
    user: 'Shyam',
    profile: 'https://randomuser.me/api/portraits/men/76.jpg',
    productName: 'Room Rent',
    price: '₹3500',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
  },
];

const MiniHorizontalCards = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Popular Deals</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <TouchableOpacity style={styles.heartIcon}>
                <MaterialIcons name="favorite-border" size={14} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.cardInfo}>
              <View style={styles.profileRow}>
                <View style={styles.profileInfo}>
                  <Image source={{ uri: item.profile }} style={styles.profileImage} />
                  <Text style={styles.username}>{item.user}</Text>
                </View>
                <TouchableOpacity style={styles.moreIcon}>
                  <MaterialIcons name="more-vert" size={14} color="#000" />
                </TouchableOpacity>
              </View>

              <Text style={styles.productName}>{item.productName}</Text>
              <View style={styles.separator} />
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 3.5;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    
   
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  viewAllText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 12,
    elevation: 3,
    overflow: 'hidden',
    marginBottom:10,
  },
  imageWrapper: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 75,
    resizeMode: 'cover',
  },
  heartIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
    borderRadius: 20,
  },
  cardInfo: {
    padding: 6,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
  username: {
    fontSize: 11,
    fontWeight: '600',
    color: '#222',
  },
  moreIcon: {
    padding: 4,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  productName: {
    fontSize: 11,
    color: '#555',
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 4,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#00aa00',
    // textDecorationLine: 'underline',
  },
});

export default MiniHorizontalCards;
