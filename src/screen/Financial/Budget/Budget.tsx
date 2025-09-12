import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../../compoent/SearchBar";
import imageIndex from "../../../assets/imageIndex";
import CustomHeader from "../../../compoent/CustomHeader";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";
import DeleteModal from "../../../compoent/DeleteModal";
import { useSelector } from "react-redux";
import moment from "moment";
import { DeleteBudgetApi, GetDeletedBudgetApi, GetBudgetListApi, RestoreBudgetApi } from "../../../Api/apiRequest";
import LoadingModal from "../../../utils/Loader";
import RestoreModal from "../../../compoent/RestoreModal";

const allData = [
  { id: "01", name: "Website Redesign", amount: "₹50,000.00", details: "Client payment for UI project", date: "20 Aug 2025", status: "Active" },
  { id: "02", name: "Website Redesign", amount: "₹50,000.00", details: "Client payment for UI project", date: "20 Aug 2025", status: "Deleted" },
  { id: "03", name: "Mobile App", amount: "₹80,000.00", details: "Client payment for App project", date: "22 Aug 2025", status: "Active" },
  { id: "03", name: "Mobile App", amount: "₹80,000.00", details: "Client payment for App project", date: "22 Aug 2025", status: "Active" },
];

export default function Note() {
  const [activeTab, setActiveTab] = useState<"Active" | "Deleted">("Active");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
   const [restoreModalVisible, setRestoreModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [BudgetData, setBudgetData] = useState([])
  const [searchText, setSearchText] = useState("");
  const isLogin = useSelector((state: any) => state.auth);
  const formattedDate = (dateStr: any) => moment(dateStr).format("MMM DD, YYYY");
  // console.log(isLogin)
  useFocusEffect(
    useCallback(() => {
      fetchBudget("Active");
    }, [])
  );
  useEffect(() => {
    fetchBudget(activeTab);
  }, [activeTab]);

  const filteredData = BudgetData?.filter((item: any) => {
    const query = searchText.toLowerCase();
    return (
      item?.description?.toLowerCase().includes(query) || 
      item?.amount?.toLowerCase().includes(query)
    );
  });
  const fetchBudget = async (activeTab: string) => {
    const param = {
      token: isLogin?.token
    }
    if (activeTab == "Active") {
      const data = await GetBudgetListApi(param, setLoading)
      // console.log(data?.data?.data)
      setBudgetData(data?.data?.data)
    } else {
      const data = await GetDeletedBudgetApi(param, setLoading)
      console.log(data?.data)
      setBudgetData(data?.data?.data)
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
      const dd = await DeleteBudgetApi(param, setLoading)
      fetchBudget(activeTab)
      setDeleteModalVisible(false);
    };

    const handleRestore = async () => {
      // 👇 Your delete API or logic here
      console.log("Item deleted!");
      const param = {
        id: item?.id,
        token: isLogin?.token
      }
      const dd = await RestoreBudgetApi(param, setLoading)
      fetchBudget(activeTab)
      setRestoreModalVisible(false);
    };
    return (

      <TouchableOpacity
        onPress={() => nav.navigate(ScreenNameEnum.BudgetDetail, { item: item })}

        style={styles.card}>
        {/* Row 1: ID & Name */}
        <View style={styles.cardRow}>
          <View style={styles.cardItem}>
            <Text style={[styles.label]}>ID</Text>
            <Text style={[styles.value]}>{item.id}</Text>
          </View>
          <View style={[styles.cardItem, { alignItems: 'flex-end' }]}>
            <Text style={[styles.label]}>Category</Text>
            <Text style={styles.value}>{item.category?.name}</Text>
          </View>
        </View>

        {/* Row 2: Amount & Details */}
        <View style={styles.cardRow}>
          <View style={styles.cardItem}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{item?.description}</Text>
          </View>
          <View style={[styles.cardItem, { alignItems: 'flex-end' }]}>
            <Text style={[styles.label]}>Amount</Text>
            <Text style={styles.value}>{item?.amount}</Text>
          </View>
        </View>

        {/* Row 3: Date & Status */}
        <View style={styles.cardRow}>
          <View style={styles.cardItem}>
            <Text style={[styles.label]}>Created At</Text>
            <Text style={styles.value}>{moment(item?.created_at).format("MMM DD, YYYY")}</Text>
          </View>
          <View style={[styles.cardItem, { alignItems: 'flex-end' }]}>
            <Text style={[styles.label]}>Action</Text>
            {activeTab == "Active" &&
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }}>
                <TouchableOpacity
                  onPress={() => nav.navigate(ScreenNameEnum.BudgetDetail, { item: item })}
                >
                  <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.eyeBlue} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => nav.navigate(ScreenNameEnum.AddBudget, { note: item })}
                >
                  <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.editGreen} />

                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDeleteModalVisible(true)}
                >
                  <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.delite} />
                </TouchableOpacity>
              </View>
            }
            {activeTab == "Deleted" &&
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }}>

                <TouchableOpacity
                  onPress={() => setRestoreModalVisible(true)}
                >
                  <Image style={{ height: 22, width: 22, marginLeft: 10 }} source={imageIndex.restore} />
                </TouchableOpacity>
              </View>
            }

          </View>

        </View>



        <DeleteModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={handleDelete}
          title="Delete Budget?"
          message="Are you sure you want to delete this Budget from your list?"
          cancelText="No"
          confirmText="Yes, Delete"
        />
            <RestoreModal
          visible={restoreModalVisible}
          onClose={() => setRestoreModalVisible(false)}
          onConfirm={handleRestore}
          message="Do you want to restore this Tag?"
          cancelText="No"
          confirmText="Yes, Delete"
        />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingModal />}
      <StatusBarComponent />
      <CustomHeader />
      <SearchBar
        value={searchText}
        onSearchChange={(text) => setSearchText(text)}
      />
      {/* <Text style={{
        fontSize: 14,
        color: "black",
        fontWeight: "600"
      }}>Note</Text> */}
      {/* Tabs */}
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
        data={filteredData}
        showsVerticalScrollIndicator={false}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100, marginTop: 12 }}
      />

      {/* Floating Button */}
      {activeTab == "Active" &&
        <TouchableOpacity style={styles.fab}
          onPress={() => nav.navigate(ScreenNameEnum.AddBudget)}
        >
          <Image
            source={imageIndex.AddLogo}
            style={{ height: 70, width: 70, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  tabRow: { flexDirection: "row", borderRadius: 20, marginTop: 10, marginBottom: 10, backgroundColor: "#F5F5F5", },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 20, backgroundColor: "#F5F5F5", marginHorizontal: 5 },
  activeTab: { backgroundColor: "#007bff" },
  tabText: { color: "#555" },
  tabTextActive: { color: "#fff", fontWeight: "600" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
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
    color: "#000000",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: "#878787",
    fontSize: 12,
    fontWeight: "500"
  },
});
