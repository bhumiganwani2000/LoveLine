// import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, { useEffect, useState } from 'react';
import { Images } from '../../config/images';
import {
    StatusBar,
    View,
    Text,
    Image,
} from 'react-native';
import styles from './styles';
import AIcon from 'react-native-vector-icons/AntDesign';
import CButton from '../../components/CButton';
import BaseSetting from '../../config/setting';
import { useSelector } from 'react-redux';
import { getApiDataProgress } from '../../utils/apiHelper';
import { BaseColors } from '../../config/theme';




const StartChatting = ({ navigation }) => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [getData, setGetData] = useState('');

    useEffect(() => {
        findQuizApi();
    }, []);

    // Call Api findQuizTelepath
    async function findQuizApi() {
        // setPageLoader(true);
        const header = {
            token: accessToken,
        };
        try {
            const response = await getApiDataProgress(
                `${BaseSetting.endpoints.findQuizTelepath}`,
                null,
                header,
                true
            );
            console.log("res==--==>", response?.data);
            if (response?.status) {
                // setPageLoader(false);
                setGetData(response?.data)
            } else {
                // setPageLoader(false);
                console.log('error>>Something went wrong');
            }
        } catch (error) {
            // setPageLoader(false);
            console.log('error =======>>>', error);
        }
    };

    return (
        <>
            <StatusBar
                backgroundColor={'transparent'}
                barStyle="dark-content"
                translucent
            />
            <View style={styles.mainView}>
                <View style={styles.subView}>
                    <Image source={Images.girlProfile} />
                    <View style={styles.rowView}>
                        <View style={styles.ageMainView}>
                            <View style={styles.ageView}>
                                <AIcon style={{ fontSize: 15, color: BaseColors.black }} name="woman" />
                            </View>
                            <View style={styles.ageView}>
                                <Text style={styles.namText}>{getData?.age}</Text>
                            </View>
                        </View>
                        <View style={styles.ageMainView}>
                            <View style={styles.ageView}>
                                <AIcon style={{ fontSize: 15, color: BaseColors.black }} name="user" />
                            </View>
                            <View style={styles.ageView}>
                                <Text style={styles.namText}>{getData.username}</Text>
                            </View>
                        </View>
                    </View>
                    {/* <View style={styles.texView}>
                        <View style={styles.iconView}>
                            <AIcon name="caretdown" size={25} style={{
                                // borderWidth: .7,
                                // borderColor: BaseColors.secondary,
                            }} color={BaseColors.lightPinkBTN} />
                        </View>
                        <Text style={styles.text}>
                            Lorem Ipsum is simply dummy text of the
                        </Text>
                    </View> */}
                    <View style={styles.container}>
                        <View style={styles.arrow} />
                        <View style={styles.messageBox}>
                            <Text style={styles.messageText}>This is a message box with arrow</Text>
                        </View>
                    </View>
                    <View style={styles.btnView}>
                        <CButton
                            onPress={() => navigation.navigate('ChatScreen')}
                            btnTitle="Start Chatting"
                            containerStyle={{ paddingHorizontal: 50 }}
                        />
                    </View>


                </View>
            </View>

        </>
    );
};
export default StartChatting;

