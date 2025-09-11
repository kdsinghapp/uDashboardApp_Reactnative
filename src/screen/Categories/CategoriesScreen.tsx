import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../compoent/SearchBar";
import imageIndex from "../../assets/imageIndex";
import CustomHeader from "../../compoent/CustomHeader";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../routes/screenName.enum";
import DeleteModal from "../../compoent/DeleteModal";
import { useSelector } from "react-redux";
import moment from "moment";
import { DeleteCategoryApi, DeleteEmployApi, GetCategoryListApi, GetDeletedCategoryApi, GetDeletedEmployApi, GetEmployListApi, RestoreCategoryApi, RestoreEmployApi } from "../../Api/apiRequest";
import LoadingModal from "../../utils/Loader";
import RestoreModal from "../../compoent/RestoreModal";

const allData = [
  {
    id: "01",
    name: "Website Redesign",
    amount: "₹50,000.00",
    details: "Client payment for UI project",
    date: "20 Aug 2025",
    status: "Active",
  },
  {
    id: "02",
    name: "Website Redesign",
    amount: "₹50,000.00",
    details: "Client payment for UI project",
    date: "20 Aug 2025",
    status: "Deleted",
  },
  {
    id: "03",
    name: "Mobile App",
    amount: "₹80,000.00",
    details: "Client payment for App project",
    date: "22 Aug 2025",
    status: "Active",
  },
  {
    id: "04",
    name: "Mobile App",
    amount: "₹80,000.00",
    details: "Client payment for App project",
    date: "22 Aug 2025",
    status: "Active",
  },
];

export default function CategoriesScreen() {
  const [activeTab, setActiveTab] = useState<"Active" | "Deleted">("Active");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [restoreModalVisible, setRestoreModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [employeeData, setEmployeeData] = useState([])
  const [searchText, setSearchText] = useState("");
  const isLogin = useSelector((state: any) => state.auth);
  const formattedDate = (dateStr: any) => moment(dateStr).format("MMM DD, YYYY");
  // console.log(isLogin)
  useFocusEffect(
    useCallback(() => {
      fetchEmployee("Active");
    }, [])
  );
  useEffect(() => {
    fetchEmployee(activeTab);
  }, [activeTab]);

  const filteredData = employeeData.filter((item: any) => {
    const query = searchText.toLowerCase();
    return (
      item?.name?.toLowerCase().includes(query) 
    );
  });
  const fetchEmployee = async (activeTab: string) => {
    const param = {
      token: isLogin?.token
    }
    if (activeTab == "Active") {
      const data = await GetCategoryListApi(param, setLoading)
      setEmployeeData(data?.data?.data)
      console.log(data?.data?.data, 'this is instide employee')
    } else {
      const data = await GetDeletedCategoryApi(param, setLoading)
      // console.log(data?.data)
      setEmployeeData(data?.data?.data)
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
      const dd = await DeleteCategoryApi(param, setLoading)
      fetchEmployee(activeTab)
      setDeleteModalVisible(false);
    };

    const handleRestore = async () => {
      // 👇 Your delete API or logic here
      console.log("Item deleted!");
      const param = {
        id: item?.id,
        token: isLogin?.token
      }
      const dd = await RestoreCategoryApi(param, setLoading)
      fetchEmployee(activeTab)
      setRestoreModalVisible(false);
    };
    return (
      <TouchableOpacity
        onPress={() => nav.navigate(ScreenNameEnum.CategoriesDetail, { item: item })}
        style={styles.card}
      >
        {/* Top Row: Name & Status */}
        <View style={styles.cardTopRow}>
          <View>
            <Text style={styles.name}>{item?.name}</Text>
         
          </View>
          {activeTab == "Active" &&
            <View style={styles.cardBottomRow}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => nav.navigate(ScreenNameEnum.CategoriesDetail, { item: item })}>
                <Image style={styles.icon} source={imageIndex.eyeBlue} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={() => nav.navigate(ScreenNameEnum.AddCategories, { item: item })}>
                <Image style={styles.icon} source={imageIndex.editGreen} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={() => setDeleteModalVisible(true)}>
                <Image style={styles.icon} source={imageIndex.delite} />
              </TouchableOpacity>
            </View>
          }
          {activeTab == "Deleted" &&
            <View style={styles.cardBottomRow}>

              <TouchableOpacity style={styles.iconBtn} onPress={() => setRestoreModalVisible(true)}>
                <Image style={styles.icon} source={imageIndex.restore} />
              </TouchableOpacity>
            </View>
          }
        </View>


        <DeleteModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={handleDelete}
          title="Delete Employee?"
          message="Are you sure you want to delete this Category from your list?"
          cancelText="No"
          confirmText="Yes, Delete"
        />
         <RestoreModal
          visible={restoreModalVisible}
          onClose={() => setRestoreModalVisible(false)}
          onConfirm={handleRestore}
          message="Do you want to restore this category?"
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

          onPress={() => {
            nav.navigate(ScreenNameEnum.AddCategories)
          }}
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
  fab: {
    position: "absolute",
    bottom: 35,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tabRow: { flexDirection: "row", borderRadius: 20, marginTop: 10, marginBottom: 10, backgroundColor: "#F5F5F5", },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 20, backgroundColor: "#F5F5F5", marginHorizontal: 5, height: 40, justifyContent: 'center' },
  activeTab: { backgroundColor: "#007bff", },
  tabText: { color: "#555" },
  tabTextActive: { color: "#fff", fontWeight: "600" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    marginHorizontal: 5,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Android shadow
    elevation: 5,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardMiddleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"

  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  details: {
    fontSize: 14,
    color: "#878787",
    marginTop: 2,
    lineHeight: 22
  },
  amount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  date: {
    fontSize: 12,
    color: "#878787",
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
  },
  iconBtn: {
    marginLeft: 12,
  },
  icon: {
    height: 22,
    width: 22,
  },
});
