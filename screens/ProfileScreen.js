import React, { useState,useRef,useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import SettingDetailsCard from '../components/SettingDetailsCard';
import { supabase } from "../supabaseClient";
import { Alert } from 'react-native';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ tabOffset }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [underlineAnim] = useState(new Animated.Value(0));
  const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(true);
const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  // const [loading, setLoading] = useState(true);


   // Fetch user and posts====================================================================================
  //  ================================================================================================ 
 useEffect(() => {
  const fetchData = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) return;

    setUserId(user.id);

    const { data: postData, error: postError } = await supabase
      .from('posts')
      .select('*, users(name, username)') // ✅ JOIN with users
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!postError && postData) {
      setPosts(postData);
    }

    setLoading(false);
  };

  fetchData();
}, []);


const handlePostDelete = (deletedId) => {
  setPosts(prev => prev.filter(post => post.id !== deletedId));
};

  // Fetch user and posts====================================================================================
  //  ================================================================================================ 


  const handleToggleModal = () => setVisible(!visible);

  // logout hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
  const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    Alert.alert("Logout Error", error.message);
  } else {
    
    navigation.replace('Login'); 
  }
};

// profile data hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
useEffect(() => {
  const fetchUserData = async () => {
    setLoading(true);

    const {
      data: { user },
      error: sessionError,
    } = await supabase.auth.getUser();

    if (sessionError || !user) {
      console.log("Session error:", sessionError?.message);
      setLoading(false);
      return;
    }

    setEmail(user.email); // from auth

    const { data, error } = await supabase
      .from('users')
      .select('name')
      .eq('id', user.id)
      .single();

    if (error) {
      console.log("Name fetch error:", error.message);
    } else {
      setName(data.name);
    }

    setLoading(false); 
  };

  fetchUserData();
}, []);

// profile eneddddddddddddddddd data hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// deleted acount start hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee 
const handleDeleteAccount = async () => {
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    alert('Not logged in.');
    return;
  }

  // ⚠️ Step 1: Delete from your custom "users" table
  const { error: deleteUserError } = await supabase
    .from('users')
    .delete()
    .eq('id', user.id);

  if (deleteUserError) {
    alert('Failed to delete user data: ' + deleteUserError.message);
    return;
  }

  // ⚠️ Step 2: Delete from Supabase Auth
  const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(user.id);

  if (deleteAuthError) {
    alert('Failed to delete auth user: ' + deleteAuthError.message);
    return;
  }

  alert('Account deleted successfully.');
};

// deleted account hereeeeeeeeeeeeeeeeeeeeeeeeeeeee enddddddddddddddddddddddddddd 




  const handleTabChange = (tab) => {
    setActiveTab(tab);
    let toValue = tab === 'all' ? 0 : tab === 'videos' ? width / 3 : (width / 3) * 2;
    Animated.timing(underlineAnim, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

 const settingsItems = [
  { title: 'History', icon: 'person' },
  { title: 'Notifications', icon: 'notifications' },
  { title: 'Privacy Policy', icon: 'privacy-tip' },
  { title: 'Security', icon: 'security' },
  { title: 'Terms & Conditions', icon: 'description' },
];


// card open hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
const [selectedSetting, setSelectedSetting] = useState(null);
const [isCardVisible, setIsCardVisible] = useState(false);

const openSettingCard = (title) => {
  setSelectedSetting(title);
  setIsCardVisible(true);
};

const closeSettingCard = () => {
  setIsCardVisible(false);
};

// scroolbar animtion hreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

 const scrollY = useRef(new Animated.Value(0)).current;
  const prevScrollY = useRef(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const currentY = event.nativeEvent.contentOffset.y;
        const diff = currentY - prevScrollY.current;

        if (diff > 5) {
          // Scroll down → Hide tab bar
          Animated.timing(tabOffset, {
            toValue: 100,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else if (diff < -5) {
          // Scroll up → Show tab bar
          Animated.timing(tabOffset, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }

        prevScrollY.current = currentY;
      },
    }
  );


  

  return (
    <Animated.ScrollView
    onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}>

        {/* profile section hreeeeeee startttttttttttttttttttttttttttttttttttttt */}
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1499336315816-097655dcfbda' }}
        style={styles.headerBackground}
        imageStyle={styles.headerImageStyle}
      >
        <View style={styles.headerContent}>
          <View style={styles.placeholder} />
          <TouchableOpacity style={styles.iconButton} onPress={handleToggleModal}>
            <MaterialIcons name="settings" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.profileWrapper}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' }}
          style={styles.profileImage}
          imageStyle={styles.profileImageStyle}
        >
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => navigation.navigate('CreatePost')}
          >
            <MaterialIcons name="photo-camera" size={15} color="black" />
          </TouchableOpacity>
        </ImageBackground>

        {/* profile data hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  */}
     <View style={styles.profileTextWrapper}>
 {loading ? (
  <ActivityIndicator size="small" color="#007bff" />
) : (
  <>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.email}>{email}</Text>
  </>
)}
</View>




        <TouchableOpacity style={styles.editIcon}>
          <MaterialIcons name="edit" size={22} color="#333" />
        </TouchableOpacity>
      </View>
      {/* here end profileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */}

      {/* here setting conent startttttttttttttttttttttttttttttttttttttttttttttttttttttt */}

<ScrollView style={styles.settingsList}>
  {settingsItems.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.settingItem}
      onPress={() => openSettingCard(item.title)}
    >
      <View style={styles.iconWithText}>
        <MaterialIcons name={item.icon} size={22} color="#bbb" style={styles.leftIcon} />
        <Text style={styles.settingText}>{item.title}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={22} color="#888" />
    </TouchableOpacity>
  ))}
</ScrollView>

<SettingDetailsCard
  visible={isCardVisible}
  onClose={closeSettingCard}
  title={selectedSetting}
/>

{/* hereeeeeeeeeeeeeeeeeeeeeeee end ddddddddddddddddddddddddddddddddddddddddd */}


{/* all post show hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee */}

    <View style={styles.tabBar}>
        {['all', 'videos', 'images'].map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabChange(tab)}
            style={styles.tabButton}
          >
            <MaterialIcons
              name={
                tab === 'all'
                  ? 'grid-on'
                  : tab === 'videos'
                  ? 'video-library'
                  : 'photo-library'
              }
              size={24}
              color={activeTab === tab ? '#000' : '#aaa'}
            />
          </TouchableOpacity>
        ))}
        <Animated.View style={[styles.underline, { left: underlineAnim }]} />
      </View>

      {/* Content */}
      <View style={styles.contentArea}>
        <ScrollView contentContainerStyle={styles.dynamicContent}>
          {activeTab !== 'videos' ? (
          <View style={styles.gridWrapper}>
  {loading ? (
    <Text>Loading...</Text>
  ) : posts.length > 0 ? (
    posts.map((post, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => navigation.navigate('PostProfileEdit', { post,onDelete: handlePostDelete })}
      >
        <View style={styles.gridCard}>
          <ImageBackground
            source={{ uri: post.image_url || 'https://via.placeholder.com/150' }}
            style={styles.cardImage}
            imageStyle={{ borderRadius: 8 }}
          />
          <Text style={styles.cardText}>{post.product_name || 'No Title'}</Text>
        </View>
      </TouchableOpacity>
    ))
  ) : (
    <Text>No posts found</Text>
  )}
</View>

          ) : (
            <View style={styles.gridWrapper}>
              <Text style={styles.noPostText}>Video posts coming soon...</Text>
            </View>
          )}
        </ScrollView>
      </View>
{/* end hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  */}

      <Modal transparent visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader} />
                <TouchableOpacity style={styles.modalItem}>
                  <Text style={styles.modalText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={handleLogout}>
                  <Text style={styles.modalText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem}>
                  <Text style={styles.modalText}>Share Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
  style={styles.modalItem}
  onPress={() => {
    Alert.alert(
      'Delete Account',
      'Your account and all your posts will be permanently deleted. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => handleDeleteAccount(),
        },
      ],
      { cancelable: true }
    );
  }}
>
  <Text style={styles.modalText}>Delete Account</Text>
</TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
   </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  headerBackground: { height: width * 0.5 },
  headerImageStyle: { borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 40 },
  placeholder: { width: 30 },
  iconButton: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, padding: 8 },
  profileWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: -55, paddingHorizontal: 20 },
  profileImage: { width: 70, height: 70 },
  profileImageStyle: { borderRadius: 50 },
  cameraIcon: {
    position: 'absolute', bottom: 1, right: 1, backgroundColor: 'white', borderRadius: 15, padding: 4, elevation: 5,
  },
  profileTextWrapper: { marginLeft: 15, marginTop: 60 },
  name: { fontSize: 22, fontWeight: '600', color: '#333' },
  email: { fontSize: 14, color: '#777' },
  editIcon: { marginLeft: 'auto', marginRight: 10, backgroundColor: '#ADD8E6', borderRadius: 20, padding: 6, marginTop: 60 },
  settingsList: { marginTop: 20 },
  settingItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#ddd',
  },

  settingText: { fontSize: 16, color: 'black' },
  tabBar: {
    flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ddd', position: 'relative',
  },

  settingsList: {
  marginTop: 20,
},



iconWithText: {
  flexDirection: 'row',
  alignItems: 'center',
},

leftIcon: {
  marginRight: 15,
  color:'black',
},



  tabButton: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  underline: { position: 'absolute', bottom: 0, width: width / 3, height: 3, backgroundColor: '#000' },
  contentArea: { flex: 1, backgroundColor: '#F9F9F9' },
  dynamicContent: { padding: 20 },
  postCard: { marginBottom: 15 },
  postItem: {
    fontSize: 16, backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 2,
  },


// dynamicContent: {
//   paddingHorizontal: 12,
//   paddingBottom: 20,
//   marginTop:10,
// },

gridWrapper: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  // justifyContent: 'space-between',
  gap:10,
  // paddingHorizontal: 10,
},

gridCard: {
  width: (width - 40) / 3, // 3 cards per row with padding
  marginBottom: 15,
  backgroundColor: '#f9f9f9',
  borderRadius: 8,
  overflow: 'hidden',
  elevation: 2,
},

cardImage: {
  width: '100%',
  height: 90,
  resizeMode: 'cover',
},

cardText: {
  textAlign: 'center',
  fontSize: 12,
  paddingVertical: 4,
  fontWeight: '600',
  color: '#333',
},

noPostText: {
  textAlign: 'center',
  fontSize: 16,
  color: '#888',
  marginTop: 20,
},

listWrapper: {
  flexDirection: 'column',
  gap: 10,
},

// articleCard: {
//   backgroundColor: '#fff',
//   borderRadius: 10,
//   padding: 15,
//   marginBottom: 12,
//   elevation: 2,
// },

// articleTitle: {
//   fontSize: 16,
//   fontWeight: 'bold',
//   marginBottom: 5,
// },

// articleContent: {
//   fontSize: 14,
//   color: '#666',
// },


  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
  modalCard: {
    backgroundColor: '#fff', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, elevation: 40,
  },
  modalItem: { paddingVertical: 12, borderBottomColor: '#eee', borderBottomWidth: 1 },
  modalText: { fontSize: 16, color: '#555' },
  modalHeader: { width: 40, height: 5, backgroundColor: '#ccc', borderRadius: 3, alignSelf: 'center', marginBottom: 10 },
});

export default ProfileScreen;
