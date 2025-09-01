import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { G, Rect } from "react-native-svg";

const SellBarChart = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"];

  // Data for each category
  const profit = [10000, 9000, 5000, 4500, 3000, 7500, 8500];
  const revenue = [8000, 6000, 8500, 7000, 4000, 6800, 5000];
  const expense = [5500, 7000, 7000, 6800, 2500, 6200, 6000];

  const barData = [
    {
        name:"Profit",
      data: profit,
      svg: { fill: "#2979FF" }, // blue
    },
    {
        name:"Revenue",

      data: revenue,
      svg: { fill: "#FF9800" }, // orange
    },
    {
      data: expense,
      svg: { fill: "#4CAF50" }, // green
        name:"Expense",

    },
  ];

  return (
    <View>
          <View style={styles.legend}>
                      {barData.map(item=>
                          <View style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: `${item?.svg.fill}` }]} />
                            <Text style={styles.legendText}>{item?.name}</Text>
                          </View>
                         )}
                        </View>
    <View style={{ flexDirection: "row", height: 300, padding: 20 }}>
      {/* Y Axis */}
      <YAxis
        data={[0, 2000, 4000, 6000, 8000, 10000]}
        contentInset={{ top: 10, bottom: 10 }}
        svg={{ fill: "grey", fontSize: 10 }}
        numberOfTicks={6}
        formatLabel={(value) => `${value / 1000}k`}
      />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <BarChart
          style={{ flex: 1 }}
          data={barData}
          yAccessor={({ item }) => item}
          gridMin={0}
          spacingInner={0.3} // space between grouped bars
          spacingOuter={0.2} // space between groups
          contentInset={{ top: 10, bottom: 10 }}
        >
          <Grid />
        </BarChart>

        {/* X Axis */}
        <XAxis
          style={{ marginTop: 10 }}
          data={months}
          formatLabel={(value, index) => months[index]}
          contentInset={{ left: 30, right: 30 }}
          svg={{ fontSize: 12, fill: "grey" }}
        />
      </View>
    </View>
    </View>
  );
};
const styles =StyleSheet.create({
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
    // borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    color: "#000",
    fontSize: 12,
  },
})

export default SellBarChart;
