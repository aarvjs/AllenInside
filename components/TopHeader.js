// ===== TopHeader.js =====
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const screenHeight = Dimensions.get('window').height;

const TopHeader = ({ scrollY }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

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

  const closeModal = () => setModalVisible(false);

  return (
    <>
      <Animated.ScrollView style={[styles.wrapper, { transform: [{ translateY }] }]}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerContainer}>
            <View style={styles.profileSection}>
              <Image source={require('../assets/conn.jpg')} style={styles.profileImage} />
              <View>
                <Text style={styles.username}>Arvind Yadav</Text>
                <TouchableOpacity style={styles.locationBox} onPress={() => setModalVisible(true)}>
                  <Text style={styles.location}>Kanpur, UP</Text>
                  <MaterialIcons name="arrow-drop-down" size={18} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.iconSection}>
              <TouchableOpacity style={styles.iconWrapper}>
                <MaterialIcons name="notifications" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconWrapper, { marginLeft: 10 }]}>
                <MaterialIcons name="favorite-border" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* ✅ MODAL: Pure half screen with overlay */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalWrapper}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <TextInput
                      style={styles.searchBar}
                      placeholder="Search location..."
                      placeholderTextColor="#888"
                      value={searchText}
                      onChangeText={setSearchText}
                    />
                    <TouchableOpacity onPress={closeModal}>
                      <MaterialIcons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalContent}>
                    <Text style={{ color: '#777' }}>Map ya Location UI yahan aa sakta hai...</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  headerWrapper: {
    backgroundColor: 'blue',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  username: {
    fontWeight: '800',
    fontSize: 16,
    color: '#fff',
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'yellow',
    paddingHorizontal: 6,
    borderRadius: 5,
    marginTop: 2,
  },
  location: {
    color: 'gray',
    fontSize: 12,
  },
  iconSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 10,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    width: '100%',
    height: screenHeight * 0.5,
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopHeader;
