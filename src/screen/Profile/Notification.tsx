import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'
import CustomHeader from '../../compoent/CustomHeader'
import imageIndex from '../../assets/imageIndex'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomBackHeader from '../../compoent/CustomBackHeader'
import StatusBarComponent from '../../compoent/StatusBarCompoent'

const Notification = () => {
  const navigation = useNavigation()

  // Dummy static data
  const notifications = [
    {
      id: '1',
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped successfully.',
      time: '2h ago',
      icon: imageIndex.Avatar,
    },
    {
      id: '2',
      title: 'New Message',
      message: 'You have received a new message from Support.',
      time: '5h ago',
      icon: imageIndex.Avatar,
    },
    {
      id: '3',
      title: 'Offer Alert',
      message: 'Get 20% discount on your next purchase!',
      time: '1d ago',
      icon: imageIndex.Avatar,
    },
  ]

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.icon} style={styles.icon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarComponent/>
      <View style={{
        marginHorizontal:15
      }}>
                 <CustomBackHeader menuIcon={imageIndex.back} label={"Notifications"} /> 

                 </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
})
