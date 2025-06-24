import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, Alert
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { useRoute, useNavigation } from '@react-navigation/native';
import { supabase } from '../supabaseClient';

const PurchaseForm = () => {
  const { params } = useRoute();
  const post = params?.post || {};
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sellerId, setSellerId] = useState(null);

  const productPrice = isNaN(parseFloat(post?.selling_price)) ? 0 : parseFloat(post?.selling_price);
  const platformFee = parseFloat((productPrice * 0.05).toFixed(2));
  const totalAmount = parseFloat((productPrice + platformFee).toFixed(2));
  const amountInPaise = Math.round(totalAmount * 100);

  // ✅ Fetch seller_id from posts table using post.id
  useEffect(() => {
    const fetchSellerId = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', post.id)
        .single();

      if (data?.user_id) {
        setSellerId(data.user_id);
      } else {
        console.error('Error fetching seller ID:', error?.message);
      }
    };

    fetchSellerId();
  }, [post.id]);

  const handlePayment = async () => {
    if (!name || !phone) {
      Alert.alert('Missing Info', 'Please enter name and phone number.');
      return;
    }

    const options = {
      description: `Buying "${post.product_name}"`,
      currency: 'INR',
      key: 'rzp_test_CfR43fxpWq1P0Y',
      amount: amountInPaise,
      name: 'AllenInside',
      image: require('../assets/logo.jpeg'),
      prefill: {
        contact: phone,
        name: name,
      },
      theme: { color: '#0aada8' },
    };

    RazorpayCheckout.open(options)
      .then(async () => {
        const buyer = await supabase.auth.getUser();

        const { error: insertError } = await supabase.from('purchases').insert([{
          buyer_id: buyer.data.user.id,
          seller_id: sellerId, // ✅ fetched from DB
          product_id: parseInt(post.id),

          product_name: post.product_name,
          price: productPrice,
          total_price: totalAmount,
          buyer_name: name,
          buyer_phone: phone,
        }]);

         // Insert notification with metadata
      await supabase.from('notifications').insert([{
        user_id: sellerId,
        message: `${name} purchased your product "${post.product_name}"! 📦`,
        is_read: false,
        metadata: {
          product_id: post.id,
          product_name: post.product_name,
          buyer_name: name,
          buyer_phone: phone,
          price: productPrice,
          total_price: totalAmount,
        },
      }]);

        if (insertError) {
          Alert.alert('Error', insertError.message);
        } else {
          Alert.alert('🎉 Purchase Complete!', 'Thank you for buying!', [
            { text: 'Back to Home', onPress: () => navigation.navigate('Home') }
          ]);
        }
      })
      .catch((error) => {
        Alert.alert('Payment Failed', error?.description || 'Try again later.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔷 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AllenInside</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* 🔹 Product Info */}
      <Image source={{ uri: post?.image_url }} style={styles.image} />
      <Text style={styles.title}>{post?.product_name}</Text>

      {/* 🔹 Pricing */}
      <View style={styles.priceBox}>
        <Text style={styles.label}>Product Price:</Text>
        <Text style={styles.value}>₹{productPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.priceBox}>
        <Text style={styles.label}>Platform Fee (5%):</Text>
        <Text style={styles.value}>₹{platformFee.toFixed(2)}</Text>
      </View>
      <View style={styles.priceBox}>
        <Text style={styles.labelBold}>Total Payable:</Text>
        <Text style={styles.valueBold}>₹{totalAmount.toFixed(2)}</Text>
      </View>

      {/* 🔹 Buyer Form */}
      <TextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Your Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
        placeholderTextColor="#888"
      />

      {/* 🔹 Buy Button */}
      <TouchableOpacity style={styles.buyButton} onPress={handlePayment}>
        <Text style={styles.buyButtonText}>Pay & Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f4f6f8' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  cancelText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0aada8',
  },

  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },

  priceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 15,
    color: '#555',
  },
  value: {
    fontSize: 15,
    color: '#333',
  },
  labelBold: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  valueBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0aada8',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  buyButton: {
    backgroundColor: '#0aada8',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PurchaseForm;
