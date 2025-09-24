import { wp } from "../../utils/Constant";
import imageIndex from "../../assets/imageIndex";
import CustomBackHeader from "../../compoent/CustomBackHeader";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import RenderHTML from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";

const DayDetailsScreen = ({ route }) => {
    const { event } = route.params;

    return (

        <SafeAreaView edges={['top']} style={{
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 20

        }}>
            <View style={{
            }}>
                <CustomBackHeader menuIcon={imageIndex.back} label={"Event Detail"} />
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Event Name</Text>
                <Text style={styles.value}>{event.title}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Start Date: </Text>
                <Text style={styles.value}>{event.start}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>All Day: </Text>
                <Text style={styles.value}>{event.allDay ? "Yes" : "No"}</Text>
            </View>


            <RenderHTML
                contentWidth={wp(90)} // or use useWindowDimensions().width
                source={{ html: event.extendedProps.html }}
            />
        </SafeAreaView>
    );
};

export default DayDetailsScreen

const styles = StyleSheet.create({
    row: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: "#000000",
        marginBottom: 4,
        fontWeight: "700",

    },
    value: {
        fontSize: 15,
        fontWeight: "500",
        color: "#878787",
    },
})