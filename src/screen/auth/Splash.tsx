import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar, SafeAreaView, ImageBackground } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useSelector } from 'react-redux';
import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
 import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from '../../constant';
import { wp } from '../../utils/Constant';

// Define the navigation type
type RootStackParamList = {
  Home: undefined; // Change 'Home' to your actual destination screen name
};

const Splash: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // console.log("isLogOut",isLogOut)
  const isLogin = useSelector((state: any) => state.auth);
  const isFocus = useIsFocused();
  const checkLogout = async () => {
    // if (isLogin?.isLogin) {
    //   const userType = await AsyncStorage.getItem('userType');
    //   if (userType == "User") {
    //     navigation.replace('DrawerNav');
    //   } else {
    //     navigation.replace('DrawerNavDriver');

    //   }
    // } else {
      navigation.replace(ScreenNameEnum.LoginScreen);
    // }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkLogout();
    }, 2500);

    return () => clearTimeout(timer);
  }, [isFocus, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent barStyle={'light-content'} />
      <SafeAreaView>
       
        <Image source={imageIndex.logo} style={styles.logo} resizeMode="contain" />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 250,
    width: 250,
  },
});

export default Splash;
