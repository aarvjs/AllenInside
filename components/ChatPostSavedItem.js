// components/CartItem.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

const CartItem = ({ item, onRemove, onSaveForLater }) => {
  const [selectedQty, setSelectedQty] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.imageBlock}>
          <Image source={{ uri: item.productImage }} style={styles.productImage} />
         <View style={styles.dropdownBox}>
                        <View
                            style={{
                                height: 40,
                                width: 100,
                                backgroundColor: '#f2f2f2',
                                borderRadius: 6,
                                justifyContent: 'center',
                                paddingHorizontal: 5,
                                overflow: 'hidden',
                            }}
                        >
                            <Picker
                                selectedValue={selectedQty}
                                onValueChange={(value) => setSelectedQty(value)}
                                mode="dropdown"
                                dropdownIconColor="#000"
                                style={{
                                    color: '#000',
                                    fontSize: 14, 
                                    height: 50,
                                    width: '100%',
                                }}
                            >
                                <Picker.Item label="1" value="Qtr:1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5+" value="5+" />
                            </Picker>
                        </View>
           </View>

        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.title}>{item.productTitle}</Text>
          <Text style={styles.subtitle} numberOfLines={2}>{item.description}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.viewMoreBtn}>
        <Text style={styles.viewMoreText}>Buy Now →</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHandle} />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeIcon}>
              <MaterialIcons name="close" size={24} color="#555" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{item.productTitle}</Text>
            <Text style={styles.modalDescription}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => onRemove(item.id)}>
          <MaterialIcons name="delete-outline" size={20} color="#555" />
          <Text style={styles.btnText}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => onSaveForLater(item.id)}>
          <MaterialIcons name="arrow-downward" size={20} color="#555" />
          <Text style={styles.btnText}>Save for later</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialIcons name="bolt" size={20} color="#555" />
          <Text style={styles.btnText}>Buy this now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  topRow: { flexDirection: 'row' },
  imageBlock: { alignItems: 'center', marginRight: 12 },
  productImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  dropdownBox: {
    marginTop: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    overflow: 'hidden',
    width: 90,
    height: 34,
    justifyContent: 'center',
  },
  qtyContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    width: 90,
  },
  picker: {
    fontSize: 13,
    color: '#000',
    height: 34,
    width: '100%',
  },
  infoBlock: { flex: 1 },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 4,
  },
  title: { fontSize: 15, fontWeight: 'bold', color: '#000' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  price: { fontWeight: 'bold', color: '#000', fontSize: 16 },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 10,
  },
  actionBtn: { alignItems: 'center' },
  btnText: { fontSize: 12, color: '#333', marginTop: 4 },
  viewMoreBtn: { alignSelf: 'flex-end', marginTop: 10, marginRight: 4 },
  viewMoreText: { color: '#007BFF', fontSize: 13, fontWeight: '600' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
    height: '70%',
    elevation: 10,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 6,
    zIndex: 10,
  },
});

export default CartItem;
