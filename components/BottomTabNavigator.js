import React, { useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import PostScreen from '../screens/PostScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const TabIcon = ({ name, focused }) => {
  const scale = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.3 : 1,
      useNativeDriver: true,
      friction: 4,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <MaterialIcons
        name={name}
        size={focused ? 28 : 24}
        color={focused ? '#007bff' : '#ccc'}
      />
    </Animated.View>
  );
};

const BottomTabNavigator = () => {
  const tabOffset = useRef(new Animated.Value(0)).current;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Post') {
            return (
              <View style={styles.postButtonOuter}>
                <View style={styles.triColorBorder}>
                  <View style={styles.postButtonCircle}>
                    <MaterialIcons name="add" size={30} color="#fff" />
                  </View>
                </View>
              </View>
            );
          }

          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Explore') iconName = 'explore';
          else if (route.name === 'Chat') iconName = 'production-quantity-limits';
          else if (route.name === 'Profile') iconName = 'person';

          return <TabIcon name={iconName} focused={focused} />;
        },
        tabBarButton: (props) => {
          if (props.accessibilityLabel?.includes('Post')) {
            return (
              <TouchableOpacity
                {...props}
                style={styles.postTouchable}
                onPress={props.onPress}
              >
                {props.children}
              </TouchableOpacity>
            );
          }
          return <TouchableOpacity {...props} onPress={props.onPress}>{props.children}</TouchableOpacity>;
        },
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          {
            transform: [{ translateY: tabOffset }],
          },
        ],
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home">
        {() => <HomeScreen tabOffset={tabOffset} />}
      </Tab.Screen>
      <Tab.Screen name="Explore">
        {() => <ExploreScreen tabOffset={tabOffset} />}
      </Tab.Screen>
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Chat">
        {() => <ChatScreen tabOffset={tabOffset} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => <ProfileScreen tabOffset={tabOffset} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    // bottom: 10,
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
    paddingBottom: Platform.OS === 'android' ? 10 : 20,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonOuter: {
    position: 'absolute',
    top: -30,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  triColorBorder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    // borderTopColor: 'blue',
    // borderLeftColor: 'red',
    // borderRightColor: 'yellow',
    // borderBottomColor: 'white',
    borderColor:'#fff',
  },
  postButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  postTouchable: {
    top: -30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabNavigator;
