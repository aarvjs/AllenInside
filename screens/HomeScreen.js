import React, { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import TopHeader from '../components/TopHeader';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import HorizontalPosts from '../components/HorizontalPosts';
import MiniHorizontalCards from '../components/MiniHorizontalCards';
import Slider from '../components/Slider';
import PostCard from '../components/HomePostCard1';
import MembershipSlider from '../components/MembershipSlider';
const HomeScreen = ({ tabOffset }) => {
   const scrollY = useRef(new Animated.Value(0)).current;
  const prevScrollY = useRef(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const currentY = event.nativeEvent.contentOffset.y;
        const diff = currentY - prevScrollY.current;

        if (diff > 5) {
          // Scroll down → Hide tab bar
          Animated.timing(tabOffset, {
            toValue: 100,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else if (diff < -5) {
          // Scroll up → Show tab bar
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff',
      
     }}>
       <Animated.ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
        
        <TopHeader  scrollY={scrollY}/>
        <SearchBar scrollY={scrollY} />
        <Slider/>
        
        

        <Categories />
        
        <View style={styles.postHeaderRow}>
          <Text style={styles.postHeader}>Featured Listings</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <HorizontalPosts />
        <MiniHorizontalCards />
        {/* <MiniHorizontalCards /> */}
        {/* <MiniHorizontalCards /> */}
        {/* <MiniHorizontalCards /> */}
      <PostCard/>
      <MembershipSlider/>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
   
  },
  postHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    backgroundColor: '#007bff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  viewAllText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default HomeScreen;
