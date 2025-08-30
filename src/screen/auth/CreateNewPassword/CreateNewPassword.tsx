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
import { useCreateNewPassword } from './useCreateNewPassword';
import CustomBackHeader from '../../../compoent/CustomBackHeader';
import { color } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';

export default function CreatePassword() {
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
            <Text allowFontScaling={false} style={styles.title}>Create New Password</Text>
            <Text allowFontScaling={false} style={styles.description}>Your new password must be different from previous used passwords.</Text>
          </View>

          <View style={styles.formContainer}>
                    
            <CustomInput
              placeholder={"Enter Password "}
              leftIcon={<Icon source={imageIndex.lock} size={20} colorIcon={color.primary} />}
              value={password}
              onChangeText={handlePassText}
              secureTextEntryToggle
            />
            {/* {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null} */}
           
            <CustomInput
              placeholder={"Confirm Password"}
              leftIcon={<Icon source={imageIndex.lock} size={20}  colorIcon={color.primary} />}
              value={confirmPassword}
              onChangeText={handleCPassText}
              secureTextEntryToggle
            />
            {/* {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null} */}
          </View>
            {/* <Text style={[styles.description, {marginTop:15}]}>Alphanumeric and 8 characters in length</Text> */}

        </ScrollView>

        <CustomButton title={"Submit"} 
        // onPress={handleSetPassword} 
        onPress={()=>navigation.navigate(ScreenNameEnum.LoginScreen)}
        />
      </SafeAreaView>
  );
}
