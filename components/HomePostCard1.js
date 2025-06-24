import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabaseClient';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 150;

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          product_name,
          description,
          selling_price,
          image_url,
          users:users (
            name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(2); // ✅ Only 2 posts

      if (!error && data) {
        setPosts(data);
      } else {
        console.error('Error fetching posts:', error?.message);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} color="#0aada8" />;
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      {posts.map((item) => (
        <View key={item.id} style={styles.card}>
          {/* Profile Overlap */}
          <View style={styles.profileWrapper}>
            <Image source={require('../assets/man.jpg')} style={styles.profileImage} />
          </View>

          {/* Left Section */}
          <View style={styles.leftSection}>
            <Text style={styles.userName}>{item.users?.name || 'Unknown User'}</Text>
            <Text style={styles.userAddress}>Kanpur, UP</Text>
            <Text style={styles.productTitle}>{item.product_name}</Text>
            <Text numberOfLines={2} style={styles.productDescription}>
              {item.description}
            </Text>
            <Text style={styles.price}>₹{item.selling_price}</Text>

            {/* ✅ Button to Navigate */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ProductPurchaseDetail', { post: item })}
            >
              <Text style={styles.buttonText}>View Purchase</Text>
            </TouchableOpacity>
          </View>

          {/* Right Image */}
          <View style={styles.rightImageContainer}>
            <Image source={{ uri: item.image_url }} style={styles.rightImage} />
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
