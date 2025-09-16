import React, { useCallback, useEffect, useState, } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../compoent/SearchBar";
import imageIndex from "../../assets/imageIndex";
import CustomHeader from "../../compoent/CustomHeader";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../routes/screenName.enum";
import DeleteModal from "../../compoent/DeleteModal";
import { DeleteApi, GetApi, RestoreApi } from "../../Api/apiRequest";
import { useSelector } from "react-redux";
import moment from "moment";
import LoadingModal from "../../utils/Loader";
import RestoreModal from "../../compoent/RestoreModal";
import { endpointCustomer } from "../../Api/endpoints";
import CommonTabBar from "../../compoent/CustomTabbar";


export default function clientScreen() {
  const [activeTab, setActiveTab] = useState<"Active" | "Deleted">("Active");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [clientData, setclientData] = useState([])
  const [searchText, setSearchText] = useState("");
  const isLogin = useSelector((state: any) => state.auth);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [restoreModalVisible, setRestoreModalVisible] = useState(false);

  const formattedDate = (dateStr: any) => moment(dateStr).format("MMM DD, YYYY");
  // console.log(isLogin)
  useFocusEffect(
    useCallback(() => {
      fetchclient("Active");
      setActiveTab("Active");

    }, [])
  );
  useEffect(() => {
    fetchclient(activeTab);
  }, [activeTab]);

  const filteredData = clientData.filter((item: any) => {
    const query = searchText.toLowerCase();
    return (
      // item?.task_name?.toLowerCase().includes(query) ||
      item?.first_name?.toLowerCase().includes(query) ||
      item?.last_name?.toLowerCase().includes(query)
      // item?.status?.name?.toLowerCase().includes(query) ||
      // item?.priority?.name?.toLowerCase().includes(query)
    );
  });
  const fetchclient = async (activeTab: string) => {
    const param = {
      token: isLogin?.token,
      url: activeTab == "Active" ? endpointCustomer?.GetClientsList : endpointCustomer?.GetDeletedClientsList
    }
    const data = await GetApi(param, setLoading)
    setclientData(data?.data || [])
  }

  const handleDelete = async () => {
    if (!selectedItem) return
    const param = {
      token: isLogin?.token,
      url: endpointCustomer?.DeleteClients + selectedItem?.id
    }
    await DeleteApi(param, setLoading)
    fetchclient(activeTab)
    setDeleteModalVisible(false);
  };

  const handleRestore = async () => {
    if (!selectedItem) return
    const param = {
      token: isLogin?.token,
      url: endpointCustomer?.RestoreClients + selectedItem?.id,
    }
    await RestoreApi(param, setLoading)
    fetchclient(activeTab)
    setRestoreModalVisible(false);
  };
  const nav = useNavigation()
  const renderCard = ({ item }: any) => {

    return (
      <TouchableOpacity
        onPress={() => nav.navigate(ScreenNameEnum.AddclientsDetail, { item: item })}
        style={styles.card}>
        {/* Row 1: ID & Name */}
        <View style={styles.cardRow}>
          <View style={styles.cardItem}>
            <Text style={styles.label}>ID</Text>
            <Text style={styles.value}>{item.id}</Text>
          </View>
          <View style={[styles.cardItem, styles.right]}>
            <Text style={styles.label}>Case</Text>
            <Text style={styles.value}>{item?.case} </Text>
          </View>
        </View>

        {/* Row 3: Date & Status */}
        <View style={styles.cardRow}>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{item?.first_name} {item?.last_name}</Text>
          </View>

          <View style={[styles.cardItem, styles.right]}>
            <Text style={styles.label}>Team Name</Text>
            <Text style={styles.value}>{item?.team?.name}</Text>
          </View>

        </View>

        <View style={styles.cardRow}>

          <View style={[styles.cardItem]}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{formattedDate(item?.start_date
            )}</Text>
          </View>

          {/* <View style={[styles.cardItem, styles.right]}>
            <Text style={styles.label}>Status</Text>
            <Text style={[styles.value, styles.tag]}>{item?.status}</Text>
          </View>


        </View>
        <View style={styles.cardRow}>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Priority</Text>
            <Text style={[styles.value, styles.tag, { backgroundColor: item?.priority?.id == "1" ? '#4CAF50' : item?.priority?.id == "4" ? '#D32F2F' : item?.priority?.id == "3" ? "#FF5722" : "#0D6EFD", alignSelf: 'flex-start' }]}>{item?.priority?.name}</Text>
          </View> */}

          <View style={[styles.cardItem, styles.right]}>
            <Text style={styles.label}>Action</Text>
            {activeTab == "Active" ?

              <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }}>

                <TouchableOpacity
                  onPress={() => nav.navigate(ScreenNameEnum.AddclientsDetail, { item: item })}

                >
                  <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.eyeBlue} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => nav.navigate(ScreenNameEnum.Addclients, { item: item })}
                >
                  <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.editGreen} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    await setSelectedItem(item);
                    setDeleteModalVisible(true)
                  }}
                >
                  <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.delite} />
                </TouchableOpacity>
              </View>
              :
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  setRestoreModalVisible(true)
                }}
              >
                <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.restore} />
              </TouchableOpacity>
            }
          </View>
        </View>


      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {loading && <LoadingModal />}
      <StatusBarComponent />
      <CustomHeader />
      <SearchBar
        value={searchText}
        onSearchChange={(text) => setSearchText(text)}
        placeholder="Search client"
      />
      <CommonTabBar
        activeTab={activeTab}
        onTabPress={(key) => setActiveTab(key)}
      />

      {/* List */}
      <FlatList
        // data={clientData}
        data={filteredData}
        showsVerticalScrollIndicator={false}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100, marginTop: 12 }}
      />

      {/* Floating Button */}

      <TouchableOpacity style={[styles.fab, { display: activeTab == "Active" ? "flex" : "none" }]}
        onPress={() => nav.navigate(ScreenNameEnum.Addclients)}
      >
        <Image
          source={imageIndex.AddLogo}
          style={{ height: 70, width: 70, resizeMode: "contain" }}
        />
      </TouchableOpacity>
      <DeleteModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this client from your list?"
      />

      <RestoreModal
        visible={restoreModalVisible}
        onClose={() => setRestoreModalVisible(false)}
        onConfirm={handleRestore}
        message="Do you want to restore this client?"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  tabRow: { flexDirection: "row", borderRadius: 25, marginTop: 10, marginBottom: 10, backgroundColor: "#F5F5F5", },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 25, backgroundColor: "#F5F5F5", marginHorizontal: 5, height: 50, justifyContent: 'center' },
  activeTab: { backgroundColor: "#007bff", },
  tabText: { color: "#555" },
  tabTextActive: { color: "#fff", fontWeight: "600" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  fab: { position: "absolute", bottom: 40, right: 20, justifyContent: "center", alignItems: "center" },
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
