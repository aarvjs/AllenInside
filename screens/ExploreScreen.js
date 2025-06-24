import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Suggestions from '../components/Suggestion';
import VerticalPostCard from '../components/VerticalPost';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../components/ExploreSearch';

const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons);

  const ExploreScreen = ({ tabOffset = new Animated.Value(0) }) => {
  const [search, setSearch] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const prevScrollY = useRef(0);

  const categories = [
    { id: '1', label: 'Mobiles', image: require('../assets/logo.jpeg') },
    { id: '2', label: 'Rooms', image: require('../assets/logo.jpeg') },
    { id: '3', label: 'Cars', image: require('../assets/conn.jpg') },
    { id: '4', label: 'Bikes', image: require('../assets/event.jpg') },
    { id: '5', label: 'Notes', image: require('../assets/collg.jpg') },
    { id: '6', label: 'Stationery', image: require('../assets/man.jpg') },
  ];

  const suggestions = [
    {
      id: '1',
      username: 'Ayush',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      productTitle: 'Bicycle',
      type: 'Rent',
      category: 'Mobiles',
      location: 'Kanpur',
      price: '₹2000',
      description: 'This is a great product...',
    },
    {
      id: '2',
      username: 'Neha',
      profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      productTitle: 'iPhone 13 - almost new',
      type: 'Sale',
      category: 'Mobiles',
      location: 'Kanpur,UP',
      price: '₹2000',
      description: 'Like new iPhone in great condition',
      productImage: [
        'https://images.unsplash.com/photo-1607746882042-944635dfe10e',
        'https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg',
        'https://images.pexels.com/photos/6568531/pexels-photo-6568531.jpeg',
      ],
    },
  ];

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: ['transparent', '#007bff'],
    extrapolate: 'clamp',
  });

  const headerTextColor = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: ['#000', '#fff'],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const currentY = event.nativeEvent.contentOffset.y;
        const diff = currentY - prevScrollY.current;

        if (diff > 5) {
          Animated.timing(tabOffset, {
            toValue: 100,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else if (diff < -5) {
          Animated.timing(tabOffset, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }

        prevScrollY.current = currentY;
      },
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <Animated.View style={[styles.fixedHeader, { backgroundColor: headerBackgroundColor }]}>
        <View style={styles.leftContainer}>
          <AnimatedMaterialIcons
            name="arrow-back"
            size={28}
            style={{ color: headerTextColor }}
            onPress={() => navigation.goBack()}
          />
          <Animated.Text style={[styles.title, { color: headerTextColor }]}>Explore</Animated.Text>
        </View>
        <View style={{ width: 28 }} />
      </Animated.View>

      {/* Scrollable Top Part Only */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <LinearGradient
          colors={['#007bff', '#ffffff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientContainer}
        >
          <View style={{ height: 60 }} />
          <SearchBar search={search} setSearch={setSearch} />
        </LinearGradient>

        {/* Categories */}
        <View style={styles.categoryBox}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
            renderItem={({ item }) => {
              const isSelected = selectedCategory === item.label;
              return (
                <TouchableOpacity
                  style={[styles.categoryItem, isSelected && styles.categorySelected]}
                  onPress={() => setSelectedCategory(item.label)}
                >
                  <Image source={item.image} style={styles.iconImage} resizeMode="contain" />
                  <Text style={[styles.categoryText, isSelected && { color: '#fff' }]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Suggestions */}
        <Suggestions suggestions={suggestions} />

        {/* ✅ Supabase Posts Section */}
        <VerticalPostCard />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f9f9f9',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    borderBottomEndRadius: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-evenly',
    gap: 200,
    // marginTop:40,
    paddingTop:30,

  },



  fixedHeader: {
    position: 'absolute',
    // top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    left: 0,
    right: 0,
    
    height: 70,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  gradientContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  categoryBox: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  categoryRow: {
    paddingVertical: 10,
  },
  categoryItem: {
    width: 80,             // ✅ fixed width
    height: 90,            // ✅ fixed height
    backgroundColor: '#eee',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  categorySelected: {
    backgroundColor: '#007bff',
  },
  iconImage: {
    width: 32,
    height: 32,
    borderRadius: 6,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    flexShrink: 1,         // ✅ if text is longer
  },
 
});

export default ExploreScreen;
