import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 10 -2) / 3;



const SuggestionsSlider = () => {
  const sampleSuggestions = [
    {
      id: 1,
      username: 'Arvind Yadav',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      Address: 'Noida Sector 63',
      productTitle: 'Premium UI Kit',
      description: 'High-quality components for web and mobile apps.',
    },
    {
      id: 2,
      username: 'Nisha Kumari',
      profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      Address: 'Delhi NCR',
      productTitle: 'Digital Art Pack',
      description: 'Creative assets and artwork collection.',
    },
    {
      id: 3,
      username: 'Rohit Sharma',
      profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      Address: 'Mumbai, Andheri',
      productTitle: 'Social Media Templates',
      description: 'Modern templates for Instagram and Facebook posts.',
    },
      {
      id: 4,
      username: 'Rohit Sharma',
      profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      Address: 'Mumbai, Andheri',
      productTitle: 'Social Media Templates',
      description: 'Modern templates for Instagram and Facebook posts.',
    },
  ];

  const [suggestionList, setSuggestionList] = useState(sampleSuggestions);
  const navigation = useNavigation();

  const handleRemove = (id) => {
    const filtered = suggestionList.filter((item) => item.id !== id);
    setSuggestionList(filtered);
  };

  const renderCard = ({ item }) => (
    
        
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('SuggestionDetail', { item })}
    >
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.removeIcon}
          onPress={(e) => {
            e.stopPropagation();
            handleRemove(item.id);
          }}
        >
          <MaterialIcons name="close" size={16} color="#fff" />
        </TouchableOpacity>

        <View style={styles.profileSection}>
          <Image source={{ uri: item.profileImage }} style={styles.avatar} />
          <Text numberOfLines={1} style={styles.username}>
            {item.username}
          </Text>
        </View>

        <View style={styles.addressContainer}>
          <Text numberOfLines={1} style={styles.address}>
            {item.Address}
          </Text>
        </View>

        <Text style={styles.productTitle} numberOfLines={1}>
          {item.productTitle}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {item.description || 'No description available'}
        </Text>

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SuggestionDetail', { item })}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
     
  );

  return (
    
    <View style={{ marginVertical: 12, paddingBottom: 16, marginTop:-25, }}>
      <Text style={styles.sectionTitle}>Suggestions for You</Text>

      <FlatList
        data={suggestionList}
        horizontal
        keyExtractor={(item) => item.id.toString()}
       showsHorizontalScrollIndicator={true} 
        
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={renderCard}
        ListEmptyComponent={() => (
          <Text style={{ paddingHorizontal: 16, color: '#999' }}>
            No suggestions found.
          </Text>
        )}
      />
    </View>
   
   
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginLeft: 16,
    marginBottom: 10,
  },
  card: {
    width: CARD_WIDTH,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginRight: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    position: 'relative',
    justifyContent: 'space-between',
    marginTop:10,
    marginBottom:10,
  },
  removeIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#444',
    borderRadius: 16,
    padding: 4,
    zIndex: 10,
    elevation: 5,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 4,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  username: {
    fontSize: 13,
    fontWeight: '600',
    color: 'blue',
    flexShrink: 1,
  },
  addressContainer: {
    backgroundColor: '#eee',
    borderRadius: 20
    ,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 6,
  },
  address: {
    fontSize: 11,
    color: '#555',
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default SuggestionsSlider;
