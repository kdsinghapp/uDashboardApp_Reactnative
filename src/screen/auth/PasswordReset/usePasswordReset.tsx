import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restEmailOtpScreen } from '../../../Api/apiRequest';
import localizationStrings from '../../../localization/LocalizationString';
import ScreenNameEnum from '../../../routes/screenName.enum';

export const usePasswordReset = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleIdentityText = (value: string) => {
    setEmail(value.trim());

    if (value.trim() === '') {
      setEmailError(localizationStrings.emailRequired);
      return;
    }

    if (!emailRegex.test(value.trim())) {
      setEmailError(localizationStrings.emailError);
    } else {
      setEmailError('');
    }
  };

  const passFunction = async () => {
    try {
     const trimmedPhone = phone.trim();

    
      const isPhoneValid = /^[0-9]{10,15}$/.test(trimmedPhone.replace(/[^0-9]/g, ''));

     

      
   

      // const params = {
      //   [type]: contactValue,
      //   type,
      //   navigation,
      // };

      // console.log(params);
      // await restEmailOtpScreen(params, setLoading);
       navigation.navigate(ScreenNameEnum.OtpScreen)
    } catch (error) {
      console.error('OTP error:', error);
    }
  };

  return {
    email,
    setEmail,
    phone,
    setPhone,
    emailError,
    loading,
    handleIdentityText,
    passFunction,
    navigation
  };
};
