import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';


const Login1 = ({ navigation }) => {


  //   useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: 'AIzaSyCGG4M2JnPuzlio8Kpp7qEBSDRv6wECGpc',
  //   });
  // }, []);

  //   const handleGoogleSignIn = async () => {
  //   try {
  //     const { idToken } = await GoogleSignin.signIn();
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //     const userCred = await auth().signInWithCredential(googleCredential);
  //     console.log('✅ Google Sign-In successful');

  //     const providers = await auth().fetchSignInMethodsForEmail(userCred.user.email);

  //     if (!providers.includes('password')) {
        
  //       const emailCred = auth.EmailAuthProvider.credential(userCred.user.email, password);
  //       await userCred.user.linkWithCredential(emailCred);
  //       console.log('🔗 Linked Google account with email/password');
  //       Alert.alert('Success', 'Google account linked with password');
  //     }

  //     navigation.navigate('Home');
  //   } catch (error) {
  //     console.log('❌ Google Login Error:', error.message);
  //     Alert.alert('Error', error.message);
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.content}>
        <Image source={require('../assets/conn.jpg')} style={styles.image} />
      <Text style={styles.heading}>Allen Inside</Text>
<Text style={styles.subText}>
  Stay updated and share everything from student projects to canteen updates and college events. Connect, explore, and grow together!
</Text>


        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.continueText}>Sign up using</Text>
        <View style={styles.socialIcons}>
      <TouchableOpacity onPress={() => console.log('Facebook Clicked')}>
        <Image source={require('../assets/facebook.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity >
        <Image source={require('../assets/google.png')} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('LinkedIn Clicked')}>
        <Image source={require('../assets/linkedin.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
      </View>

      {/* Bottom Wave with Top Curve */}
      <View style={styles.waveContainer}>
  <Svg height="160" width={Dimensions.get('window').width}>
    <Path
      d="M0,120 C120,0 380,200 500,80 L500,160 L0,160 Z"
      fill="#4a3aff"
    />
  </Svg>
</View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  image: {
    width: 330,
    height: 340,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4a3aff',
    marginTop: 10,
  },
  subText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: '#4a3aff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 80,
    marginTop: 30,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupButton: {
    borderColor: '#4a3aff',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 78,
    marginTop: 15,
  },
  signupText: {
    color: '#4a3aff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueText: {
    color: '#999',
    marginTop: 25,
    fontSize: 14,
    
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 20,
  },
  
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 8,
  },
  waveContainer: {
    position: 'relative',
    bottom: 0,
    alignItems: 'center',
  },
//   waveText: {
//     position: 'absolute',
//     top: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//     zIndex: 1,
//   },
});

export default Login1;
