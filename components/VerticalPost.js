import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Categories from '../components/Categories';

const posts = [
  {
    id: 1,
    user: 'Arvind Yadav',
    location: 'Kanpur, UP',
    image: 'https://picsum.photos/seed/project/300/200',
    title: 'Final Year Project Help',
    description: 'React + Firebase based college project. UI ready.',
    price: '₹1500',
  },
  {
    id: 2,
    user: 'Ayush Yadav',
    location: 'Lucknow, UP',
    image: 'https://picsum.photos/seed/room/300/200',
    title: 'Rent Room Available',
    description: '2BHK furnished flat near SGPGI. AC + WiFi included.',
    price: '₹3500',
  },
  {
    id: 3,
    user: 'Aarvjs',
    location: 'Noida, UP',
    image: 'https://picsum.photos/seed/design/300/200',
    title: 'App UI Design',
    description: 'Figma mobile UI for eCommerce app - fast delivery.',
    price: '₹999',
  },
];

const VerticalPostCard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      {/* <Categories/> */}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {posts.map(post => (
          <View key={post.id} style={styles.postCard}>
            {/* Top User Info */}
            <View style={styles.userInfo}>
              <View style={styles.userLeft}>
                <Image source={require('../assets/conn.jpg')} style={styles.userImage} />
                <View>
                  <Text style={styles.username}>{post.user}</Text>
                  <Text style={styles.userLocation}>{post.location}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.moreIconButton}>
                <MaterialIcons name="more-vert" size={20} color="#555" />
              </TouchableOpacity>
            </View>

            {/* Post Image */}
            <View style={styles.imageWrapper}>
              <Image source={{ uri: post.image }} style={styles.postImage} />
              <TouchableOpacity style={styles.heartIcon}>
                <MaterialIcons name="favorite-border" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Post Details */}
            <View style={styles.detailsRow}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.subtext}>{post.description}</Text>
              </View>
              <Text style={styles.price}>{post.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  scroll: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  postCard: {
  alignSelf: 'center', 
  width: '100%',        
  maxWidth: 400,        
  height: 370,
  marginBottom: 30,
  borderRadius: 12,
  backgroundColor: '#fff',
  elevation: 3,
  overflow: 'hidden',
  
  
},
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  userLocation: {
    fontSize: 11,
    color: '#888',
  },
  imageWrapper: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    borderRadius: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  subtext: {
    fontSize: 12,
    color: '#777',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#00aa00',
  },
  moreIconButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VerticalPostCard;
