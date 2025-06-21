import React, { useCallback, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActionSheetIOS,
  Platform,
  UIManager,
  FlatList,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const PostScreen = () => {
  const [imageUris, setImageUris] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
  const [modalHeight, setModalHeight] = useState(height * 0.6);
  const [resizeMode, setResizeMode] = useState('cover');
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const navigation = useNavigation();

  const scrollRef = useRef();
  const modalScrollRef = useRef();
  const menuRefs = useRef([]);

  useFocusEffect(
    useCallback(() => {
      openGallery();
      return () => {
        setImageUris([]);
      };
    }, [])
  );

  const openGallery = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
        includeBase64: true,
      });

      if (response.didCancel) return;
      if (response.assets?.length > 0) {
        const uris = response.assets.map((asset) => asset.uri);
        setImageUris(uris);
      } else {
        Alert.alert('No images selected');
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to select images');
    }
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (width - 40));
    setCurrentIndex(index);
  };

  const handleModalScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setModalCurrentIndex(index);
  };

  const handleImagePress = (uri, index) => {
    setCurrentIndex(index);
    setModalCurrentIndex(index);
    setModalVisible(true);
    
    Image.getSize(uri, (imgWidth, imgHeight) => {
      const isPortrait = imgHeight > imgWidth;
      setModalHeight(isPortrait ? height * 0.85 : height * 0.4);
      setResizeMode(isPortrait ? 'contain' : 'cover');
    });
  };

  const showActionSheet = (index) => {
    setSelectedMenuIndex(index);
    
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Delete Image', 'Crop Image', 'Delete All'],
          destructiveButtonIndex: [1, 3],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => handleMenuAction(buttonIndex, index)
      );
    } else {
      setMenuVisible(true);
    }
  };

  const handleMenuAction = (buttonIndex, index) => {
    setMenuVisible(false);
    
    switch (buttonIndex) {
      case 1:
        deleteImage(index);
        break;
      case 2:
        cropImage(index);
        break;
      case 3:
        deleteAllImages();
        break;
      default:
        break;
    }
  };

  const deleteImage = (index) => {
    const newImages = [...imageUris];
    newImages.splice(index, 1);
    setImageUris(newImages);
    
    if (newImages.length === 0) {
      setModalVisible(false);
    } else if (index === currentIndex) {
      const newIndex = Math.max(0, Math.min(index, newImages.length - 1));
      setCurrentIndex(newIndex);
      setModalCurrentIndex(newIndex);
    }
  };

  const cropImage = (index) => {
    Alert.alert('Coming Soon', 'Crop functionality will be added soon');
  };

  const deleteAllImages = () => {
    setImageUris([]);
    setModalVisible(false);
  };

  const renderImageItem = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => handleImagePress(item, index)}>
        <Image 
          source={{ uri: item }} 
          style={styles.sliderImage} 
          resizeMode="cover"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={(e) => {
          e.stopPropagation();
          showActionSheet(index);
        }}
      >
        <Icon name="more-vert" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderModalImage = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={styles.fullImage}
      resizeMode={resizeMode}
    />
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Create a Post</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DocumentDetails')}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>

        {imageUris.length > 0 && (
          <View style={styles.sliderContainer}>
            <View style={styles.counterContainerLeft}>
              <Text style={styles.counterText}>
                {currentIndex + 1} / {imageUris.length}
              </Text>
            </View>

            <FlatList
              horizontal
              pagingEnabled
              ref={scrollRef}
              data={imageUris}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScroll}
              getItemLayout={(data, index) => ({
                length: width - 40,
                offset: (width - 40) * index,
                index,
              })}
              initialScrollIndex={currentIndex}
            />
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.fullOverlay}>
          <View style={[styles.fullImageModal, { height: modalHeight }]}>
            <FlatList
              horizontal
              pagingEnabled
              ref={modalScrollRef}
              data={imageUris}
              renderItem={renderModalImage}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleModalScroll}
              initialScrollIndex={modalCurrentIndex}
              getItemLayout={(data, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
            />
            
            <View style={styles.modalCounterContainer}>
              <Text style={styles.modalCounterText}>
                {modalCurrentIndex + 1} / {imageUris.length}
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.floatingCloseIcon}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={28} color="#fff" />
            </TouchableOpacity>
            
            {modalCurrentIndex > 0 && (
              <TouchableOpacity
                style={styles.navArrowLeft}
                onPress={() => {
                  modalScrollRef.current?.scrollToIndex({
                    index: modalCurrentIndex - 1,
                    animated: true,
                  });
                }}
              >
                <Icon name="chevron-left" size={36} color="#fff" />
              </TouchableOpacity>
            )}
            
            {modalCurrentIndex < imageUris.length - 1 && (
              <TouchableOpacity
                style={styles.navArrowRight}
                onPress={() => {
                  modalScrollRef.current?.scrollToIndex({
                    index: modalCurrentIndex + 1,
                    animated: true,
                  });
                }}
              >
                <Icon name="chevron-right" size={36} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {menuVisible && Platform.OS === 'android' && (
        <View style={styles.androidMenuContainer}>
          <View style={styles.androidMenu}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuAction(1, selectedMenuIndex)}
            >
              <Text style={styles.menuItemText}>Delete Image</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuAction(2, selectedMenuIndex)}
            >
              <Text style={styles.menuItemText}>Crop Image</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuAction(3, selectedMenuIndex)}
            >
              <Text style={[styles.menuItemText, styles.destructiveText]}>Delete All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.menuItemText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollArea: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  nextText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
    padding: 6,
  },
  sliderContainer: {
    position: 'relative',
    marginBottom: 20,
    height: 200,
  },
  imageContainer: {
    width: width - 40,
    marginRight: 16,
    position: 'relative',
  },
  sliderImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 5,
  },
  counterContainerLeft: {
    position: 'absolute',
    top: 10,
    left: 25,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    zIndex: 10,
  },
  counterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  fullOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
  },
  fullImageModal: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  fullImage: {
    width: width,
    height: '100%',
  },
  floatingCloseIcon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 24,
    padding: 8,
  },
  androidMenuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  androidMenu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: width * 0.7,
    overflow: 'hidden',
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  destructiveText: {
    color: 'red',
  },
  modalCounterContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  modalCounterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  navArrowLeft: {
    position: 'absolute',
    left: 20,
    top: '50%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
    padding: 8,
  },
  navArrowRight: {
    position: 'absolute',
    right: 20,
    top: '50%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
    padding: 8,
  },
});

export default PostScreen;
