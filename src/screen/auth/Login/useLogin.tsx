import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegistrationStackParamList } from '../../../navigators/RegistrationRoutes';
import { validateEmail, validatePassword } from '../../../utils/validation';
import { LoginCustomer } from '../../../Api/apiRequest';
import localizationStrings from '../../../localization/LocalizationString';
// import messaging, { getToken } from '@react-native-firebase/messaging';

type UserType = 'User' | 'Driver';

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<UserType>('User');
const [token, setToken] = useState('')
  const navigation = useNavigation<NativeStackNavigationProp<RegistrationStackParamList>>();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {

      const userType = await AsyncStorage.getItem('userType');
      setType(userType === 'Driver' ? 'Driver' : 'User');
      // await getFcmToken()
    })();
  }, []);
//  const getFcmToken = async () => {
//     const token = await messaging().getToken();
//     setToken(token)
//     console.log('FCM Token:', token);
//     // 🔥 Send this token to your backend or Firestore if needed
//   };
 
  const handleEmailChange = (value: string) => {
  setEmail(value.trim());
  const error = validateEmail(value);
  setEmailError(error);
};

const handlePasswordChange = (value: string) => {
  setPassword(value);
  const error = validatePassword(value);
  setPasswordError(error);
};

const handleLogin = async () => {
    // const role = await AsyncStorage.getItem('userType');
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === '') return setEmailError(localizationStrings.emailRequired);
    if (validateEmail(trimmedEmail)) return setEmailError(localizationStrings.inValidEmail);
    if (trimmedPassword === '') return setPasswordError(localizationStrings.passRequire);
    if (trimmedPassword.length < 6) return setPasswordError(localizationStrings.inValidPass);
    try {
      const params = {
        email,
        password,
        // roleType: role,
        navigation,
        token,
      };
      await LoginCustomer(params, setLoading, dispatch);
    } catch (error) {
      // console.error("Login error:", error);
    }
  };
  return {
    email,
    password,
    emailError,
    passwordError,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    navigation,
    type
  };
}
