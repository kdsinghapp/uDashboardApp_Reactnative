import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import Loading from '../../../utils/Loader';
import StatusBarCompoent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import CustomButton from '../../../compoent/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
import CustomInput from '../../../compoent/CustomInput';
import Icon from '../../../compoent/Icon';
import { color } from '../../../constant';
import useSignup from './useSignup';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {


  const {
    email,
    password,
    confirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSignup,
    navigation,
    checked,
    setChecked,
    type,
    fname,
    lName,
    fnameError,
    lNameError,
    handlefNameChange,
    handleLNameChange,
    phone,
    phoneError,
    handlePhoneChange
  } = useSignup();
  return (
    <SafeAreaView
      style={styles.bgContainer}
    >
      {loading && <Loading />}

      <StatusBarCompoent />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 15 }}>
              {/* <CustomBackHeader menuIcon={imageIndex.back} label={""} /> */}
            </View>
            <View style={styles.mainContainer}>
              <Image source={imageIndex.logo} style={styles.logo} resizeMode='contain' />
              <Text allowFontScaling={false} style={styles.txtHeading}>Start Your 14-Day Free {`\n`}Trial Today</Text>
              <Text allowFontScaling={false} style={styles.txtDes}>NO CREDIT CARD REQUIRED!</Text>
              <View style={styles.inputContainer}>

                <CustomInput
                  placeholder={"First Name"}
                  leftIcon={<Icon source={imageIndex.user} size={20} />}
                value={fname}
                // keyboardType='email-address'

                onChangeText={handlefNameChange}
                />
                {fnameError ? <Text style={styles.errorText}>{fnameError}</Text> : null}
  <CustomInput
                  placeholder={"Last Name"}
                  leftIcon={<Icon source={imageIndex.user} size={20} />}
                value={lName}
                // keyboardType='email-address'

                onChangeText={handleLNameChange}
                />
                {lNameError ? <Text style={styles.errorText}>{lNameError}</Text> : null}

                <CustomInput
                  placeholder={"Email Address"}
                  leftIcon={<Icon source={imageIndex.email} size={18} />}
                   value={email}
                keyboardType='email-address'

                onChangeText={handleEmailChange}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                {/* <CustomInput
                  placeholder={"Phone Number"}
                  leftIcon={<Icon source={imageIndex.phone} size={18} />}
                  value={phone}
                  onChangeText={handlePhoneChange}
                  keyboardType='phone-pad'
                />
                {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null} */}

                <CustomInput

                  placeholder={"Password"}
                  secureTextEntryToggle
                  leftIcon={<Icon source={imageIndex.lock} size={20} />}
                  value={password}
                  onChangeText={handlePasswordChange}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                {/* <Text style={{
                  color: "#909090",
                  fontSize: 14,
                  marginTop: 15
                }} allowFontScaling={false}>Password Strength</Text> */}
              </View>


              <CustomButton
                title={"Sign Up"}
                onPress={handleSignup}
                // onPress={() => navigation.navigate(ScreenNameEnum.LoginScreen)}
              />

              <View style={{ width: '100%', marginTop: 20, marginBottom: 20, flexDirection: 'row', }}>
                <Image source={imageIndex.Check1} style={{ height: 22, width: 22, }} />
                <Text allowFontScaling={false} style={[styles.signupText, { textAlignVertical: 'center', lineHeight: 30 }]}>
                  {" "} By Creating an Account, you agree to our  <Text style={{ color: color.primary }}>Terms of Service</Text> and
                  <Text allowFontScaling={false} style={{ color: color.primary }}> Privacy Policy </Text> </Text>
              </View>
              <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} onPress={() => navigation.navigate(ScreenNameEnum.LoginScreen)}>
                <Text allowFontScaling={false} style={styles.signupText}>Alrady have an account? <Text style={{ color: color.primary }}> Login</Text> </Text>
              </TouchableOpacity>

            </View>

          </ScrollView>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
