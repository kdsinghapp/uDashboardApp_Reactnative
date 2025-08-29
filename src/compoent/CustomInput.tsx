import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';
import Icon from './Icon';
import imageIndex from '../assets/imageIndex';
import { color, fonts } from '../constant';

interface CustomInputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureTextEntryToggle?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  type?: string;
  onpress?: any;
  date?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  leftIcon,
  secureTextEntryToggle = false,
  containerStyle,
  type = 'input',
  onpress,
  date,
  rightIcon,
  ...rest
}) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntryToggle);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Left Icon */}
      {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

      {/* Input / Date Text */}
      {type === 'date' ? (
        <TouchableOpacity onPress={onpress} style={styles.flex}>
          <Text style={styles.input}>{date}</Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          style={styles.input}
          placeholderTextColor="#ADA4A5"
          secureTextEntry={hidePassword}
          {...rest}
        />
      )}

      {/* Toggle password visibility */}
      {secureTextEntryToggle && (
        <TouchableOpacity
          style={styles.iconRight}
          onPress={() => setHidePassword(!hidePassword)}>
          <Icon
            source={hidePassword ? imageIndex.eyeoff : imageIndex.eye}
            size={20}
          />
        </TouchableOpacity>
      )}

      {/* Right Icon */}
      {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#F7F8F8',
    paddingHorizontal: 15,
    height: 56,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#F7F8F8',
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRight: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 14,
    fontFamily: fonts.medium,
   },
});

export default CustomInput;
