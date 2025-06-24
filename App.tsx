import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import Login1 from './components/Login1';
import Login from './components/Login';
import Registration from "./components/Registration";
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import CretePost from './components/CreatePost';
import SuggestionDetail from './components/SuggestionDetail';
import DocumentDetails from './components/Documentdetails';
import PaymentScreen from './screens/PaymentScreen';
import PostProfileEdit from './components/PostProfileEdit'
import ProductPurchaseDetail from './components/ProductPurchaseDetail'
import PurchaseForm from './screens/PurchaseForm';
import PurchaseDetails from './screens/PurchaseDetails';
import ExploreScreen from './screens/ExploreScreen';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login1" component={Login1} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="CreatePost" component={CretePost} options={{ headerShown: false }} />
        <Stack.Screen name="SuggestionDetail" component={SuggestionDetail}  options={{headerShown:false}}/>
        <Stack.Screen name="DocumentDetails" component={DocumentDetails} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{headerShown:false}} />
        <Stack.Screen name="PostProfileEdit" component={PostProfileEdit} options={{headerShown:false}} />
        <Stack.Screen name="ProductPurchaseDetail" component={ProductPurchaseDetail} options={{headerShown:false}} />
        <Stack.Screen name="PurchaseForm" component={PurchaseForm} options={{headerShown:false}}/>
        <Stack.Screen name="PurchaseDetails" component={PurchaseDetails} options={{headerShown:false}}/>
        <Stack.Screen name="ExploreScreen"  component={ExploreScreen} options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
