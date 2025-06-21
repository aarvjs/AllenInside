import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { supabase } from "../supabaseClient";
import { Alert } from "react-native";


function Registration({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  // Registatioin hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee 

const handleRegister = async () => {
  // ✅ Basic Field Validation
  if (!name.trim() || !username.trim() || !email.trim() || !password || !confirmPassword) {
    Alert.alert('Missing Info', 'Please fill all fields');
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Mismatch', 'Passwords do not match');
    return;
  }

  //  Loading alert to show wait
  Alert.alert('Please Wait', 'Creating your account...', [{ text: 'OK' }]);

  try {
    // Step 1: Sign Up
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      Alert.alert('Signup Error', signUpError.message);
      return;
    }

    // Step 2: Sign In Immediately to get session
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      Alert.alert("Login Failed", signInError.message);
      return;
    }

    // Step 3: Get Session
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user?.id) {
      Alert.alert("Error", "User session not found. Please try logging in.");
      return;
    }

    const userId = userData.user.id;

    // Step 4: Insert into 'users' table
    const { error: insertError } = await supabase
      .from("users")
      .insert([
        {
          id: userId,
          name: name.trim(),
          username: username.trim(),
        },
      ]);

    if (insertError) {
      Alert.alert("Insert Error", insertError.message);
    } else {
      Alert.alert("Success", "Registration successful!");
      navigation.navigate('Home');

    }
  } catch (err) {
    Alert.alert("Unexpected Error", err.message);
  }
};

  // Registatioin  emd hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee 



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.topSection}>
        <View style={styles.topBackground}>
          <View style={styles.lightCircle} />
          <Image
            source={require("../assets/regis.jpg")}
            style={styles.topImage}
          />
        </View>
        <Image
          source={require("../assets/upwave.png")}
          style={styles.waveImage}
          resizeMode="stretch"
        />
      </View>

      <ScrollView contentContainerStyle={styles.bottomSection} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#eee"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="person-outline" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#eee"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#eee"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#eee"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock-outline" size={24} color="#fff" style={styles.inputIcon} />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#eee"
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        

        <TouchableOpacity style={styles.registerButton}  onPress={handleRegister} >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity> 
       <View style={{ width: "100%", alignItems: "center" }}>
  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
    <Text style={styles.loginText}>
      Already have an account? <Text style={{ fontWeight: "bold", color: "#fff" }}>Login</Text>
    </Text>
  </TouchableOpacity>

        <View style={styles.bottomCircle} />
  
</View>

         
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    backgroundColor: "#fff",
  },
  topBackground: {
    height: 200,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  lightCircle: {
    position: "absolute",
    left: -10,
    top: -10,
    width: 100,
    height: 100,
    backgroundColor: "#6a11cb",
    borderRadius: 50,
    zIndex: 1,
  },
    bottomCircle:{
    position: 'absolute',
    bottom: -200,
    left: 220,
    width: 230,
    height: 230,
    backgroundColor: '#87CEFA',
    borderRadius: 150,
    opacity: 0.3,
    zIndex: 1,
  },
  topImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    zIndex: 2,
    marginTop:100,
  },
  waveImage: {
    width: "100%",
    height: 80,
  },
  bottomSection: {
    padding: 20,
    backgroundColor: "#6a11cb",
    flexGrow: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#fff",
  },
  registerButton: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#6a11cb",
    fontSize: 18,
    fontWeight: "700",
  },
  
  loginText: {
    alignItems:"center",
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
  },
});

export default Registration;