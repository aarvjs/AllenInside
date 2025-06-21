import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';

const { width } = Dimensions.get('window');

const categories = [
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Clothing', value: 'Clothing' },
  { label: 'Books', value: 'Books' },
  { label: 'Other', value: 'Other' },
];

const conditions = [
  { label: 'New', value: 'New' },
  { label: 'Used', value: 'Used' },
  { label: 'Refurbished', value: 'Refurbished' },
];

const DocumentDetails = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [feeModalVisible, setFeeModalVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    purchasePrice: '',
    sellingPrice: '',
    description: '',
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.imagePreview}
          />
          <View style={styles.rightFields}>
            {/* Category */}
            <View style={styles.inputRow}>
              <Icon name="category" size={20} color="#666" style={styles.icon} />
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownText}
                selectedTextStyle={styles.dropdownText}
                iconStyle={{ width: 20, height: 20 }}
                data={categories}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder="Category"
                value={selectedCategory}
                onChange={(item) => setSelectedCategory(item.value)}
              />
            </View>

            {/* Product Name */}
            <View style={styles.inputRow}>
              <Icon name="label" size={20} color="#666" style={styles.icon} />
              <TextInput
                style={styles.inputText}
                placeholder="Product Name"
                placeholderTextColor="#000"
                value={form.name}
                onChangeText={(val) => setForm({ ...form, name: val })}
              />
            </View>
          </View>
        </View>

        {/* Product Condition */}
        <View style={styles.inputRow}>
          <Icon name="info" size={20} color="#666" style={styles.icon} />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
            iconStyle={{ width: 20, height: 20 }}
            data={conditions}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder="Product Condition"
            value={selectedCondition}
            onChange={(item) => setSelectedCondition(item.value)}
          />
        </View>

        {/* Purchase Price */}
        <View style={styles.inputRow}>
          <Icon name="shopping-cart" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            placeholder="Purchase Price"
            placeholderTextColor="#000"
            keyboardType="numeric"
            value={form.purchasePrice}
            onChangeText={(val) => setForm({ ...form, purchasePrice: val })}
          />
        </View>

        {/* Selling Price */}
        <View style={styles.inputRow}>
          <Icon name="attach-money" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={[styles.inputText, { flex: 1 }]}
            placeholder="Selling Price"
            placeholderTextColor="#000"
            keyboardType="numeric"
            value={form.sellingPrice}
            onChangeText={(val) => setForm({ ...form, sellingPrice: val })}
          />
          <TouchableOpacity onPress={() => setFeeModalVisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.feeText}>+ 4% Fee</Text>
              <Icon name="keyboard-arrow-down" size={18} color="#555" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <TextInput
          style={styles.boxedInput}
          placeholder="Description"
          placeholderTextColor="#000"
          multiline
          value={form.description}
          onChangeText={(val) => setForm({ ...form, description: val })}
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.discardButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={{ color: '#333' }}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton}>
            <Text style={{ color: '#fff' }}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fee Info Modal */}
      <Modal
        visible={feeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFeeModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlayBottom}
          activeOpacity={1}
          onPressOut={() => setFeeModalVisible(false)}
        >
          <View style={styles.modalBoxBottom}>
            {/* Floating Close Icon */}
            <TouchableOpacity
              onPress={() => setFeeModalVisible(false)}
              style={styles.closeIcon}
            >
              <Icon name="close" size={22} color="#333" />
            </TouchableOpacity>

            {/* Modal Content */}
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Company Fee</Text>
            <Text style={{ marginVertical: 10 }}>
              A 4% fee will be deducted from your final selling price.
            </Text>
            <TouchableOpacity onPress={() => setFeeModalVisible(false)}>
              <Text style={{ color: '#2196F3', textAlign: 'right' }}>Got it</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: { padding: 16 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  imagePreview: {
    width: 120,
    height: 120,
    top: 15,
    borderRadius: 12,
    marginRight: 14,
    backgroundColor: '#eee',
  },
  rightFields: { flex: 1 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  boxedInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 25,
    fontSize: 14,
    height: 100,
    color: '#000',
    textAlignVertical: 'top',
  },
  feeText: {
    fontSize: 12,
    color: '#555',
    marginRight: 4,
  },
  dropdown: {
    flex: 1,
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  discardButton: {
    flex: 0.45,
    padding: 14,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    alignItems: 'center',
  },
  postButton: {
    flex: 0.45,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  modalOverlayBottom: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'flex-end',
},

modalBoxBottom: {
  height: '60%',
  width: '100%',
  backgroundColor: '#fff',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 20,
  elevation: 6,
  position: 'relative',
},

closeIcon: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 999,
  padding: 6,
},

});

export default DocumentDetails;
