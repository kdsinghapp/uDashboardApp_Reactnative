// DrawerNavigation.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screen/BottomTab/Dashboard/DashboardScreen';
  import { DrawerContentComponentProps } from '@react-navigation/drawer';
import CustomDrawerContent from '../compoent/CustomDrawerContent';
import EditProfile from '../screen/Profile/EditProfile';
import ScreenNameEnum from '../routes/screenName.enum';
import CallbackDetailScreen from '../screen/CallbackDetail/CallbackDetailScreen';
import ActiveScreen from '../screen/Active/ActiveScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name= {ScreenNameEnum.EditProfile} component={EditProfile} />
      <Drawer.Screen name= {ScreenNameEnum.CallbackDetailScreen} component={CallbackDetailScreen} />
      <Drawer.Screen name= {ScreenNameEnum.ActiveScreen} component={ActiveScreen} />
    </Drawer.Navigator>
  );
}
