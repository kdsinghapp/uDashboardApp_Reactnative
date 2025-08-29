import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loading from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomButton from '../../../compoent/CustomButton';
import CustomInput from '../../../compoent/CustomInput';
import Icon from '../../../compoent/Icon';
import localizationStrings from '../../../localization/LocalizationString';
import { updatePassword } from '../../../Api/apiRequest';
import { styles } from './style';
import { validateConfirmPassword, validatePassword } from '../../../utils/validation';
import { useCreateNewPassword } from './useLocationAllow';
import CustomBackHeader from '../../../compoent/CustomBackHeader';
import { color } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { hp } from '../../../utils/Constant';

export default function LocationAllow() {
  const {
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    isLoading,
    handlePassText,
    handleCPassText,
    handleSetPassword,
    navigation
  } = useCreateNewPassword()

  return (
   
      <SafeAreaView style={styles.container}>
        <StatusBarComponent />
        {isLoading && <Loading />}
        <CustomBackHeader menuIcon={imageIndex.back} label={""} /> 

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>What is Your Location?</Text>
            <Text style={styles.description}>Weyourbocation to slow evalu restaurant & products</Text>
          </View>
  <Image source={imageIndex.locationImg} style={{width:'80%', height:hp(55), alignSelf:'center', marginBottom:30, resizeMode:'contain'}}/>

        
        </ScrollView>

        <CustomButton title={"Allow Location Access"} 
        // onPress={handleSetPassword} 
        // onPress={()=>navigation.navigate(ScreenNameEnum.LoginScreen)}
        />
            <Text style={[styles.title, {fontSize:20, marginTop:10}]}>Inter Location Manually</Text>

      </SafeAreaView>
  );
}
