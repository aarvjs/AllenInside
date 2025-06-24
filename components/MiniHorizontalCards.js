import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { supabase } from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';


const MiniHorizontalCards = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          product_name,
          selling_price,
          image_url,
          users:users (
            name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching deals:', error.message);
      } else {
        setDeals(data);
      }
      setLoading(false);
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} color="#0aada8" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Popular Deals</Text>
        <TouchableOpacity style={styles.viewAllButton} >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
  {deals.map((post) => (
    <TouchableOpacity
      key={post.id}
      style={styles.card}
      onPress={() => navigation.navigate('ProductPurchaseDetail', { post })}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: post.image_url }} style={styles.cardImage} />
        <TouchableOpacity style={styles.heartIcon}>
          <MaterialIcons name="favorite-border" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.profileRow}>
          <View style={styles.profileInfo}>
            <Image source={require('../assets/logo.jpeg')} style={styles.profileImage} />
            <Text style={styles.username}>{post.users?.name || 'Unknown'}</Text>
          </View>
          <TouchableOpacity style={styles.moreIcon}>
            <MaterialIcons name="more-vert" size={14} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.productName}>{post.product_name}</Text>
        <View style={styles.separator} />
        <Text style={styles.price}>₹{post.selling_price}</Text>
      </View>
    </TouchableOpacity>
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
