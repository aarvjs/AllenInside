import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';




const { width, height } = Dimensions.get('window');

 function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  





  const stars = Array.from({ length: 20 }, () => ({
    left: Math.random() * width,
    size: Math.random() * 2 + 3,
    top: new Animated.Value(Math.random() * height),
    duration: Math.random() * 5000 + 5000,
  }));

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  const goToRegister = () => {
    navigation.navigate('Registration');
  };

  useEffect(() => {
    stars.forEach(star => {
      const animate = () => {
        star.top.setValue(height);
        Animated.timing(star.top, {
          toValue: 0,
          duration: star.duration,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => animate());
      };
      animate();
    });
  }, []);
 
//   const handleLogin = () => {
//   console.log("Login button pressed");

//   auth()
//     .signInWithEmailAndPassword(email, password)
//     .then(userCred => {
//       console.log("Firebase login successful");
//       Alert.alert("Login Successful", "Welcome!");
//       setTimeout(() => navigation.navigate('Home'), 1500);  // 1.5 second ke baad Home page pe le jayega
//     })
//     .catch(err => {
//       console.log("Login error:", err.message);
//       Alert.alert("Login failed", err.message);
//     });
// };

  return (
    <View style={styles.container}>

       <View style={styles.lightCircle} />
      {/* Top Section */}
      <View style={styles.topContainer}>
        <Image
          source={require('../assets/login.jpg')}
          style={styles.image}
          resizeMode="contain"
        />
        
      </View>
      

      {/* Wave SVG */}
      <Svg
        height="80"
        width={width}
        viewBox="0 0 1440 320"
        style={styles.wave}
      >
        <Path
          fill="#ffffff"
          d="M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,138.7C672,107,768,85,864,96C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </Svg>

      {/* Bottom Section */}
      <LinearGradient
        colors={['#4a3aff', '#6a4aff']}
        style={styles.bottomContainer}
      >
        {/* Flowing Stars */}
        {stars.map((star, index) => (
          <Animated.View
            key={index}
            style={[
              styles.star,
              {
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
              },
            ]}
          />
        ))}

        {/* Left bottom glowing circle */}
        <View style={styles.glowCircle} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Text style={styles.title}>Welcome Back</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={24} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#ddd"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#ddd"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.forgotContainer} onPress={() => alert("Reset Password")}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToRegister} style={styles.registerContainer}>
            <Text style={styles.registerText}>Create an Account</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={styles.bottomCircle} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },

   lightCircle: {
    position: "absolute",
    left: -10,
    top: -10,
    width: 100,
    height: 100,
    backgroundColor: "#6c57ff",
    borderRadius: 50,
    zIndex: 1,
  },
  image: {
    width: 330,
    height: 270,
  },
  wave: {
    marginTop: -10,
  },
  bottomContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 30,
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6c57ff',
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#eee',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    elevation: 5,
  },
  loginButtonText: {
    color: '#4a3aff',
    fontWeight: '700',
    fontSize: 16,
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#ffffff66',
    borderRadius: 50,
  },
  glowCircle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 70,
    height: 70,
    backgroundColor: '#ffffff20',
    borderRadius: 50,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    zIndex: -1,
  },
   bottomCircle:{
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 230,
    height: 230,
    backgroundColor: '#87CEFA',
    borderRadius: 150,
    opacity: 0.3,
    zIndex: 1,
  },
});


export default Login;