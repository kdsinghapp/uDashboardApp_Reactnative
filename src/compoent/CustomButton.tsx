import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { color, fonts } from '../constant';

type AlignType = 'left' | 'center' | 'right';

interface CustomButtonProps {
  title: string;
  txtcolor?: string;
  bgColor?: string;
  leftIcon?: React.ReactNode;
  alignItm?: AlignType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  height?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  txtcolor = '#fff',
  bgColor = color.primary,
  leftIcon,
  alignItm = 'center',
  style,
  textStyle,
  height = 60,
  onPress,
}) => {
  const alignment: Record<AlignType, 'flex-start' | 'center' | 'flex-end'> = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  };

  const buttonStyle: StyleProp<ViewStyle> = {
    backgroundColor: bgColor,
    height: height,
    borderRadius:15 ,
    justifyContent:"center"
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle, style]}
    >
      <View style={[styles.content, { justifyContent: alignment[alignItm] }]}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <Text style={[styles.text, { color: txtcolor }, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    width: '100%',
    justifyContent:"center" ,
    alignItems:"center"

  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontFamily:fonts.semiBold
  },
});

export default CustomButton;
