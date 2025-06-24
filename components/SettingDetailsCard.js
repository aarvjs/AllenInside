import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { supabase } from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';

const SettingDetailsCard = ({ visible, onClose, title }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


 useEffect(() => {
  const fetchNotifications = async () => {
    if (title === 'Notifications') {
      setLoading(true);
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPosts(data);
      }

      setLoading(false);
    }
  };

  fetchNotifications();
}, [title]);



  // Fetch user's posts from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      if (title === 'History') {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('posts')
          .select('product_name, selling_price, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setPosts(data);
        }

        setLoading(false);
      }
    };

    fetchPosts();
  }, [title]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderContent = () => {
    switch (title) {
      case 'History':
        return (
          <>
            <Text style={styles.subTitle}>Your Posts Payment</Text>
            {loading ? (
              <ActivityIndicator color="#0aada8" size="small" />
            ) : posts.length > 0 ? (
              posts.map((post, index) => (
                <View key={index} style={styles.row}>
                  <Text style={styles.product}>{post.product_name}</Text>
                  <Text style={styles.price}>₹{post.selling_price}</Text>
                  <Text style={styles.date}>{formatDate(post.created_at)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.detailText}>No purchased posts found.</Text>
            )}
          </>
        );
    case 'Notifications':
  return (
    <>
      <Text style={styles.subTitle}>Your Notifications</Text>

      {loading ? (
        <ActivityIndicator color="#0aada8" size="small" />
      ) : posts.length > 0 ? (
        posts.map((note, index) => (
          <TouchableOpacity
            key={index}
            style={styles.row}
            onPress={() => {
              if (note.metadata) {
                navigation.navigate('PurchaseDetails', { data: note.metadata });
              }
            }}
          >
            <Text style={styles.product}>{note.message}</Text>
            <Text style={styles.date}>{formatDate(note.created_at)}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.detailText}>No notifications yet.</Text>
      )}
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
    marginBottom: 12,
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
   row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fefefe',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  product: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1.5,
    color: '#222',
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0aada8',
    textAlign: 'center',
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: '#888',
    opacity: 0.8,
    flex: 1.2,
    textAlign: 'right',
  },

});

export default SettingDetailsCard;
