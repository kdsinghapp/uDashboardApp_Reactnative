import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import localizationStrings from '../localization/LocalizationString';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import imageIndex from '../assets/imageIndex';
import Icon from './Icon';
import CustomButton from './CustomButton';



export const DestinationCard = ({ item, navigation }: any) => {
  // const navigation = useNavigation()
  return (


    // <TouchableOpacity onPress={() => navigation?.navigate(ScreenNameEnum.TripDetail)} style={styles.card}>
    //   {/* <View style={styles.dottedLine} /> */}
    //   <View style={styles.leftContainer}>
    //     <View style={styles.circle} />
    //     {/* {!isLast && ( */}
    //     <View style={styles.dottedLineContainer}>
    //       {Array.from({ length: 4 }).map((_, index) => (
    //         <View key={index} style={styles.dot} />
    //       ))}
    //     </View>
    //     <View style={styles.circle} />

    //     {/* )} */}
    //   </View>
    //   <View style={styles.content}>
    //     <Text style={styles.title}>{localizationStrings?.TripTitle1}</Text>
    //     <Text style={styles.subtitle}>{item?.pickup}</Text>

    //     <View style={styles.spacer} />

    //     <Text style={styles.title}>{localizationStrings?.TripTitle2}</Text>
    //     <Text style={styles.subtitle}>{item?.drop}</Text>
    //     <Text style={styles.subtitle}>10:00 AM</Text>
    //     <Text style={styles.subtitle}>BT: NO</Text>
    //     <Text style={styles.subtitle}>Type: Manquant </Text>

    //   </View>

    // </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation?.navigate(ScreenNameEnum.TripDetail, {item:item})} style={[styles.card, { borderColor: item.transport_type == "Médical" ? '#00e6e6' : 'black' }]}>
      <View style={styles.row}>
        <View>
          <Text style={styles.name}>
            {item?.patient_details
              ? `${item?.patient_details?.first_name || ''} ${item?.patient_details?.last_name || ''}`
              : 'N/A'}
          </Text>
          {/* <Text style={styles.address}>
            <Icon source={imageIndex.location2} size={15} />
            {" "} {item.address}</Text> */}
        </View>
        {/* <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}> */}
        {/* <Text style={styles.statusText}>{"Driver Name"}</Text> */}
        {/* </View> */}
      </View>
      <View style={styles.rowC}>
        <View style={[styles.row1,{flex:0.6}]}>
          <Icon source={imageIndex.location3} colorIcon="grey" size={20} />

          <Text style={[styles.infoText, { paddingRight: 6 }]} numberOfLines={1}>
            {item?.departure_address || '—'}
          </Text>
        </View>
        <View style={[styles.row1,{flex:0.4}]}>
          <Icon source={imageIndex.calendar3} colorIcon="grey" size={20} />

          <Text style={styles.infoText}>{item?.departure_time || '—'}</Text>

        </View>
      </View>
      <View style={styles.rowC}>
        <View style={[styles.row1,{flex:0.6}]}>
          <Icon source={imageIndex.location3} colorIcon="grey" size={20} />

          <Text style={[styles.infoText, { paddingRight: 6 }]} numberOfLines={1}>
            {item?.arrival_address || '—'}
          </Text>
        </View>
        <View style={[styles.row1,{flex:0.4}]}>
          <Icon source={imageIndex.calendar3} colorIcon="grey" size={20} />

          <Text style={styles.infoText}>{item?.arrival_time || '—'}</Text>

        </View>
      </View>
      <View style={[styles.buttonRow , {display:item?.status === 'Done' ? 'none':'flex'}]}>
        {/* <CustomButton  onPress={()=>navigation.navigate(ScreenNameEnum.CaptureDoc)} title={item.status} bgColor={item.statusColor} style={{ width: '45%' }} height={40} /> */}
      
        <CustomButton
          title={
            item?.status === "Assign"
              ? "AFFECTER"
              : item?.status === "Departure"
                ? "Départ"
                : item?.status === "Asign"
                  ? "En charge"
                  : "Terminé"
          }
          onPress={()=> navigation?.navigate(ScreenNameEnum.TripDetail, {item:item})}
          style={{ width: '45%' }}
          height={40}
        />

        <CustomButton
          onPress={() => {
            let url = `tel:${item.phone}`;
            Linking.openURL(url);
          }}
          leftIcon={<Icon source={imageIndex.call} colorIcon='#fff' size={20} />} title={localizationStrings.call} style={{ width: '45%' }} height={40} />

      </View>
    </TouchableOpacity>

  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    color: '#555',
    fontSize: 13,
  },
  spacer: {
    height: 12,
  },


  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFE082',
  },

  leftContainer: {
    alignItems: 'center',
    marginRight: 12,
    marginTop: 15
  },
  dottedLineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFE082', // Lighter yellow
    marginVertical: 3,
  },



  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    borderLeftWidth: 8
    // elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  infoText: {
    color: '#777',
    width: '90%',
    marginLeft: 3
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#00B2FF',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  buttonText: {
    color: '#00B2FF',
    fontWeight: '600',
  },
  buttonFilled: {
    backgroundColor: '#00B2FF',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  buttonFilledText: {
    color: '#fff',
    fontWeight: '600',
  },

  row1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
    flex: 1

  },
  rowC: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent:'space-between',
    marginTop: 6,
  },
})