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
import { DeleteApi, GetApi, RestoreApi } from "../../Api/apiRequest";
import LoadingModal from "../../utils/Loader";
import RestoreModal from "../../compoent/RestoreModal";
import { endpointCustomer } from "../../Api/endpoints";
import CommonCard from "../../compoent/CustomCard";
import CommonTabBar from "../../compoent/CustomTabbar";


export default function EmployeeScreen() {
  const [activeTab, setActiveTab] = useState<"Active" | "Deleted">("Active");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [employeeData, setEmployeeData] = useState([])
  const [searchText, setSearchText] = useState("");
  const isLogin = useSelector((state: any) => state.auth);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [restoreModalVisible, setRestoreModalVisible] = useState(false);

  const formattedDate = (dateStr: any) => moment(dateStr).format("MMM DD, YYYY");
  // console.log(isLogin)
  useFocusEffect(
    useCallback(() => {
      setActiveTab("Active");
      fetchEmployee("Active");
    }, [])
  );
  useEffect(() => {
    fetchEmployee(activeTab);
  }, [activeTab]);

  const filteredData = employeeData.filter((item: any) => {
    const query = searchText.toLowerCase();
    return (
      // item?.task_name?.toLowerCase().includes(query) ||
      item?.first_name?.toLowerCase().includes(query) ||
      item?.last_name?.toLowerCase().includes(query)
      // item?.status?.name?.toLowerCase().includes(query) ||
      // item?.priority?.name?.toLowerCase().includes(query)
    );
  });
  const fetchEmployee = async (activeTab: string) => {
    const param = {
      token: isLogin?.token,
      url: activeTab == "Active" ? endpointCustomer?.GetEmployeeList : endpointCustomer?.GetDeletedEmployeeList
    }
    const data = await GetApi(param, setLoading)
    setEmployeeData(data?.data?.data)
    // console.log(data?.data?.data, 'this is instide employee')

  }
  const nav = useNavigation()

  const handleDelete = async () => {
   if (!selectedItem)  return
    const param = {
      token: isLogin?.token,
      url: endpointCustomer?.DeleteEmployee + selectedItem?.id
    }
    await DeleteApi(param, setLoading)
    fetchEmployee(activeTab)
    setDeleteModalVisible(false);
  };

  const handleRestore = async () => {
  if (!selectedItem)  return
    const param = {
      token: isLogin?.token,
      url: endpointCustomer?.DeleteEmployee + selectedItem?.id + "/restore",
    }
    await RestoreApi(param, setLoading)
    fetchEmployee(activeTab)
    setRestoreModalVisible(false);
  };
  const renderCard = ({ item }: any) => {
    return (
      <CommonCard
        title={`${item.first_name} ${item.last_name}`}
        subtitle={item.email}
        subtitle2={item.phone}
        onPress={() => nav.navigate(ScreenNameEnum.EmployeeDetail, { item })}
        actions={
          activeTab === "Active"
            ? [
              {
                icon: imageIndex.eyeBlue,
                onPress: () => nav.navigate(ScreenNameEnum.EmployeeDetail, { item }),
              },
              {
                icon: imageIndex.editGreen,
                onPress: () => nav.navigate(ScreenNameEnum.AddEmployeeScreen, { item }),
              },
              {
                icon: imageIndex.delite,
                onPress: async () => {
                  await setSelectedItem(item);
                  setDeleteModalVisible(true);
                },
              },
            ]
            : [
              {
                icon: imageIndex.restore,
                onPress: async () => {
                  await setSelectedItem(item);
                  setRestoreModalVisible(true);
                },
              },
            ]
        }
      />
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
        placeholder="Search Employee"
      />
      <CommonTabBar
        activeTab={activeTab}
        onTabPress={(key) => setActiveTab(key)}
      />
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
            nav.navigate(ScreenNameEnum.AddEmployeeScreen)
          }}
        >
          <Image
            source={imageIndex.AddLogo}
            style={styles.icon}
          />
        </TouchableOpacity>
      }
      <DeleteModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDelete}
        title="Delete Employee?"
        message="Are you sure you want to delete this Employee from your list?"
        cancelText="No"
        confirmText="Yes, Delete"
      />
      <RestoreModal
        visible={restoreModalVisible}
        onClose={() => setRestoreModalVisible(false)}
        onConfirm={handleRestore}
        title="Delete Employee?"
        message="Do you want to restore this Employee?"
        cancelText="No"
        confirmText="Yes, Restore"
      />
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
  icon:{ height: 70, width: 70, resizeMode: "contain" }
});
