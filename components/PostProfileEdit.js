import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../supabaseClient';

const PostDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { post } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

 const handleDelete = async () => {
  Alert.alert(
    'Delete Post',
    'Are you sure you want to delete this post?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', post.id);

          if (error) {
            Alert.alert('Error', 'Failed to delete post.');
            return;
          }

          if (onDelete) onDelete(post.id);

          // ✅ Show success message after deletion
          Alert.alert(
            'Deleted',
            'Post deleted successfully.\nRestart your app to see full effect.',
            [
              {
                text: 'OK',
                onPress: () => {
                  // ✅ Redirect to home screen
                  navigation.navigate('Home'); // 👈 change 'Home' to your main screen name
                },
              },
            ]
          );
        },
      },
    ]
  );
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#007bff" barStyle="light-content" />

      {/* 🔷 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.manageText}>Manage</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* 🔹 Card */}
        <View style={styles.card}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <Image source={require('../assets/conn.jpg')} style={styles.userImage} />
            <View>
              <Text style={styles.username}>{post.users?.name || 'Unknown'}</Text>
              <Text style={styles.subUsername}>@{post.users?.username || 'unknown'}</Text>
            </View>
            <TouchableOpacity style={styles.moreIcon} onPress={() => setModalVisible(true)}>
              <MaterialIcons name="more-vert" size={22} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Post Image */}
          <Image source={{ uri: post.image_url }} style={styles.postImage} />

          {/* Post Info */}
         <View style={styles.detailsRow}>
  {/* Left side: Title + Description + Read More */}
  <View style={styles.leftDetails}>
    <Text style={styles.title}>{post.product_name}</Text>
    <Text style={styles.description} numberOfLines={showFullDescription ? undefined : 3}>
      {post.description}
    </Text>
    {post.description.length > 100 && (
      <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
        <Text style={styles.readMore}>{showFullDescription ? 'Show Less' : 'Read More'}</Text>
      </TouchableOpacity>
    )}
  </View>

  {/* Right side: Price */}
  <View style={styles.rightPrice}>
    <Text style={styles.price}>₹{post.selling_price}</Text>
  </View>
</View>

        </View>
      </ScrollView>

      {/* Modal */}
     <Modal visible={modalVisible} animationType="slide" transparent>
  <View style={styles.modalBackground}>
    <View style={styles.modalBox}>
      <Text style={styles.modalTitle}>Delete Post?</Text>
      <Text style={styles.modalMessage}>
        Your post will be permanently deleted from everywhere and can’t be recovered.
      </Text>

      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Yes, Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 40,
  },
  manageText: { color: '#fff', fontWeight: '500', fontSize: 20 },
  scroll: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#e0f0ff',
    padding: 8,
    borderRadius: 8,
  },
  userImage: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  username: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  subUsername: { fontSize: 12, color: '#888' },
  moreIcon: { marginLeft: 'auto' },
 postImage: {
  width: '100%',
  aspectRatio: 1.5, // Adjusted ratio for better full-view
  resizeMode: 'contain', // No cropping, full image
  borderRadius: 10,
  marginBottom: 14,
  backgroundColor: '#fff',
},
detailsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 10,
  marginTop: 12,
},

leftDetails: {
  flex: 1,
},

rightPrice: {
  justifyContent: 'flex-start',
  paddingTop: 4,
},

title: {
  fontSize: 17,
  fontWeight: '600',
  color: '#222',
  marginBottom: 4,
},

description: {
  fontSize: 14,
  color: '#555',
},

readMore: {
  fontSize: 12,
  color: '#007bff',
  marginTop: 4,
},

price: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#0aada8',
},

 modalBackground: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalBox: {
  width: '85%',
  backgroundColor: '#fff',
  padding: 25,
  borderRadius: 16,
  elevation: 10,
},
modalTitle: {
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 10,
  color: '#222',
  textAlign: 'center',
},
modalMessage: {
  fontSize: 14,
  color: '#555',
  marginBottom: 25,
  textAlign: 'center',
  lineHeight: 20,
},
deleteButton: {
  backgroundColor: '#d9534f',
  paddingVertical: 12,
  borderRadius: 8,
  marginBottom: 12,
  alignItems: 'center',
},
deleteButtonText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 16,
},
cancelButton: {
  backgroundColor: '#f1f1f1',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},
cancelButtonText: {
  color: '#444',
  fontWeight: '500',
  fontSize: 16,
},

});

export default PostDetailScreen;
