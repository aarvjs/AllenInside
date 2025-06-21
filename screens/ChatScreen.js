import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import CartItem from '../components/ChatPostSavedItem';

const initialSuggestions = [
  {
    id: '1',
    username: 'Ayush',
    // profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    productTitle: 'Bicycle',
    type: 'Rent',
    category: 'Mobiles',
    location: 'Kanpur',
    price: '₹2000',
    description: 'This is a great product for rent with smooth performance and stylish design. Contact now!',
    productImage: 'https://images.pexels.com/photos/6568531/pexels-photo-6568531.jpeg',
  },
  {
    id: '2',
    username: 'Neha',
    // profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    productTitle: 'iPhone 13 - almost new',
    type: 'Sale',
    category: 'Mobiles',
    location: 'Kanpur, UP',
    price: '₹59,000',
    description: 'iPhone in great condition, barely used. With box, charger, and warranty.',
    productImage: 'https://images.pexels.com/photos/6568531/pexels-photo-6568531.jpeg',
  },
  {
    id: '3',
    username: 'Ravi',
    // profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    productTitle: 'PG Room near University',
    type: 'Rent',
    category: 'Mobiles',
    location: 'Kanpur',
    price: '₹2000',
    description: 'Furnished PG Room near college.',
    productImage: 'https://images.pexels.com/photos/6568531/pexels-photo-6568531.jpeg',
  },
  {
    id: '4',
    username: 'Arvind',
    // profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    productTitle: 'PG Room near University',
    type: 'Rent',
    category: 'Mobiles',
    location: 'Kanpur',
    price: '₹2000',
    description: 'Furnished PG Room near college.',
    productImage: 'https://images.pexels.com/photos/6568531/pexels-photo-6568531.jpeg',
},
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const CartScreen = ({ tabOffset }) => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState(initialSuggestions);
  const [savedItems, setSavedItems] = useState([]);

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

  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveForLater = (id) => {
    const itemToSave = cartItems.find(item => item.id === id);
    setSavedItems(prev => [...prev, itemToSave]);
    handleRemove(id);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 🔝 Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {/* 📍 Fixed Address Section */}
      <View style={styles.addressContainer}>
        <View style={styles.addressTextBlock}>
          <View style={styles.addressLine}>
            <Text style={styles.deliverTo}>Deliver to: </Text>
            <Text style={styles.addressName}>AYUSH, 208007</Text>
            <View style={styles.addressTag}>
              <Text style={styles.addressTagText}>HOME</Text>
            </View>
          </View>
          <Text style={styles.addressDetails}>
            Plot no.29, Sanjeev Nagar 2, Ahirwa, Kanpur
          </Text>
        </View>

        <TouchableOpacity style={styles.changeButton}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* 🧾 Scrollable Cart Items */}
      <AnimatedFlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={handleRemove}
            onSaveForLater={handleSaveForLater}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: 'blue',
    elevation: 4,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    // gap: 100,
    paddingTop: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  addressContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  addressTextBlock: { flex: 1 },
  addressLine: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  deliverTo: { fontSize: 14, color: '#555' },
  addressName: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  addressTag: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
    borderRadius: 4,
  },
  addressTagText: { fontSize: 12, fontWeight: 'bold', color: '#555' },
  addressDetails: { fontSize: 13, color: '#777', marginTop: 2 },
  changeButton: { paddingHorizontal: 12, paddingVertical: 6 },
  changeText: { color: '#007BFF', fontSize: 14, fontWeight: 'bold' },
});

export default CartScreen;
