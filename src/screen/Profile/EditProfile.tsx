import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../assets/imageIndex";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import CustomHeader from "../../compoent/CustomHeader";
import TextInputField from "../../utils/TextInputField";
import CustomButton from "../../compoent/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import ImagePickerModal from "../../compoent/ImagePickerModal";
import { EditProfile_Api } from "../../Api/apiRequest";
import LoadingModal from "../../utils/Loader";
import { useNavigation } from "@react-navigation/native";

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState<any>("");
  const isLogins = useSelector((state: any) => state?.feature?.userGetData);
  const isLogin = useSelector((state: any) => state?.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setFullName(isLogins?.user_name?.toString());
    setEmail(isLogins?.email);
  }, []);

  const pickImageFromGallery = () => {
    ImagePicker.openPicker({ width: 300, height: 400 })
      .then((image: any) => {
        setImage(image);
        setIsModalVisible(false);
      })
      .catch((error) => console.log(error));
  };

  const takePhotoFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({ width: 300, height: 400 });
      setImage(image);
      setIsModalVisible(false);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const params = {
        name: fullName,
        images: image,
        userId: isLogin?.userData?.id,
      };
      await EditProfile_Api(params, setLoading, navigation);
    } catch (error) {}
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />
      {isLoading && <LoadingModal />}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
             showsVerticalScrollIndicator={false}
          >
            <View style={{   marginHorizontal:12 }}>
              <CustomHeader />
            </View>

            <View style={styles.container}>
              <View style={styles.profileContainer}>
                <Image
                  source={image?.path ? { uri: image.path } : imageIndex.dummy}
                  style={styles.profileImage}
                  resizeMode="cover"
                />

                <TouchableOpacity
                  style={styles.editIcon}
                  onPress={() => setIsModalVisible(true)}
                >
                  <Image
                    source={imageIndex.edit}
                    style={{ height: 35, width: 35 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 45, width: "90%" }}>
                <TextInputField
                  placeholder={"Full Name"}
                  text={fullName}
                  onChangeText={setFullName}
                />
                <TextInputField
                  placeholder={"Phone Number"}
                  type="decimal-pad"
                  text={fullName}
                  onChangeText={setFullName}
                />
                <TextInputField
                  placeholder={"Email"}
                  text={email}
                  onChangeText={setEmail}
                  editable={false}
                />
                <CustomButton
                  title="Update"
                  onPress={handleSubmit}
                  style={{ marginTop: 45, width: "100%" }}
                />
              </View>
            </View>

            <ImagePickerModal
              modalVisible={isModalVisible}
              setModalVisible={setIsModalVisible}
              pickImageFromGallery={pickImageFromGallery}
              takePhotoFromCamera={takePhotoFromCamera}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", alignItems: "center" },
  profileContainer: { alignItems: "center", marginTop: 20 },
  profileImage: { width: 130, height: 130, borderRadius: 65 },
  editIcon: { position: "absolute", bottom: 0, right: 0, padding: 7, borderRadius: 15 },
});

export default EditProfile;
