import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, ImageBackground } from 'react-native';
import React from 'react';
import Loading from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomButton from '../../../compoent/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import localizationStrings from '../../../localization/LocalizationString';
import { styles } from './style';
import { usePasswordReset } from './usePasswordReset';
import CustomBackHeader from '../../../compoent/CustomBackHeader';
import { hp } from '../../../utils/Constant';
import CustomInput from '../../../compoent/CustomInput';
import Icon from '../../../compoent/Icon';

export default function PasswordReset() {
   const {
    email,
    phone,
    emailError,
    loading,
    handleIdentityText,
    setPhone,
    passFunction,
    navigation
  } = usePasswordReset();
  return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <StatusBarComponent />
          {loading && <Loading />}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
              <CustomBackHeader menuIcon={imageIndex.back} label={""} /> 
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <Text  allowFontScaling={false} style={styles.titleText}>Password Reset</Text>
                <Text allowFontScaling={false}  style={styles.descriptionText}>Please put your email address to get reset password link</Text>
              </View>
            </View>
             <View style={{
              marginTop:20
             }}> 
            <CustomInput
              placeholder={"Email Address"}
              leftIcon={<Icon source={imageIndex.email} size={20} />}
              value={email}
              onChangeText={handleIdentityText}
              keyboardType='email-address'

            />
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      
            </View>
  <Image source={imageIndex.smsImg} style={{width:'80%', height:hp(28), alignSelf:'center', marginTop:30}}/>

          </ScrollView>

          <CustomButton title={"Send"} onPress={passFunction} style={{marginBottom:20}} />
        
      </SafeAreaView>
  );
}
