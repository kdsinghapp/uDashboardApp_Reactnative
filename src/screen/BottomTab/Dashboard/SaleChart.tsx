import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from "react-native";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const SellBarChart = ({ dashboardData }) => {
  const navigation = useNavigation();
  const isLogin = useSelector((state) => state?.auth);

  const [loading, setLoading] = useState(false);
  const [barData, setBarData] = useState([]);
  const [yAxisData, setYAxisData] = useState([0]);
  const [chartWidth, setChartWidth] = useState(0);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ swipeEnabled: false });
      return () => navigation.getParent()?.setOptions({ swipeEnabled: true });
    }, [navigation])
  );

  useEffect(() => {
    getOverview();
  }, [dashboardData]);

  const getOverview = async () => {
    const overview = dashboardData;
    if (!overview) return;

    const data = [
      { name: "Profit", data: overview?.monthlyProfit || [], svg: { fill: "#2979FF" } },
      { name: "Revenue", data: overview?.monthlyRevenue || [], svg: { fill: "#FF9800" } },
      { name: "Expense", data: overview?.monthlyExpense || [], svg: { fill: "#4CAF50" } },
    ];
    setBarData(data);

    const allValues = [
      ...(overview?.monthlyProfit || []),
      ...(overview?.monthlyRevenue || []),
      ...(overview?.monthlyExpense || []),
    ];
    const maxValue = Math.max(...allValues, 0);

    const roundTo = 1000;
    const roundedMax = Math.ceil(maxValue / roundTo) * roundTo;

    const numberOfTicks = 6;
    const step = roundedMax > 0 ? Math.ceil(roundedMax / numberOfTicks) : 100;
    const ticks = Array.from({ length: numberOfTicks + 1 }, (_, i) => i * step);
    setYAxisData(ticks);

    setChartWidth(months.length * 60); // width for horizontal scroll
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2979FF" />
      </View>
    );
  }

  return (
    <View>
      {/* Legend */}
      <View style={styles.legend}>
        {barData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: item.svg.fill }]} />
            <Text style={styles.legendText}>{item.name}</Text>
          </View>
        ))}
      </View>

      {/* Chart Area */}
      <View style={{ flexDirection: "row", height: 300, padding: 10 }}>
        {/* YAxis fixed */}
        <YAxis
          data={yAxisData}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{ fill: "grey", fontSize: 10 }}
          numberOfTicks={6}
          formatLabel={(value) =>
            value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`
          }
        />

        {/* Scrollable Chart */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: "column", width: chartWidth }}>
            <BarChart
              style={{ height: 250, width: chartWidth }}
              data={barData}
              yAccessor={({ item }) => item}
              gridMin={0}
              spacingInner={0.3}
              spacingOuter={0.2}
              contentInset={{ top: 10, bottom: 10 }}
            >
              {/* <Grid direction={Grid.Direction.HORIZONTAL} /> */}
            </BarChart>

            {/* X Axis */}
            <XAxis
              style={{ marginTop: 10, width: chartWidth }}
              data={months}
              formatLabel={(value, index) => months[index]}
              contentInset={{ left: 30, right: 30 }}
              svg={{ fontSize: 12, fill: "grey" }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  dot: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  legendText: {
    color: "#000",
    fontSize: 12,
  },
});

export default SellBarChart;
