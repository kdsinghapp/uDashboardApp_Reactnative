import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationRoutes from './RegistrationRoutes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/store';
import Toast from 'react-native-toast-message';
import toastConfig from '../utils/customToast';
import NetInfo from '@react-native-community/netinfo';
import NetworkStatusModal from '../compoent/NetworkStatusModal';
import { LanguageProvider } from '../localization/LanguageContext';
// import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
 const AppNavigator: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  // const token =  messaging().getToken();
  // console.log(token)
  // useEffect(() => {
  //   checkNetInfo();
  //   requestUserPermission();
  //   // listenForForegroundNotification();
  // }, []);

 

  // const listenForForegroundNotification = () => {
  //   messaging().onMessage(async remoteMessage => {
  //     Alert.alert('📨 New Notification', JSON.stringify(remoteMessage.notification?.title));
  //   });
  // };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <NetworkStatusModal
              modalVisible={modalVisible}
              offlineText="No Internet! Please check your connection."
            />
             <LanguageProvider>
              <RegistrationRoutes />
            </LanguageProvider>
            <Toast config={toastConfig} />
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default AppNavigator;
