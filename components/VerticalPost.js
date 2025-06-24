import React, { useEffect, useState } from 'react';
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
import { supabase } from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';

const VerticalPostCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            id,
            product_name,
            description,
            selling_price,
            image_url,
            created_at,
            users:users (
              name,
              username
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase fetch error:', error.message);
        } else {
          // Fix: Remove duplicates based on post id
          const uniquePosts = Array.from(new Map(data.map(item => [item.id, item])).values());
          setPosts(uniquePosts);
        }
      } catch (err) {
        console.error('Unexpected error:', err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const truncateDescription = (desc, wordLimit = 20) => {
    const words = desc.trim().split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...more';
    }
    return desc;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {loading ? (
          <Text style={styles.loadingText}>Loading posts...</Text>
        ) : posts.length === 0 ? (
          <Text style={styles.loadingText}>No posts found</Text>
        ) : (
          posts.map(post => (
            <View key={post.id} style={styles.postCard}>
              {/* User Info */}
              <View style={styles.userInfo}>
                <View style={styles.userLeft}>
                  <Image
                    source={require('../assets/conn.jpg')}
                    style={styles.userImage}
                  />
                  <View>
                    <Text style={styles.username}>
                      {post.users?.name || 'Unknown'}
                    </Text>
                    <Text style={styles.subUsername}>
                      @{post.users?.username || 'unknown'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.moreIconButton}>
                  <MaterialIcons name="more-vert" size={20} color="#555" />
                </TouchableOpacity>
              </View>

              {/* Post Image */}
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductPurchaseDetail', { post })}
>
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: post.image_url }}
                  style={styles.postImage}
                />
                <TouchableOpacity style={styles.heartIcon}>
                  <MaterialIcons name="favorite-border" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              </TouchableOpacity>

              {/* Post Details */}
              <TouchableOpacity onPress={() => navigation.navigate('ProductPurchaseDetail',{post})}>
              <View style={styles.detailsRow}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.title}>{post.product_name}</Text>
                  <Text style={styles.subtext}>
                    {truncateDescription(post.description)}
                  </Text>
                </View>
                <Text style={styles.price}>₹{post.selling_price}</Text>
              </View>
              </TouchableOpacity>
            </View>
          ))
        )}
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
  scroll: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 40,
  },
  postCard: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 400,
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
  padding: 12,
  backgroundColor: '#007bff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 2,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
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
    fontSize: 14,
    color: '#fff',
  },
  subUsername: {
    fontSize: 12,
    color: '#d1e3ff',
    marginTop: -2,
  },
  moreIconButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 10,
  },
  imageWrapper: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
  aspectRatio: 16 / 9,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  resizeMode: 'contain', // ensures full image shows
  backgroundColor: '#fff', // optional
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
    padding: 10,
    backgroundColor: '#eee',
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 4,
    color: '#333',
  },
  subtext: {
    fontSize: 13,
    color: '#777',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#0aada8',
  },
});

export default VerticalPostCard;
