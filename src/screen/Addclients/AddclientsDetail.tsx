import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBackHeader from "../../compoent/CustomBackHeader";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import imageIndex from "../../assets/imageIndex";

const { width } = Dimensions.get("window");

const AddclientsDetail = () => {
  const teamMembers = [
    { id: 1, name: "Rakesh Dongre", email: "rakesh@gmail.com", phone: "+91 2109939000", position: "N/A" },
    { id: 2, name: "Ajay Dangi", email: "ajay@gmail.com", phone: "+", position: "N/A" },
    { id: 3, name: "Anurag Bagti", email: "anurag@gmail.com", phone: "+", position: "N/A" },
  ];

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBarComponent />
      <View style={styles.headerContainer}>
        <CustomBackHeader menuIcon={imageIndex.back} label={"Clients Detail"} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        
        {/* Client Detail Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Client Detail</Text>
          <Text style={styles.clientName}>Rakeshh Dongree</Text>

          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Status:</Text>
            <Text style={styles.clientValue}>Completed</Text>
          </View>

          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Priority:</Text>
            <Text style={styles.clientValue}>Medium</Text>
          </View>

          {/* Assigned Team */}
          <Text style={[styles.cardTitle, { marginTop: 14 }]}>Assigned Team</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableText, { flex: 1 }]}>Team Name</Text>
            <Text style={[styles.tableText, { flex: 1 }]}>Description</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableText, { flex: 1 }]}>Team 3</Text>
            <Text style={[styles.tableText, { flex: 1 }]}>Team 3</Text>
          </View>
        </View>

        {/* Team Members Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Team Members</Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableText, { flex: 0.3 }]}>#</Text>
            <Text style={[styles.tableText, { flex: 1 }]}>Name</Text>
            <Text style={[styles.tableText, { flex: 1.5 }]}>Email</Text>
            <Text style={[styles.tableText, { flex: 1 }]}>Phone</Text>
            <Text style={[styles.tableText, { flex: 1 }]}>Position</Text>
          </View>

          {teamMembers.map(member => (
            <View key={member.id} style={styles.tableRow}>
              <Text style={[styles.tableText, { flex: 0.3 }]}>{member.id}</Text>
              <Text style={[styles.tableText, { flex: 1 }]} numberOfLines={1}>{member.name}</Text>
          {/* <Text style={[styles.tableText, { flex: 1.5 }]} numberOfLines={1}>{member.email}</Text>
              <Text style={[styles.tableText, { flex: 1 }]}>{member.phone}</Text>
              <Text style={[styles.tableText, { flex: 1 }]}>{member.position}</Text>  */}
            </View>
          ))}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    marginHorizontal: 12,
    marginBottom: 6,
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E2E5A",
    marginBottom: 8,
  },
  clientName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },
  clientRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  clientLabel: {
    fontWeight: "700",
    marginRight: 6,
    color: "#555",
  },
  clientValue: {
    fontWeight: "500",
    color: "#777",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#DCDCDC",
    paddingVertical: 8,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },
  tableText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});

export default AddclientsDetail;
