import React, { useState } from 'react';

import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity,Modal,TouchableWithoutFeedback, } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

const HorizontalPosts = () => {

    const [visible, setVisible] = useState(false);

  const handleToggleModal = () => {
    setVisible(!visible);
  };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
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
     
     <TouchableOpacity style={styles.moreIconButton} onPress={handleToggleModal}>
  <MaterialIcons name="more-vert" size={24} color="#555" />
</TouchableOpacity>

<Modal
  transparent
  visible={visible}
  animationType="slide"
  onRequestClose={() => setVisible(false)}
>
  <TouchableWithoutFeedback onPress={() => setVisible(false)}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalCard}>
        <View style={styles.modalHeader} />
        {/* <Text style={styles.modalTitle}>Options</Text> */}
        <TouchableOpacity style={styles.modalItem}>
          <Text style={styles.modalText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalItem}>
          <Text style={styles.modalText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalItem}>
          <Text style={styles.modalText}> Share Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>
</Modal>

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
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 15,
  },
  postCard: {
    width: 260,
    height: 270,
    marginRight: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
    overflow: 'hidden',
    marginBottom:10,
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
    height: 140,
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
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    // height:'100%',
    // marginTop:13,
    // marginBottom:30,
  },
  modalCard: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    
    // backgroundColor: 'rgba(16, 13, 13, 0.3)', 
  },
  modalHeader: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalText: {
    fontSize: 16,
    color: '#555',
  },
});

export default HorizontalPosts;
