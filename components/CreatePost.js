import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Modal} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CreatePost = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const openCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.errorCode) {
        setImageUri(response.assets[0].uri);
        setModalVisible(false);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.errorCode) {
        setImageUri(response.assets[0].uri);
        setModalVisible(false);
      }
    });
  };

  

//   useEffect(() => {
//   openCamera(); 
// }, []);


  return (
    <View style={styles.container}>
      {/* Main Post Button */}
      <TouchableOpacity style={styles.postButton} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="photo-camera" size={24} color="white" />
        <Text style={styles.postText}>Create Post</Text>
      </TouchableOpacity>

      {/* Modal / Bottom Sheet */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Choose Option</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={openCamera}>
              <MaterialIcons name="camera-alt" size={22} />
              <Text style={styles.optionText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={openGallery}>
              <MaterialIcons name="photo-library" size={22} />
              <Text style={styles.optionText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Image Preview */}
      {imageUri && (
        <Image source={{uri: imageUri}} style={styles.previewImage} />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  postButton: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  postText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000000aa',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  cancelBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: 'red',
    fontWeight: 'bold',
  },
  previewImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginTop: 20,
  },
});


export default CreatePost;
