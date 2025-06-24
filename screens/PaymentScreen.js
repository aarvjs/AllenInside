import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { useRoute, useNavigation } from '@react-navigation/native';
import { supabase } from '../supabaseClient';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { form, selectedCategory, selectedCondition, fullImage } = route.params;

  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user && !error) {
        setUserEmail(user.email);
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

const handlePayment = async () => {
  const sellingPrice = parseFloat(form.sellingPrice);

  if (isNaN(sellingPrice)) {
    Alert.alert('Invalid Price', 'Please enter a valid selling price');
    return;
  }

  const payableAmountInPaise = sellingPrice * 0.05 * 100; 

  const options = {
    description: 'Product Posting Fee (5%)',
    currency: 'INR',
    key: 'rzp_test_CfR43fxpWq1P0Y',
    amount: payableAmountInPaise,
    name: 'AllenInside',
    image: require('../assets/logo.jpeg'),
    prefill: {
      email: userEmail || 'test@example.com',
      contact: '9876543210',
    },
    theme: { color: '#0aada8' },
  };

  RazorpayCheckout.open(options)
    .then(async (paymentResult) => {
      setLoading(true);

      const { error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            user_id: userId,
            product_name: form.name,
            category: selectedCategory,
            condition: selectedCondition,
            purchase_price: form.purchasePrice,
            selling_price: form.sellingPrice, // ✅ Original price saved
            description: form.description,
            image_url: fullImage,
          },
        ]);

      setLoading(false);

      if (insertError) {
        Alert.alert('Database Error', insertError.message);
      } else {
        Alert.alert(
          '🎉 Shabash!',
          'Tune product ka post kar diya hai — ab ye sabko dikh raha hai!',
          [{ text: 'Wapas Home 🏠', onPress: () => navigation.navigate('Home') }]
        );
      }
    })
    .catch((error) => {
      setLoading(false);
      Alert.alert('Payment Failed', error?.description || 'Try again');
    });
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
        <Text style={styles.appName}>AllenInside</Text>
        <Text style={styles.title}>Post Your Product</Text>
        <View style={styles.line} />

        <Text style={styles.label}>Product Name</Text>
        <Text style={styles.value}>{form.name}</Text>

        {/* <Text style={styles.label}>Amount to Pay</Text>
        <Text style={styles.value}>₹{form.sellingPrice}</Text> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 }}>
  <Text style={[styles.label, { fontWeight: 'bold' }]}>Selling Price:</Text>
  <Text style={styles.value}>₹{form.sellingPrice}</Text>
</View>

<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 5 }}>
  <Text style={[styles.label, { fontWeight: 'bold' }]}>Amount to Pay (5%):</Text>
  <Text style={[styles.value, { color: '#007bff' }]}>
    ₹{(parseFloat(form.sellingPrice || 0) * 0.05).toFixed(2)}
  </Text>
</View>


        <Text style={styles.label}>Your Email</Text>
        <Text style={styles.value}>{userEmail || 'Loading...'}</Text>

        {loading ? (
          <>
            <ActivityIndicator size="large" color="#0aada8" style={{ marginTop: 20 }} />
            <Text style={styles.waitText}>Please wait while we post your product...</Text>
          </>
        ) : (
          <View style={{ marginTop: 20, width: '100%' }}>
            <Button title="Pay Now" onPress={handlePayment} color="#0aada8" />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginBottom: 10,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0aada8',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#777',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'flex-start',
  },
  waitText: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default PaymentScreen;
