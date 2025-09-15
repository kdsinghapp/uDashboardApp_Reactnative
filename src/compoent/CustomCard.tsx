import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

type ActionButton = {
  icon: any; // image source
  onPress: () => void;
};

type Props = {
  title: string;
  subtitle?: string;
  subtitle2?: string;
  actions?: ActionButton[];
  onPress?: () => void;
};

const CommonCard: React.FC<Props> = ({ title, subtitle, subtitle2, actions = [], onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardTopRow}>
        <View>
          <Text style={styles.name}>{title}</Text>
          {subtitle ? <Text style={styles.details}>{subtitle}</Text> : null}
          {subtitle2 ? <Text style={styles.details}>{subtitle2}</Text> : null}
        </View>

        {actions.length > 0 && (
          <View style={styles.cardBottomRow}>
            {actions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.iconBtn} onPress={action.onPress}>
                <Image style={styles.icon} source={action.icon} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

 
  iconBtn: {
    marginLeft: 12,
  },
  icon: {
    height: 22,
    width: 22,
  },
});

export default CommonCard;
