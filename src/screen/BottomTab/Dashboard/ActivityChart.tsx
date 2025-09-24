import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart, XAxis } from "react-native-svg-charts";
import { G, Rect } from "react-native-svg";

export default function ActivitiesChart({ dashboardData }) {
  const [barData, setBarData] = useState([]);
  const [xAxisData, setXAxisData] = useState([]);

  useEffect(() => {
    if (dashboardData?.topEmployees) {
      // ✅ take only 5 employees
      const formatted = dashboardData.topEmployees.slice(0, 5).map((item) => ({
        completed: Number(item.completed),
        // completed: 3,
        progress: Number(item.in_progress),
        label: item.name.split(" ")[0], // first name only
      }));
      setBarData(formatted);

      // ✅ find max value
      const allValues = [
        ...formatted.map((d) => d.completed),
        ...formatted.map((d) => d.progress),
      ];
      const maxValue = Math.max(...allValues, 0);

      // ✅ create 5 steps for X axis
      const step = Math.ceil(maxValue / 5) || 1;
      const ticks = Array.from({ length: 6 }, (_, i) => i * step);
      setXAxisData(ticks);
    }
  }, [dashboardData]);

  // ✅ Custom Bars (horizontal stacked style)
  const CustomBars = ({ x, y, bandwidth }) => (
    <G>
      {barData.map((item, index) => (
        <React.Fragment key={index}>
          {/* Completed */}
          <Rect
            x={x(0)}
            y={y(index) + bandwidth / 6}
            width={x(item.completed) - x(0)}
            height={bandwidth / 3}
            fill="#4a90e2"
            rx={4}
            ry={4}
          />
          {/* In Progress */}
          <Rect
            x={x(0)}
            y={y(index) + (bandwidth / 2)}
            width={x(item.progress) - x(0)}
            height={bandwidth / 3}
            fill="#7f8c8d"
            rx={4}
            ry={4}
          />
        </React.Fragment>
      ))}
    </G>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activities</Text>
      <View style={{ flexDirection: "row", height: 250 }}>
        {/* Y Axis Names */}
        <View style={{ justifyContent: "space-around", paddingRight: 8, height: 200 }}>
          {barData.map((item, index) => (
            <Text key={index} style={styles.yLabel}>
              {item.label}
            </Text>
          ))}
        </View>

        {/* Chart */}
        <View style={{ flex: 1 }}>
          <BarChart
            style={{ flex: 1 }}
            data={xAxisData}
            horizontal={true}
            svg={{ fill: "transparent" }}
            spacingInner={0.5}
            gridMin={0}
            yMax={barData.length}
          >
            <CustomBars />
          </BarChart>

          {/* X Axis */}
          <XAxis
            style={{ marginTop: 5 }}
            data={xAxisData}
            formatLabel={(value) => `${value}`}
            contentInset={{ left: 5, right: 20 }}
            svg={{ fontSize: 10, fill: "#000" }}
          />
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: "#4a90e2" }]} />
          <Text style={styles.legendText}>Completed</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: "#7f8c8d" }]} />
          <Text style={styles.legendText}>In Progress</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  title: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  yLabel: {
    color: "#000",
    fontSize: 12,
    marginVertical: 5,
  },
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
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    color: "#000",
    fontSize: 12,
  },
});
