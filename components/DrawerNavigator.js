// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Notifications from '../components/Notifications';
import Privacy from '../components/Privacy';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Privacy" component={Privacy} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
