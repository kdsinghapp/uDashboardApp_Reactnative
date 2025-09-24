import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import CustomHeader from '../../../compoent/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import TaskCard from '../../../compoent/TaskSummary';
import Svg, { Circle } from "react-native-svg";
import { wp } from '../../../utils/Constant';
import ActivitiesChart from './ActivityChart';
import GroupedBarChart from './SaleChart';
import TaskCompleteProgressBar from './TaskCompleteChart';
import { GetApi } from '../../../Api/apiRequest';
import { useSelector } from 'react-redux';
import LoadingModal from '../../../utils/Loader';
import { endpointCustomer } from '../../../Api/endpoints';


const stats = [
  { id: 1, title: "Due Task", value: "89.9K", icon: "briefcase-outline", im: imageIndex.TotalProject, active: true },
  { id: 2, title: "Call Backs", value: "78.5K", im: imageIndex.time, icon: "checkmark-circle-outline", active: false },
  { id: 3, title: "Revenue", value: "20.3K", im: imageIndex.rating, icon: "sync-outline", active: false },
  { id: 4, title: "Total Profile", value: "10.6K", im: imageIndex.pending, icon: "layers-outline", active: false },
];

export default function DashboardScreen() {
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false)
  const isLogin = useSelector((state) => state?.auth)
  const [overView, setOverView] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const initialTasks = [
    {
      id: "1",
      title: "Android app development",
      manager: "Rachel Green",
      dueDate: "Jul 07, 2024",
      team: "Mobile Team",
      status: "Completed",
    },
    {
      id: "2",
      title: "Android app development",
      manager: "Rachel Green",
      dueDate: "Jul 07, 2024",
      team: "Mobile Team",
      status: "Completed",
    },
    {
      id: "3",
      title: "Android app development",
      manager: "Rachel Green",
      dueDate: "Jul 07, 2024",
      team: "Mobile Team",
      status: "Completed",
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [year, setYear] = useState(2025);

  const toggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" }
          : task
      )
    );
  };

  const radius = wp(25);
  const strokeWidth = 35;
  const circumference = 2 * Math.PI * radius;

  const segments = [
    { color: "#C6E2FF", percent: 50, name: "Web" },
    { color: "#FFE58F", percent: 10, name: "PPC" },
    { color: "#D2F8D2", percent: 5, name: "Other" },
    { color: "#F79494", percent: 35, name: "Seo" },
  ];
  let offset = 0;

  useEffect(() => {
    getOverview()
  }, [])
  const getOverview = async () => {
    const param1 = {
      token: isLogin?.token,
      url: endpointCustomer.dashboard,
    };
    const dashboard = await GetApi(param1, setLoading);
    console.log(dashboard, 'this is dashboard')
    setDashboardData(dashboard)
    const param = {
      token: isLogin?.token,
      url: "overview-data?filter=this_year"
    }
    const overview = await GetApi(param, setLoading)
    console.log(overview)
    setOverView(overview)

  }
  return (
    <SafeAreaView edges={['top']} style={{
      flex: 1,
      backgroundColor: "white",
    }}
      edges={['top']}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {loading && <LoadingModal />}

        <StatusBarComponent />
        <View style={{
          padding: 15,
        }}>


          <CustomHeader isSearch={true} />
        </View>
        <View style={styles.container1}>
          {stats.map((item, index) => {
            const isActive = selectedId === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, isActive && styles.activeCard]}
                onPress={() => setSelectedId(item.id)}

              >
                <Image source={item.im}
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: 'contain'
                  }}
                />
                <Text allowFontScaling={false} style={[styles.value, isActive && { color: "#fff", marginTop: 20 }]}>
                  {index == 0 ? overView?.dueTasks : index == 1 ? overView?.allCallbacks : index == 2 ? overView?.revenue : overView?.profit}
                </Text>
                <Text allowFontScaling={false} style={[styles.label, isActive && { color: "#fff" }]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
        {/* Line Chart */}
        <Text allowFontScaling={false} style={styles.chartTitle}>Stats Over Time</Text>

        <Text style={styles.title}>Sell</Text>
        <View style={{
          borderWidth: 1,
          borderColor: "#E3E3E3",
          borderRadius: 10,
          marginTop: 15

        }}>
          <GroupedBarChart dashboardData={dashboardData} />
        </View>
        <View style={{
          flex: 1,
          borderWidth: 1,
          borderColor: "#E3E3E3",
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15,
          display: 'none'
        }}>
          <View style={styles.legend}>
            {segments.map(item =>
              <View style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: `${item?.color}` }]} />
                <Text style={styles.legendText}>{item?.name} {item?.percent}%</Text>
              </View>
            )}
          </View>
          <Svg height="300" width={wp(100) - 40} style={{ width: wp(100), alignItems: 'center', justifyContent: 'center' }}>
            {segments?.map((seg, index) => {
              const strokeDasharray = `${(circumference * seg.percent) / 100} ${circumference
                }`;
              const circle = (
                <Circle
                  key={index}
                  cx={wp(50) - 20}
                  cy={wp(40)}
                  r={radius}
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={-offset}
                  fill="transparent"
                />
              );
              offset += (circumference * seg.percent) / 100;
              return circle;
            })}
          </Svg>


        </View>

        <View style={{
          borderWidth: 1,
          borderColor: "#E3E3E3",
          borderRadius: 10,
          marginTop: 15

        }}>
          <ActivitiesChart dashboardData={dashboardData} />
        </View>
        <View style={{
          borderWidth: 1,
          borderColor: "#E3E3E3",
          borderRadius: 10,
          marginTop: 15,
          display: 'none'


        }}>
          <TaskCompleteProgressBar />
        </View>
        <View style={{
          borderWidth: 1,
          borderColor: "#E3E3E3",
          marginTop: 10,
          borderRadius: 10,
          display: 'none'
        }}>
          <View style={{
            marginHorizontal: 12,
            marginTop: 11
          }}>
            <View style={styles.header}>
              <Text allowFontScaling={false} style={styles.headerTitle}>Task Summary</Text>
              <TouchableOpacity onPress={() => setYear(year === 2025 ? 2024 : 2025)}>
                <Text allowFontScaling={false} style={styles.year}>{year} ▼</Text>
              </TouchableOpacity>
            </View>

            {/* Task List */}

            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TaskCard task={item} onToggleStatus={toggleStatus} />
              )}
            />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: 'white', paddingBottom: 50 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statCard: { width: '48%', backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 3 },
  chartTitle: { fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 8 },
  taskContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  taskRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },


  container1: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  year: { fontSize: 16, fontWeight: "500", color: "#333" },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E3E3E3"
  },
  activeCard: {
    backgroundColor: "#0A0F2C",
  },
  icon: {
    marginBottom: 10,
  },
  value: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20
  },
  label: {
    fontSize: 13,
    color: "#666666",
    marginTop: 6,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    // marginBottom:20
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  dot: {
    width: 15,
    height: 15,
    // borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    color: "#000",
    fontSize: 12,
  },
});
