import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SettingDetailsCard = ({ visible, onClose, title }) => {
  const renderContent = () => {
    switch (title) {
      case 'Account':
        return (
          <>
            <Text style={styles.subTitle}>Your Account Info</Text>
            <Text style={styles.detailText}>Email: arvind@gmail.com</Text>
            <Text style={styles.detailText}>Username: arvind_dev</Text>
          </>
        );
      case 'Notifications':
        return (
          <>
            <Text style={styles.subTitle}>Notification Settings</Text>
            <Text style={styles.detailText}>You’ll receive updates for comments and likes.</Text>
          </>
        );
      case 'Privacy Policy':
        return (
          <>
            <Text style={styles.subTitle}>Privacy Policy</Text>
            <Text style={styles.policyText}>
              We respect your privacy. All your data is secure. This app does not share your data with third parties.
              We store your preferences locally on your device, and do not use third-party advertising networks.
            </Text>
          </>
        );
      case 'Security':
        return (
          <>
            <Text style={styles.subTitle}>Security Settings</Text>
            <Text style={styles.detailText}>Password: ********</Text>
            <Text style={styles.detailText}>2FA: Enabled</Text>
          </>
        );
      case 'Terms & Conditions':
        return (
          <>
            <Text style={styles.subTitle}>Terms & Conditions</Text>
            <Text style={styles.policyText}>
              By using this app, you agree to our terms and conditions. Please use it responsibly. Avoid misuse,
              and follow community guidelines for a better experience for everyone.
            </Text>
          </>
        );
      default:
        return <Text style={{ fontStyle: 'italic' }}>No content available.</Text>;
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={onClose}>
                  <MaterialIcons name="close" size={26} color="#444" />
                </TouchableOpacity>
              </View>

              <View style={styles.divider} />

              <ScrollView
                style={{ maxHeight: 300 }}
                showsVerticalScrollIndicator={true}
              >
                {renderContent()}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 25,
    minHeight: 300,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  policyText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
});

export default SettingDetailsCard;
