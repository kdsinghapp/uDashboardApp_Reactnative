import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../compoent/CustomButton';
import CustomHeader from '../../compoent/CustomHeader';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import { useNavigation } from '@react-navigation/native';
import { ChangePass_Api } from '../../Api/apiRequest';
import Loading from '../../utils/Loader';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChangePasswordScreen = () => {
    const navigation = useNavigation()
    const [isLoading, setLoading] = useState(false)
    const isLogin = useSelector((state: any) => state?.auth);

    const [oldpass, setOldPass] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const validatePasswords = () => {
        if (!oldpass) {
            setErrorMessage("Please enter your old password.");
        } else if (!password) {
            setErrorMessage("Please enter a new password.");
        } else if (password.length < 6) {
            setErrorMessage("New password must be at least 6 characters long.");
        } else if (!confirmPassword) {
            setErrorMessage("Please confirm your new password.");
        } else if (password !== confirmPassword) {
            setErrorMessage("New Password and Confirm Password do not match.");
        } else {
            setErrorMessage("");
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            // let data = {
            //     oldpassw: "1234567",
            //     password: "1234567",
            //     confirmPassword: "1234567"
            // }
            let data = {
                oldpassw: oldpass,
                password: password,
                confirmPassword: confirmPassword
            }

            // console.log("data", data)
            const response = await ChangePass_Api(data, isLogin.token, setLoading);

        } catch (error) {
        }
    }
    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            {isLoading ? <Loading /> : null}

            <StatusBarComponent />
            <View style={{ marginHorizontal: 12 }}>
                <CustomHeader />
            </View>
            <View style={{ marginHorizontal: 12, flex: 1 }}>
                <View style={{ marginTop: 35 }}>

                    <View style={styles.inputContainer}>
                        <Image source={imageIndex.lock} style={styles.image} />
                        <TextInput
                            placeholder="Old Password"
                            secureTextEntry={!passwordVisible}
                            style={styles.input}
                            // placeholderTextColor="#FF6F43"
                            value={oldpass}
                            onChangeText={setOldPass}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image source={imageIndex.lock} style={styles.image} />

                        <TextInput
                            placeholder="New Password"
                            secureTextEntry={!passwordVisible}
                            // placeholderTextColor="#FF6F43"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}

                        />

                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Image source={!passwordVisible ? imageIndex.eyeoff : imageIndex.eyeoff} style={styles.image} />

                        </TouchableOpacity>
                    </View>

                    {/* New Password */}


                    {/* Confirm Password */}
                    <View style={styles.inputContainer}>
                        <Image source={imageIndex.lock} style={styles.image} />
                        <TextInput
                            placeholder="Confirm Password"
                            secureTextEntry={!confirmPasswordVisible}
                            // placeholderTextColor="#FF6F43"
                            style={styles.input}

                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                            <Image source={!confirmPasswordVisible ? imageIndex.eyeoff : imageIndex.eyeoff} style={styles.image} />

                        </TouchableOpacity>
                    </View>
                </View>
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20 }}>
                    <CustomButton
                        title="Save"
                        onPress={() => validatePasswords()}
                    // buttonStyle={{
                    //     alignSelf: 'center',
                    //     width: "100%"
                    // }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',

    },
    errorText: {
        color: "red",
        marginBottom: 10,
        marginLeft: 5
    },

    image: { height: 22, width: 22 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F8F8',
        borderRadius: 40,
        paddingHorizontal: 10,
        marginBottom: 15,
        height: 60,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        // color: '#000',
    },

});

export default ChangePasswordScreen;
