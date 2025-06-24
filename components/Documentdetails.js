import React, {useState, useEffect} from 'react';
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
import {Dropdown} from 'react-native-element-dropdown';
// import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('window');

const categories = [
  {label: 'Electronics', value: 'Electronics'},
  {label: 'Clothing', value: 'Clothing'},
  {label: 'Books', value: 'Books'},
  {label: 'Other', value: 'Other'},
];

const conditions = [
  {label: 'New', value: 'New'},
  {label: 'Used', value: 'Used'},
  {label: 'Refurbished', value: 'Refurbished'},
];

const DocumentDetails = ({navigation, route}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [feeModalVisible, setFeeModalVisible] = useState(false);
  const [fullImage, setFullImage] = useState(null);
  const [form, setForm] = useState({
    name: '',
    purchasePrice: '',
    sellingPrice: '',
    description: '',
  });
  useEffect(() => {
    if (route.params?.firstImage) {
      setFullImage(route.params.firstImage);
    }
  }, [route.params]);

  //  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create</Text>
        <View style={{width: 28}} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: fullImage || 'https://via.placeholder.com/100'}}
              style={styles.imagePreview}
              resizeMode="cover"
              onError={() => {}}
            />
          </View>
          <View style={styles.rightFields}>
            {/* Category */}
            <View style={styles.inputRow}>
              <Icon
                name="category"
                size={20}
                color="#666"
                style={styles.icon}
              />
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.dropdownText}
                selectedTextStyle={styles.dropdownText}
                iconStyle={{width: 20, height: 20}}
                data={categories}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder="Category"
                // placeholderTextColor="#888"
                value={selectedCategory}
                onChange={item => setSelectedCategory(item.value)}
              />
            </View>

            {/* Product Name */}
            <View style={styles.inputRow}>
              <Icon name="label" size={20} color="#666" style={styles.icon} />
              <TextInput
                style={styles.inputText}
                placeholder="Product Name"
                placeholderTextColor="#888"
                value={form.name}
                onChangeText={val => setForm({...form, name: val})}
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
            iconStyle={{width: 20, height: 20}}
            data={conditions}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder="Product Condition"
            value={selectedCondition}
            onChange={item => setSelectedCondition(item.value)}
          />
        </View>

        {/* Purchase Price */}
        <View style={styles.inputRow}>
          <Icon
            name="shopping-cart"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Purchase Price"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={form.purchasePrice}
            onChangeText={val => setForm({...form, purchasePrice: val})}
          />
        </View>

        {/* Selling Price */}
        <View style={styles.inputRow}>
          <Icon
            name="attach-money"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={[styles.inputText, {flex: 1}]}
            placeholder="Selling Price"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={form.sellingPrice}
            onChangeText={val => setForm({...form, sellingPrice: val})}
          />
          <TouchableOpacity onPress={() => setFeeModalVisible(true)} activeOpacity={0.8}>
  <View style={styles.feeBox}>
    <Text style={styles.feeText}>+ 10% Fee</Text>
    <Icon name="keyboard-arrow-down" size={18} color="#333" />
  </View>
</TouchableOpacity>

        </View>

        {/* Description */}
        <TextInput
          style={styles.boxedInput}
          placeholder="Description"
          placeholderTextColor="#888"
          multiline
          value={form.description}
          onChangeText={val => setForm({...form, description: val})}
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.postButton}
            onPress={() =>
              navigation.navigate('PaymentScreen', {
                form,
                selectedCategory,
                selectedCondition,
                fullImage,
              })
            }>
            <Text style={{color: '#fff'}}>Pay & Post</Text>
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

      {/* Scrollable Modal Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0aada8', marginBottom: 6 }}>
          AllenInside Fee Policy
        </Text>
        <View style={{height:'1',width:'100%', backgroundColor:'#eee'}}></View>

        <Text style={{ fontSize: 14, color: '#444', marginBottom: 10 }}>
          We believe in maintaining transparency. Please read the following policy carefully before posting your product:
        </Text>

        <Text style={{ fontSize: 14, color: '#555', lineHeight: 22 }}>
          • <Text style={{ fontWeight: 'bold' }}>10% platform fee</Text> is deducted from your selling price when you post any product on AllenInside.
        </Text>

        <Text style={{ fontSize: 14, color: '#555', marginTop: 10, lineHeight: 22 }}>
          • If a buyer chooses <Text style={{ fontWeight: 'bold' }}>online payment</Text>, the company will <Text style={{ fontWeight: 'bold' }}>return 50% of the fee</Text> (i.e., 5%) to you as a loyalty benefit.
        </Text>

        <Text style={{ fontSize: 14, color: '#555', marginTop: 10, lineHeight: 22 }}>
          • If the buyer selects <Text style={{ fontWeight: 'bold' }}>Cash on Delivery (COD)</Text>, the complete 10% platform fee will be retained by AllenInside to cover logistics and operational charges.
        </Text>

        <Text style={{ fontSize: 14, color: '#777', marginTop: 20, fontStyle: 'italic' }}>
          Note: These policies ensure a fair and trusted environment for both buyers and sellers on AllenInside.
        </Text>

        <TouchableOpacity onPress={() => setFeeModalVisible(false)} style={{ marginTop: 20 }}>
          <Text style={{ color: '#2196F3', textAlign: 'right', fontWeight: '600' }}>Got it</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  </TouchableOpacity>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  feeBox: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  borderRadius: 20,
  paddingVertical: 6,
  paddingHorizontal: 12,
  alignSelf: 'flex-start', // Optional, to avoid full width
  elevation: 2,
},

feeText: {
  fontSize: 14,
  color: '#333',
  marginRight: 4,
  fontWeight: '500',
},

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {padding: 16},
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
  rightFields: {flex: 1},
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
    // color: '#888'
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
