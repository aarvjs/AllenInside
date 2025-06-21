import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const SuggestionDetail = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);

  const productImages = Array.isArray(item.productImage)
    ? item.productImage
    : [item.productImage || item.featureImage || item.profileImage];

  const bottomBarAnim = scrollY.interpolate({
  inputRange: [0, 50],
  outputRange: [0, 200], 
  extrapolate: 'clamp',
});


  return (
    <>
      <Animated.ScrollView
        style={styles.container}
        ref={scrollRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* 🔙 Custom Header */}
        <View style={styles.headerRow}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="#333"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Details</Text>
        </View>

        {/* 🔘 Top Profile Row */}
        <View style={styles.profileRow}>
          <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
          <Text style={styles.username}>{item.username}</Text>
        </View>

        {/* 🖼 Image Slider with Counter */}
        <View style={styles.imageWrapper}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const slide = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentImage(slide);
            }}
          >
            {productImages.map((imgUri, index) => (
              <Image key={index} source={{ uri: imgUri }} style={styles.mainImage} />
            ))}
          </Animated.ScrollView>

          <View style={styles.counterBox}>
            <Text style={styles.counterText}>
              {currentImage + 1}/{productImages.length}
            </Text>
          </View>
        </View>

        {/* 🧾 Info Card Section */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Text style={styles.productTitle}>{item.productTitle}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <View style={styles.iconBox}>
                <MaterialIcons name="person" size={18} color="#555" />
              </View>
              <View style={styles.textBox}>
                <Text style={styles.gridText}>{item.type || 'N/A'}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.iconBox}>
                <MaterialIcons name="location-on" size={18} color="#555" />
              </View>
              <View style={styles.textBox}>
                <Text style={styles.gridText}>{item.location || 'Unknown'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <View style={styles.iconBox}>
                <MaterialIcons name="category" size={18} color="#555" />
              </View>
              <View style={styles.textBox}>
                <Text style={styles.gridText}>{item.category || 'N/A'}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.iconBox}>
                <MaterialIcons name="attach-money" size={18} color="#555" />
              </View>
              <View style={styles.textBox}>
                <Text style={styles.gridText}>{item.price || 'Free'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 📝 Description */}
        <Text style={styles.sectionHeading}>About Product</Text>
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionText}>
            {item.description || 'No description provided.'}
          </Text>
        </View>
      </Animated.ScrollView>

      {/* 🔽 Bottom Bar */}
      <Animated.View style={[styles.bottomBar, { transform: [{ translateY: bottomBarAnim }] }]}>
        <View>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.date}>16 - 20 Jun</Text>
        </View>
        <LinearGradient
          colors={['#4facfe', '#00f2fe']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bookBtn}
        >
          <Text style={styles.bookText}>{item.type}</Text>
        </LinearGradient>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginTop: 17,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
    color: '#333',
    marginBottom: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  mainImage: {
    width: width,
    height: 240,
  },
  counterBox: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  counterText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    elevation: 3,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  gridItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '47%',
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    gap: 8,
  },
  iconBox: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    height: 40,
  },
  gridText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  descriptionCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  descriptionText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
    marginTop: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
    zIndex: 100,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  bookBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  bookText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default SuggestionDetail;
