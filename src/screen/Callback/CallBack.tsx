import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../compoent/SearchBar";
import imageIndex from "../../assets/imageIndex";
import CustomHeader from "../../compoent/CustomHeader";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../routes/screenName.enum";
import DeleteModal from "../../compoent/DeleteModal";
import { DeleteCallbackApi, GetCallbackListApi, GetDeletedCallbackApi, RestoreCallbackApi } from "../../Api/apiRequest";
import { useSelector } from "react-redux";
import moment from "moment";
import LoadingModal from "../../utils/Loader";
import RestoreModal from "../../compoent/RestoreModal";


export default function CallbackScreen() {
  const [activeTab, setActiveTab] = useState<"Active" | "Deleted">("Active");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [callbackData, setCallbackData] = useState([])
  const [searchText, setSearchText] = useState("");
  const isLogin = useSelector((state: any) => state.auth);
  const [selectedItem, setSelectedItem] = useState<any>(null);
    const [restoreModalVisible, setRestoreModalVisible] = useState(false);
  
  const formattedDate = (dateStr: any) => moment(dateStr).format("MMM DD, YYYY");
  // console.log(isLogin)
  useFocusEffect(
    useCallback(() => {
      fetchCallback("Active");
    }, [])
  );
  useEffect(() => {
    fetchCallback(activeTab);
  }, [activeTab]);

  const filteredData = callbackData.filter((item: any) => {
    const query = searchText.toLowerCase();
    return (
      item?.task_name?.toLowerCase().includes(query) ||
      item?.employee?.first_name?.toLowerCase().includes(query) ||
      item?.employee?.last_name?.toLowerCase().includes(query) ||
      item?.status?.name?.toLowerCase().includes(query) ||
      item?.priority?.name?.toLowerCase().includes(query)
    );
  });
  const fetchCallback = async (activeTab: string) => {
    const param = {
      token: isLogin?.token
    }
    if (activeTab == "Active") {
      const data = await GetCallbackListApi(param, setLoading)
      setCallbackData(data?.data?.data)
    } else {
      const data = await GetDeletedCallbackApi(param, setLoading)
      console.log(data?.data)
      setCallbackData(data?.data?.data)
    }
  }


  const nav = useNavigation()
  const renderCard = ({ item }: any) => {
    const handleDelete = async () => {
      // 👇 Your delete API or logic here
      console.log("Item deleted!");
      const param = {
        id: item?.id,
        token: isLogin?.token
      }
      const dd = await DeleteCallbackApi(param, setLoading)
      fetchCallback(activeTab)
      setDeleteModalVisible(false);
    };

    const handleRestore = async () => {
      // 👇 Your delete API or logic here
      console.log("Item deleted!");
      const param = {
        id: item?.id,
        token: isLogin?.token
      }
      const dd = await RestoreCallbackApi(param, setLoading)
      fetchCallback(activeTab)
      // setDeleteModalVisible(false);
    };
    return (
      <TouchableOpacity
        onPress={() => nav.navigate(ScreenNameEnum.CallbackDetailScreen, { item: item })}
        style={styles.card}>
        {/* Row 1: ID & Name */}
        <View style={styles.cardRow}>
          <View style={styles.cardItem}>
            <Text style={styles.label}>ID</Text>
            <Text style={styles.value}>{item.id}</Text>
          </View>
          <View style={[styles.cardItem, styles.right]}>
            <Text style={styles.label}>Tasks</Text>
            <Text style={styles.value}>{item?.task_name} </Text>
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
            <Text style={styles.value}>{formattedDate(item?.created_at)}</Text>
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
            {activeTab == "Active" ?

              <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }}>

                <TouchableOpacity
                  onPress={() => nav.navigate(ScreenNameEnum.CallbackDetailScreen, { item: item })}

                >
                  <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.eyeBlue} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => nav.navigate(ScreenNameEnum.AddCallback, { item: item })}
                >
                  <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.editGreen} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async() => {
                  await  setSelectedItem(item);
                    setDeleteModalVisible(true)}}

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
        placeholder="Search Callback"
      />
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Active" && styles.activeTab]}
          onPress={() => setActiveTab("Active")}
        >
          <Text style={activeTab === "Active" ? styles.tabTextActive : styles.tabText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Deleted" && styles.activeTab]}
          onPress={() => setActiveTab("Deleted")}
        >
          <Text style={activeTab === "Deleted" ? styles.tabTextActive : styles.tabText}>Deleted</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        // data={callbackData}
        data={filteredData}
        showsVerticalScrollIndicator={false}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100, marginTop: 12 }}
      />

      {/* Floating Button */}

      <TouchableOpacity style={[styles.fab, { display: activeTab == "Active" ? "flex" : "none" }]}
        onPress={() => nav.navigate(ScreenNameEnum.AddCallback)}
      >
        <Image
          source={imageIndex.AddLogo}
          style={{ height: 70, width: 70, resizeMode: "contain" }}
        />
      </TouchableOpacity>
 {/* <DeleteModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={handleDelete}
          title="Delete Callback?"
          message="Are you sure you want to delete this Callback from your list?"
          cancelText="No"
          confirmText="Yes, Delete"
        /> */}

        <DeleteModal
  visible={deleteModalVisible}
  onClose={() => setDeleteModalVisible(false)}
  onConfirm={async () => {
    if (selectedItem) {
      const param = { id: selectedItem.id, token: isLogin?.token };
      await DeleteCallbackApi(param, setLoading);
      fetchCallback(activeTab);
    }
    setDeleteModalVisible(false);
  }}
  title="Delete Budget?"
  message="Are you sure you want to delete this Callback from your list?"
  cancelText="No"
  confirmText="Yes, Delete"
/>

<RestoreModal
  visible={restoreModalVisible}
  onClose={() => setRestoreModalVisible(false)}
  onConfirm={async () => {
    if (selectedItem) {
      const param = { id: selectedItem.id, token: isLogin?.token };
      await RestoreCallbackApi(param, setLoading);
      fetchCallback(activeTab);
    }
    setRestoreModalVisible(false);
  }}
  message="Do you want to restore this Callback?"
  cancelText="No"
  confirmText="Yes, Restore"
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
