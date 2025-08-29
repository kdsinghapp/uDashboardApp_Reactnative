import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Loading from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import CustomButton from '../../../compoent/CustomButton';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import { otp_Verify } from '../../../Api/apiRequest';
import { SafeAreaView } from 'react-native-safe-area-context';
import localizationStrings from '../../../localization/LocalizationString';
import { styles } from './style';
import { useOtpVerification } from './useOTPVerivication';
import CustomBackHeader from '../../../compoent/CustomBackHeader';
import { hp } from '../../../utils/Constant';
import ScreenNameEnum from '../../../routes/screenName.enum';

export default function OtpScreen() {
  const {
    value,
    isLoading,
    errorMessage,
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyOTP,
    navigation,
    type
  } = useOtpVerification()
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}

    >
      <View style={styles.container}>
        {isLoading && <Loading />}
        <StatusBarComponent />
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomBackHeader menuIcon={imageIndex.back} label={""} />

          <View style={styles.headerSection}>
            <Text style={styles.txtHeading}>Check your mail or check your cell phone</Text>
            <Text style={styles.txtDes}>Please put the 4 digits sent to you
            </Text>
          </View>

          <View style={styles.otpFieldContainer}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={handleChangeText}
              cellCount={4}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View key={index} style={styles.cellWrapper}>
                  <Text
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            {/* {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null} */}
          </View>
          <Image source={imageIndex.otp} style={{ width: '80%', height: hp(30), alignSelf: 'center', marginBottom: 30 }} />

        </ScrollView>

        <CustomButton
          title={"Submit"}
          onPress={() => {
            // if(type == "signup"){
            // navigation.navigate(ScreenNameEnum.LoginScreen)

            // }else{
            navigation.navigate(ScreenNameEnum.CreatePassword)


            // }
          }
          }
          // onPress={handleVerifyOTP}
          style={styles.submitButton}
        />

      </View>
    </SafeAreaView>
  );
}