import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image
} from 'react-native';
import CustomHeader from '../../compoent/CustomHeader';
import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../compoent/CustomButton';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import { Support_Api } from '../../Api/apiRequest';
    import Loading from '../../utils/Loader';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const HelpSupportScreen = () => {
    const navigation = useNavigation()
    const  [SupportHelp,setSupportHelp] = useState('')
    const  [isLoading,setLoading] = useState(false)
    const isLogin = useSelector((state: any) => state?.auth);

    const handleSubmit = async () => {
        if(!SupportHelp){
            navigation.goBack();
        } 
        else{
            try {
                const response = await Support_Api(SupportHelp, setLoading,isLogin?.userData?.id,navigation);
             } catch (error) {
             }
        }
      
      }
    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <StatusBarComponent />
            {isLoading ? <Loading /> : null}
            <View >

                <CustomHeader
                    imageProps={{
                        height: 22,
                        width: 22
                    }}
                    mainView={{
                        marginTop: 11,
                        marginHorizontal: 9, 
                        
                    }}
                    imageSource={imageIndex.menu} label="Help & Support" />

                <View style={{ marginHorizontal: 15, }}>
                    <View style={styles.illustrationContainer}>
                        {/* Replace this with your own illustration asset */}
                        <Image
                            source={imageIndex.helpPrva}
                            style={styles.illustration}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Text input for user’s query */}
                    <View style={{
                        borderWidth: 1,           // thickness of the border
                        borderColor: 'rgba(251, 91, 43, 1)',    // color of the border
                        borderRadius: 15,         // rounded corners
                        height: 140
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: 'rgba(251, 91, 43, 1)',
                            marginBottom: 8,
                            marginLeft: 10,
                            marginTop: 5,
                            fontWeight: "800"
                        }}>How can we help?</Text>
                        <TextInput
                        value={SupportHelp}
                        onChangeText={setSupportHelp}

                            style={{
                                fontSize: 12,
                                color: "black",
                                marginLeft: 10,
                                fontWeight: "500",
                                bottom: 10,
                                textAlignVertical: 'top', // Ensures text starts at the top in Android
                            }}
                            placeholder="Type Here..."
                            placeholderTextColor="rgba(84, 84, 84, 1)"
                            multiline
                        />
                    </View>

                    <View style={{
                        flex: 1, position: 'relative', top: 100,

                    }}>
                        <CustomButton
                            title="Submit"
                            onPress={()=>handleSubmit()}

                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HelpSupportScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: '#fff'
    },
    illustrationContainer: {
        marginTop: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustration: {
        width: '100%',
        height: 270,
    },
    input: {
        marginTop: 20,
        marginHorizontal: 16,
        padding: 55,
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 8,
        textAlignVertical: 'top', // Ensures multiline text starts at top
        fontSize: 16
    },
    submitButton: {
        marginTop: 20,
        marginHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: '#FF6B00',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    }
});
