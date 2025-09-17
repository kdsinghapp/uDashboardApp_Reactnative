import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../compoent/SearchBar";
import imageIndex from "../../assets/imageIndex";
import CustomHeader from "../../compoent/CustomHeader";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../routes/screenName.enum";
import { useSelector } from "react-redux";
import { endpointCustomer } from "../../Api/endpoints";
import { GetApi } from "../../Api/apiRequest";
import LoadingModal from "../../utils/Loader";
import moment from "moment";

const allData = [
  { id: "01", name: "Website Redesign", amount: "₹50,000.00", details: "Client payment for UI project", date: "20 Aug 2025", status: "Active" },
  { id: "02", name: "Website Redesign", amount: "₹50,000.00", details: "Client payment for UI project", date: "20 Aug 2025", status: "Deleted" },
];
const formattedDate = (dateStr: any) => moment(dateStr).format("MMM DD, YYYY");

export default function BackburnerScreen() {
  // const [activeTab, setActiveTab] = useState<"Active" | "Deleted">("Active");
  const isLogin = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false)
  const [callbackData, setCallbackData] = useState([])
  const [searchText, setSearchText] = useState("")
  const nav = useNavigation()
  useEffect(() => {
    fetchCallback();
  }, []);

  const filteredData = callbackData.filter((item: any) => {
    const query = searchText.toLowerCase();
    return (
      item?.task_name?.toLowerCase().includes(query)
      //  item?.status?.name?.toLowerCase().includes(query) ||
      //   item?.priority?.name?.toLowerCase().includes(query)
    );
  });
  const fetchCallback = async () => {
    const param = {
      token: isLogin?.token,
      url: endpointCustomer?.GetBackburnerList
    }
    const data = await GetApi(param, setLoading)
    setCallbackData(data?.data)
  }
  const renderCard = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => nav.navigate(ScreenNameEnum.BackburnerDetail, { item: item })}
      style={styles.card}>
      {/* Row 1: ID & Name */}
      <View style={styles.cardRow}>
        <View style={styles.cardItem}>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.value}>{item.id}</Text>
        </View>
        <View style={[styles.cardItem, styles.right]}>
          <Text style={styles.label}>Tasks</Text>
          <Text style={styles.value}>Test New Callback </Text>
        </View>
      </View>



      {/* Row 3: Date & Status */}
      {/* <View style={styles.cardRow}>
        <View style={styles.cardItem}>
          <Text style={styles.label}>Tast Manager</Text>
          <Text style={styles.value}>rakesh dongre</Text>
        </View>

        <View style={[styles.cardItem, styles.right]}>
          <Text style={styles.label}>Create Date</Text>
          <Text style={styles.value}>Jul 29, 2025</Text>
        </View>

      </View> */}
      <View style={styles.cardRow}>
        {item?.employee?.first_name ?
          <View style={styles.cardItem}>
            <Text style={styles.label}>Client</Text>
            <Text style={styles.value}>{item?.employee?.first_name} {item?.employee?.last_name}</Text>
          </View>
          :
          <View style={[styles.cardItem]}>
            <Text style={styles.label}>Create Date</Text>
            <Text style={styles.value}>{formattedDate(item?.created_at)}</Text>
          </View>
        }
        <View style={[styles.cardItem, styles.right]}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, styles.tag]}>{item?.status?.name}</Text>
        </View>


      </View>
      <View style={styles.cardRow}>
        <View style={styles.cardItem}>
          <Text style={styles.label}>Priority</Text>
          <Text style={[styles.value, styles.tag, { backgroundColor: item?.priority?.id == "1" ? '#4CAF50' : item?.priority?.id == "4" ? '#D32F2F' : item?.priority?.id == "3" ? "#FF5722" : "#0D6EFD", alignSelf: 'flex-start' }]}>{item?.priority?.name}</Text>
        </View>

        <View style={[styles.cardItem, styles.right]}>
          <Text style={styles.label}>Action</Text>

          <TouchableOpacity
            onPress={() => {
              nav.navigate(ScreenNameEnum.BackburnerDetail, { item: item })

              // setSelectedItem(item);
              // setRestoreModalVisible(true)
            }}
          >
            <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.eyeBlue} />
          </TouchableOpacity>

        </View>
      </View>



    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {loading && <LoadingModal />}
      <StatusBarComponent />
      <CustomHeader />
      <SearchBar
        value={searchText}
        onSearchChange={setSearchText}
        placeholder="Search Backburner"
      />

      {/* Tabs */}
      {/* <Text style={styles.title}>
        Backburner Task
      </Text> */}

      {/* List */}
      <FlatList
        data={filteredData}
        showsVerticalScrollIndicator={false}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100, marginTop: 12 }}
      />

      {/* Floating Button */}
      {/* <TouchableOpacity style={styles.fab}
        onPress={() => nav.navigate(ScreenNameEnum.AddBackburner)}
      >
        <Image
          source={imageIndex.AddLogo}
          style={{ height: 70, width: 70, resizeMode: "contain" }}
        />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  title: {
    fontSize: 15,
    color: "black",
    fontWeight: "500"
  },
  fab: { position: "absolute", bottom: 35, right: 20, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // shadow ka direction
    shadowOpacity: 0.1, // shadow ki transparency
    shadowRadius: 5, // blur
    // Android shadow
    elevation: 5,
    marginHorizontal: 5
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    flex: 1
  },
  cardItem: {
    width: "40%", // two items per row
  },
  label: {
    marginBottom: 4,
    color: "#000000",
    fontWeight: "700",
    fontSize: 14

  },
  value: {
    color: "#878787",
    fontSize: 12,
    fontWeight: "500",
  },
  right: { alignItems: 'flex-end' },
  tag: { backgroundColor: '#FF9500', color: '#fff', paddingHorizontal: 13, paddingVertical: 2, borderRadius: 12, alignSelf: 'flex-end' }
});
