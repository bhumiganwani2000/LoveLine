// import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, { useEffect, useRef, useState } from 'react';
import { Images } from '../../config/images';
import {
    StatusBar,
    View,
    Text,
    ScrollView,
    UIManager,
    LayoutAnimation,
    Image,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import styles from './styles';
import { isArray, isEmpty, isNull } from 'lodash';
import { BaseColors } from '../../config/theme';
import CHeader from '../../components/CHeader';
import AIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import CButton from '../../components/CButton';
import BaseSetting from '../../config/setting';
import {useSelector} from 'react-redux';
import { getApiDataProgress } from '../../utils/apiHelper';
// import Icon from 'react-native-vector-icons/AntDesign';


const Settings = ({ navigation, route }) => {
    const iconSize = 24;
    const iconColor = BaseColors.black;
    const accessToken = useSelector(state => state.auth.accessToken);
    const [cmsPages,setCmsPages] = useState({});

    useEffect(()=>{
        CmsPagesAPI()
    },[])

      // API for CmsPagesAPI
      async function CmsPagesAPI() {
        const header = {
            token: accessToken,
        };
        try {
            const response = await getApiDataProgress(
                `${BaseSetting.endpoints.cmsPages}`,
                null,
                header,
                true
            );
            console.log("res====>", response);
            if (response?.status) {
                setCmsPages(response?.data);
                console.log("status====>", response?.status);
            } else {
                console.log('erro>>Something went wrong');
            }
        } catch (error) {
            console.log('error =======>>>', error);
        }
    }
    const listItems = [
        {
            id: 1,
            title: 'Feedback',
            icon: <MIcon name="feedback" size={iconSize} color={iconColor} />,
            navto: 'Feedback',
        },
        {
            id: 2,
            title: 'Help',
            icon: <FIcon name="customerservice" size={iconSize} color={iconColor} />,
            navto: 'Help',
        },
        {
            id: 3,
            title: 'Notification',
            icon: <AIcon name="bells" size={iconSize} color={iconColor} />,
            navto: 'Notification',

        },
        {
            id: 4,
            title: 'Privacy Policy',
            icon: <MIcon name="privacy-tip" size={iconSize} color={iconColor} />,
            navto: 'PrivacyPolicy',

        },
        {
            id: 5,
            title: 'Terms of service',
            icon: <AIcon name="idcard" size={iconSize} color={iconColor} />,
            navto: 'TermsofService',

        },
    ];

    return (
        <>
            <View style={styles.mainView} >
                <View style={styles.container}>
                    <CHeader
                        leftIcon
                         title="My profile"
                        onLeftIconClick={() => navigation.goBack()} />
                    <View style={styles.subView}>
                        <Text style={styles.heading}>Settings</Text>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: .20 }}>
                            <View style={styles.listView}>
                                {listItems.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={0.3}
                                            style={styles.navItem}
                                            onPress={() => {
                                                // if (index === 2) {
                                                //   setConfirm(true);
                                                // } else {
                                                navigation.navigate(item.navto);
                                                // }
                                            }} key={'settings'+index}>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <View style={styles.icons}>{item.icon}</View>
                                                    <Text style={styles.navItemText}>{item.title}</Text>
                                                </View>
                                                <View style={styles.icons}><AIcon name="caretright" size={iconSize} color={BaseColors.iconColor} /></View>
                                            </View>
                                        </TouchableOpacity>

                                    );
                                })}
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </View>
        </>

    );
};

export default Settings;
