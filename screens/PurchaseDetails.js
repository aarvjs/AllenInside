import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PurchaseDetails = () => {
  const { params } = useRoute();
  const data = params?.data || {};

  const shortProductId = data.product_id ? `#${data.product_id.slice(-6).toUpperCase()}` : 'N/A';

  const platformFee = data.total_price && data.price
    ? (data.total_price - data.price).toFixed(2)
    : '0.00';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🧾 Header */}
      <Text style={styles.header}>🧾 Purchase Receipt</Text>

      {/* 🟩 Product Info */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>📦 Product</Text>
        <Text style={styles.label}>Product ID</Text>
        <Text style={styles.value}>{shortProductId}</Text>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{data.product_name || 'N/A'}</Text>
      </View>

      {/* 👤 Buyer Info */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>👤 Buyer</Text>
        <Text style={styles.label}>Full Name</Text>
        <Text style={[styles.value, styles.highlighted]}>{data.buyer_name || 'N/A'}</Text>

        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.value}>{data.buyer_phone || 'N/A'}</Text>
      </View>

      {/* 💸 Payment Info */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>💸 Payment Summary</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Product Price</Text>
          <Text style={styles.value}>₹{data.price?.toFixed(2) || '0.00'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Platform Fee (5%)</Text>
          <Text style={styles.value}>₹{platformFee}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total Paid</Text>
          <Text style={styles.totalValue}>₹{data.total_price?.toFixed(2) || '0.00'}</Text>
        </View>
      </View>

      {/* ✅ Thank You Note */}
      <Text style={styles.note}>
        🎉 Thank you for shopping with <Text style={styles.appName}>AllenInside</Text>!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f6f8',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0aada8',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  label: {
    color: '#777',
    fontSize: 13,
    marginTop: 6,
  },
  value: {
    color: '#222',
    fontSize: 15,
    fontWeight: '500',
  },
  highlighted: {
    color: '#0aada8',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0aada8',
  },
  note: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 13,
    color: '#666',
  },
  appName: {
    color: '#0aada8',
    fontWeight: 'bold',
  },
});

export default PurchaseDetails;
