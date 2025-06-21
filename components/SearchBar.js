import React, { useEffect, useRef } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SearchBar = ({ scrollY }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!scrollY || !scrollY.addListener) return;

    const listenerId = scrollY.addListener(({ value }) => {
      Animated.timing(translateY, {
        toValue: value > 20 ? -100 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    return () => scrollY.removeListener(listenerId);
  }, [scrollY]);

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ translateY }] }]}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Image source={require('../assets/All.jpeg')} style={styles.searchLeftIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search products..."
            placeholderTextColor="#888"
          />
          <Image source={require('../assets/search.png')} style={styles.searchRightIcon} />
        </View>
        <TouchableOpacity style={styles.micWrapper}>
          <MaterialIcons name="keyboard-voice" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 9,
    backgroundColor: '#fff',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor:'blue',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
    marginBottom:12,


    
  },
  searchLeftIcon: {
    width: 50,
    height: 18,
    marginRight: 8,
    borderRadius:10,
  },
  searchRightIcon: {
    width: 18,
    height: 18,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  micWrapper: {
    marginLeft: 10,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 12,
    elevation: 3,
     marginBottom:12,
  },
});

export default SearchBar;
