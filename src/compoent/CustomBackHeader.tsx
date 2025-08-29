import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import imageIndex from '../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import { color, fonts } from '../constant';

interface RightIcon {
  icon: any;           // Icon image source
  onPress: () => void; // Press handler for the icon
  type?: string;
}

interface Props {
  navigation?: any;
  rightIcons?: RightIcon[];
  menuIcon?: any;
  label?: any;
  leftPress?: any
}

const CustomBackHeader: React.FC<Props> = ({ rightIcons = [], menuIcon, label, leftPress }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.header}>
      {/* Left Menu Icon */}
      <TouchableOpacity onPress={() => { navigation.goBack() }}>
        <Image source={menuIcon} style={styles.icon} resizeMode="cover" />
      </TouchableOpacity>
      <Text style={styles.txtHeading}>{label ? label : ""}</Text>
      {/* Right Icons */}
      <View style={styles.rightIconsContainer}>
        {rightIcons.map((item, index) => (
          <>
            {item?.type == "text" ?
              <TouchableOpacity style={{ backgroundColor: color.primary, height: 33, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center', flexDirection: 'row' }} key={index.toString()} onPress={item.onPress}>
                <Image source={imageIndex.calendar} tintColor={"#fff"} style={styles.iconR1} resizeMode="cover" />

                <Text style={{ color: "#fff", fontWeight: 'bold' }}>{item.icon}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity key={index.toString()} onPress={item.onPress}>
                <Image source={item.icon} style={styles.iconR} resizeMode="cover" />
              </TouchableOpacity>
            }
          </>
        ))}
      </View>
    </View>
  );
};

export default CustomBackHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    // paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 30,
    width: 30,
    // marginLeft: 8,
  },
  iconR: {
    height: 35,
    width: 35,
    marginLeft: 8,
  },
  iconR1: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 50
  },
  txtHeading: {
    fontSize: 17,
    lineHeight: 36,
    color: '#181C2E',
    // marginTop: 7,
    marginLeft: 15,
     textAlignVertical: 'center',
    // backgroundColor:'red',
    flex: 1,
    textAlign: 'center'
  },
});
