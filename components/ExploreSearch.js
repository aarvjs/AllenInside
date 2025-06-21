import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  Animated,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const suggestions = [
  { text: 'Rent', icon: 'home' },
  { text: 'Purchase', icon: 'shopping-cart' },
  { text: 'Projects', icon: 'build' },
  { text: 'Home Decor', icon: 'weekend' },
];

const SearchBar = ({ search, setSearch }) => {
  const [index, setIndex] = useState(0);
  const scrollAnim = useRef(new Animated.Value(width)).current;

  // Recursive scroll animation
  const startScroll = () => {
    scrollAnim.setValue(width);
    Animated.timing(scrollAnim, {
      toValue: -width, // slide to left off-screen
      duration: 9000, // adjust speed here
      useNativeDriver: true,
    }).start(() => {
      setIndex((prev) => (prev + 1) % suggestions.length); // update text
      startScroll(); // recursive call
    });
  };

  useEffect(() => {
    startScroll(); // Start animation once
  }, []);

  return (
    <View style={{ marginTop: 10, marginBottom: 20 }}>
      {/* 🔁 Banner: Sliding Text */}
      <View style={styles.bannerWrapper}>
        <Animated.Text
          style={[
            styles.bannerText,
            {
              transform: [{ translateX: scrollAnim }],
            },
          ]}
        >
          <MaterialIcons name="campaign" size={16} color="#007bff" /> Explore
          Allensinside App and Find Your Product
        </Animated.Text>
      </View>

      {/* 🔍 Search Bar */}
      <View style={styles.container}>
        <View style={styles.searchBar}>
          {/* 🖼 Logo */}
          <Image
            source={require('../assets/logo.jpeg')}
            style={styles.logoImage}
            resizeMode="contain"
          />

          {/* Input */}
          <TextInput
            placeholder={suggestions[index].text}
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />

          {/* Right Icon */}
          <TouchableOpacity>
            <MaterialIcons
              name={suggestions[index].icon}
              size={24}
              color="#007bff"
            />
          </TouchableOpacity>
        </View>

        {/* 🔔 Notification */}
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialIcons name="notifications" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerWrapper: {
    height: 24,
    overflow: 'hidden',
    paddingLeft: 16,
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    width: width * 2, // ensure text doesn't cut
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    width: 355,
    marginLeft: -12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
    flex: 1,
    marginRight: 12,
    borderWidth: 1.3,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoImage: {
    width: 26,
    height: 26,
    borderRadius: 6,
    marginRight: 8,
  },
  notificationButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
});

export default SearchBar;
