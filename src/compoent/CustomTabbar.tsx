import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

type Tab = {
    key: string;
    label: string;
};

type Props = {
    activeTab: string;
    onTabPress: (key: string) => void;
};

const CommonTabBar: React.FC<Props> = ({ activeTab, onTabPress }) => {
    const tabs: Tab[] = [
          { key: "Active", label: "Active" },
          { key: "Deleted", label: "Deleted" },
        ]
    return (
        <View style={styles.tabRow}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.key}
                    style={[styles.tab, activeTab === tab.key && styles.activeTab]}
                    onPress={() => onTabPress(tab.key)}
                >
                    <Text style={activeTab === tab.key ? styles.tabTextActive : styles.tabText}>
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tabRow: { flexDirection: "row", borderRadius: 20, marginTop: 10, marginBottom: 10, backgroundColor: "#F5F5F5", },
    tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 20, backgroundColor: "#F5F5F5", marginHorizontal: 5, height: 40, justifyContent: 'center' },
    activeTab: { backgroundColor: "#007bff", },
    tabText: { color: "#555" },
    tabTextActive: { color: "#fff", fontWeight: "600" },
});

export default CommonTabBar;
