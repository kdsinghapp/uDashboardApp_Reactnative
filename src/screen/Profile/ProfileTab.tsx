import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import imageIndex from "../../assets/imageIndex";
import ScreenNameEnum from "../../routes/screenName.enum";
import { logout } from "../../redux/feature/authSlice";
import LogoutModal from "../../compoent/LogoutModal";
import { color, fonts } from "../../constant";
import CustomHeader from "../../compoent/CustomHeader";

// Sample data (use local icons/images in ./assets/)
const menuItems = [
    // { id: "1", title: "Orders History", icon: imageIndex.order, screen: ScreenNameEnum.OrederList },
    // { id: "2", title: "Coupon", icon: imageIndex.coupon, },
    // { id: "3", title: "Addresses", icon: imageIndex.addressCircle, screen: ScreenNameEnum.AddressProfile },
    { id: "7", title: "Change Password", icon: imageIndex.lock, screen: ScreenNameEnum.ChangePasswordScreen },
    // { id: "9", title: "Terms of service", icon: imageIndex.service, screen: ScreenNameEnum.About },
    // { id: "11", title: "Notification", icon: imageIndex.costomerService, screen: ScreenNameEnum.NotificationsSetting },
    // { id: "13", title: "Privacy policy", icon: imageIndex.lockCircle, screen: ScreenNameEnum.Policy },
    // { id: "14", title: "Log out", icon: imageIndex.logout },
];

const ProfileScreen = () => {
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const isLogin = useSelector((state: any) => state?.auth?.userData
);
    console.log(isLogin)
    const handleLogout = () => {
        dispatch(logout());


        navigation.replace(ScreenNameEnum.LoginScreen);
        // successToast(localizationStrings.logoutSuccess);
        setVisible(false)
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => item?.screen ? navigation.navigate(item.screen) :
            item.title == "Log out" ? setVisible(true) : null

        }>
            <Image source={item.icon} style={styles.icon} resizeMode="contain" />
            <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
         <View style={{   marginHorizontal:12 }}>
              <CustomHeader />
            </View>
            {/* Profile Info */}
            <View style={styles.profileContainer}>
                <Image
                    source={imageIndex.dummy} // your local profile image
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.name}>{isLogin?.first_name + ' ' + isLogin?.last_name}</Text>
                    <Text style={styles.subtitle}>{isLogin?.email}</Text>
                </View>
                <TouchableOpacity style={styles.updateBtn} onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)}>
                    <Text style={styles.updateText} >Update</Text>
                </TouchableOpacity>
            </View>

            {/* Menu Grid */}
            <View style={styles.listContainer}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    numColumns={3}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
            <LogoutModal
                visible={visible}
                onClose={() => setVisible(false)}
                onConfirm={() => handleLogout()}
            />
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 16,
        color: "#000",
        paddingHorizontal: 16
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        paddingHorizontal: 16

        // elevation: 3,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    name: {
        fontSize: 16,
        fontFamily: fonts.bold,
        color: color.primary,
    },
    subtitle: {
        fontSize: 13,
        color: "#777",
        fontFamily: fonts.medium,

    },
    updateBtn: {
        marginLeft: "auto",
        backgroundColor: color.primary,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    updateText: {
        color: "#fff",
        fontFamily: fonts.medium,

    },
    listContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        // elevation: 2,
    },
    flatListContent: {
        alignItems: "center",

    },
    card: {
        width: "30%",
        margin: "1.5%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 8,
    },
    cardText: {
        fontSize: 12,
        textAlign: "center",
        color: "#000",
        fontFamily: fonts.regular,

    },
});
