import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    LayoutAnimation,
    UIManager,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../assets/imageIndex";
import { color, fonts } from "../../constant";

// Enable animation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqs = [
    {
        id: "1",
        question: "What services do you offer?",
        answer: "We offer web development, mobile app development, UI/UX design, and software consulting.",
    },
    {
        id: "2",
        question: "How can I get a quote for your services?",
        answer: "You can request a quote by contacting us via our website or email with your project details.",
    },
    {
        id: "3",
        question: "What industries do you cater to?",
        answer: "We serve industries like healthcare, e-commerce, finance, education, and startups.",
    },
    {
        id: "4",
        question: "How can I contact your customer support?",
        answer: "You can contact our support via live chat, email, or phone. Our support team is available 24/7.",
    },
    {
        id: "5",
        question: "What is your refund policy?",
        answer: "We provide a full refund if the project has not yet started. For ongoing projects, refunds are partial.",
    },
    {
        id: "6",
        question: "How long does it take to complete a project?",
        answer: "The project timeline depends on the complexity. Small projects take 2-4 weeks, larger ones 2-6 months.",
    },
];

const FAQScreen = ({ navigation }:any) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const toggleExpand = (id: string) => {
        LayoutAnimation.easeInEaseOut();
        setExpandedId(expandedId === id ? null : id);
    };

    const renderItem = ({ item }:any) => (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.questionRow}
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.8}
            >
                <Text style={styles.question}>{item.question}</Text>
                {/* <Text style={styles.icon}>{expandedId === item.id ? "▲" : "▼"}</Text> */}
                <Image source={imageIndex.downRed} style={{height:22, width:22}} />
            </TouchableOpacity>
            {expandedId === item.id && (
                <Text style={styles.answer}>{item.answer}</Text>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Back button */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Image source={imageIndex.back} style={{height:25, width:25}}/>
            </TouchableOpacity>

            {/* Top Illustration */}
            <Image
                source={imageIndex.faq} // replace with your image path
                style={styles.banner}
                resizeMode="contain"
            />

            {/* Title & Subtitle */}
            <Text style={styles.title}>FAQ</Text>
            <Text style={styles.subtitle}>Most common question about our services</Text>

            {/* FAQ List */}
            <FlatList
                data={faqs}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
    },
    backBtn: {
        // marginTop: 10,
        // marginBottom: 10,
        // backgroundColor: "#f44",
        // borderRadius: 20,
        // padding: 8,
        // alignSelf: "flex-start",
    },
    backText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    banner: {
        width: "100%",
        height: 150,
        marginBottom: 15,
    },
    title: {
        fontSize: 26,
        
        textAlign: "center",
        marginTop: 10,
        color: "#000",
        fontFamily:fonts.bold
    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        color: "#777",
        marginBottom: 20,
        fontFamily:fonts.regular

    },
    card: {
        backgroundColor: "F4F8FF",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        // elevation: 2,
    },
    questionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    question: {
        fontSize: 14,
        color: color.primary,
        flex: 1,
        fontFamily:fonts.medium

    },
    answer: {
        fontSize: 14,
        color: "#555",
        marginTop: 8,
        lineHeight: 20,
    },
    icon: {
        fontSize: 16,
        color: color.primary,
        marginLeft: 10,
    },
});

export default FAQScreen;
