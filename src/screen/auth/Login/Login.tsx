import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Loading from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import CustomButton from '../../../compoent/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
import CustomInput from '../../../compoent/CustomInput';
import Icon from '../../../compoent/Icon';
import useLogin from './useLogin';
import { styles } from './style';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../../constant';
import { DrawerActions } from '@react-navigation/native';

export default function Login() {
  const {
    email,
    password,
    emailError,
    passwordError,
    loading,
    handleEmailChange,
    handlePasswordChange,
    navigation,
    handleLogin
  } = useLogin();
  

  const [checked, setChecked] = useState(false);

  return (
    <SafeAreaView edges={['top']}
      style={styles.bgContainer}
    >
      <StatusBarComponent />
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && <Loading />}
        <View style={styles.mainContainer}>
          <Image source={imageIndex.logo} style={styles.logo} resizeMode='contain' />
          <Text allowFontScaling={false} style={styles.txtHeading}>Account Log In</Text>
          <Text allowFontScaling={false} style={styles.txtDes}>PLEASE LOGIN TO CONTINUE TO YOUR ACCOUNT</Text>
          <View style={styles.inputContainer}>
            <CustomInput
              placeholder={"Email Address"}
              leftIcon={<Icon source={imageIndex.email} size={20} />}
              value={email}
              onChangeText={handleEmailChange}
              keyboardType='email-address'
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <CustomInput
              placeholder={'Password'}
              secureTextEntryToggle
              leftIcon={<Icon source={imageIndex.lock} size={20} />}
              value={password}
              onChangeText={handlePasswordChange}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
              marginBottom: 10
            }}>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
                <TouchableOpacity
                  onPress={() => setChecked(!checked)}
                >
                  <Image

                    style={[{
                      height: 23,
                      width: 23,
                      resizeMode: "contain"

                    }, checked == false &&{tintColor:color.primary}]}
                    source={checked ? imageIndex.Check1 : imageIndex.Uncheck} // ✅ toggle between check/uncheck
                  />
                </TouchableOpacity>
                <Text style={{
                  marginLeft: 10,
                  fontSize: 15,
                  color: "#909090"
                }}

                  allowFontScaling={false}
                > Remember me</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate(ScreenNameEnum.PasswordReset)}
                style={styles.forgotContainer}>
                <Text allowFontScaling={false} style={styles.forgotText}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <CustomButton
            title={"Login"}
            style={{
              marginTop: 15
            }}
            // onPress={() => navigation.navigate(ScreenNameEnum.DashboardScreen)}
            onPress={handleLogin}
          // onPress={handleLogin}
          />
          <View style={styles.signupContainer}>
            <Text allowFontScaling={false} style={styles.signUpPrompt}></Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ScreenNameEnum.SignUpScreen)}
            >
              <Text allowFontScaling={false} style={styles.signupText}>Dont have an account?<Text style={{ color: color.primary }}> Sign Up</Text> </Text>
            </TouchableOpacity>
          </View>



        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

