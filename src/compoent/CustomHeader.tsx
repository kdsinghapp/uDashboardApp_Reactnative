import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import imageIndex from '../assets/imageIndex';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { color } from '../constant';
import ScreenNameEnum from '../routes/screenName.enum';

interface RightIcon {
  icon: any;           // Icon image source
  onPress: () => void; // Press handler for the icon
  type?:string;
}

interface Props {
  navigation?: any;
  rightIcons?: RightIcon[];
  menuIcon?: any;
  label?: any;
  leftPress? :any
}

const CustomHeader: React.FC<Props> = ({ rightIcons = [], menuIcon, label , leftPress }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.header}>
      {/* Left Menu Icon */}
      <TouchableOpacity        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Image source={imageIndex.Menu} style={styles.icon} resizeMode="contain" />
      </TouchableOpacity>
 <View style={{
  flexDirection:"row" ,
  justifyContent:"flex-end" ,
  alignItems:"center",
    }}>
      <TouchableOpacity onPress={() =>{navigation.goBack()}}>
        <Image source={imageIndex.search} style={[styles.icon,{
          right:25,
        }]} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity
       onPress={() =>{navigation.navigate(ScreenNameEnum.Notification)}}
      
     >
        <Image source={imageIndex.notification} style={[styles.icon,{
          right:12,
        }]} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>{navigation.navigate(ScreenNameEnum.EditProfile)}}>
        <Image source={imageIndex.Avatar}  style={[styles.icon,{
          right:1,
        }]} resizeMode="contain" />
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    // paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    height: 25,
    width: 25,
  },
  iconR: {
    height: 25,
    width: 25,
    marginLeft: 12,
  },
   iconR1: {
    height: 35,
    width: 35,
    marginLeft: 8,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth:65
  },
  txtHeading: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 36,
    color: '#000000',
    marginTop: 7,
  },
});
