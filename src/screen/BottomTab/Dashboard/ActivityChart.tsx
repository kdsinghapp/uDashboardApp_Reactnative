import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart, Grid, XAxis } from "react-native-svg-charts";
import { G, Rect } from "react-native-svg";

const dataCompleted = [10, 7, 8, 6, 5, 4, 3];
const dataProgress = [7, 4, 6, 4, 3, 3, 2];
const labels = ["Gina", "Gina", "Gina", "Gina", "Gina", "Gina", "Gina"];

export default function ActivitiesChart() {
  const CUT_OFF = Math.max(...dataCompleted.concat(dataProgress));

  // Custom bar rendering
  const CustomBars = ({ x, y, bandwidth }) => (
    <G>
      {dataCompleted.map((value, index) => (
        <Rect
          key={`completed-${index}`}
          x={x(0)}
        //   y={y(index) + bandwidth / 4}
          width={x(value) - x(0)}
        //   height={bandwidth / 2}
           y={y(index) + bandwidth / 8} // adjust so it doesn’t overlap
  height={bandwidth / 2}
          fill="#4a90e2" // blue
          rx={4}
          ry={4}
        />
      ))}

      {dataProgress.map((value, index) => (
        <Rect
          key={`progress-${index}`}
          x={x(0)}
           y={y(index) + bandwidth / 1.8} // adjust so it doesn’t overlap
  height={bandwidth / 2}
        //   y={y(index) + (bandwidth / 4) * 2}
          width={x(value) - x(0)}
        //   height={bandwidth / 2}
          fill="#7f8c8d" // gray
          rx={4}
          ry={4}
        />
      ))}
    </G>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activities</Text>
      <View style={{ flexDirection: "row", height: 300 }}>
        {/* Y Axis Labels */}
        <View style={{ justifyContent: "space-between", paddingRight: 8 }}>
          {labels.map((label, index) => (
            <Text key={index} style={styles.yLabel}>
              {label}
            </Text>
          ))}
        </View>

        {/* Chart */}
        <View style={{ flex: 1 }}>
          <BarChart
            style={{ flex: 1 }}
            data={dataCompleted}
            horizontal={true}
            svg={{ fill: "transparent" }}
            spacingInner={0.4}
            contentInset={{ top: 20, bottom: 20 }}
            gridMin={0}
          >
            <Grid direction={Grid.Direction.VERTICAL} />
            <CustomBars />
          </BarChart>

          {/* X Axis */}
          <XAxis
            style={{ marginHorizontal: -10, height: 20 }}
            data={dataCompleted}
            formatLabel={(value) => `${value}`}
            contentInset={{ left: 30, right: 30 }}
            svg={{ fontSize: 10, fill: "white" }}
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
    backgroundColor: "#fff", // dark theme
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
    marginVertical: 10,
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
