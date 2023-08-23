import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
} from 'react-native';
import styles from './styles';
import CHeader from '../../components/CHeader';
import ToggleSwitch from 'toggle-switch-react-native';
import { BaseColors } from '../../config/theme';
import AIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import BaseSetting from '../../config/setting';
import { getApiDataProgress } from '../../utils/apiHelper';
import AuthAction from '../../redux/reducers/auth/actions';
import { useDispatch, useSelector } from 'react-redux';



const Notification = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { setNotification } = AuthAction;
    const accessToken = useSelector(state => state.auth.accessToken);
    const notification = useSelector(state => state.auth.notification);
    // console.log('setNotification----', notification);


    // useEffect(() => {
    //     updateNotificationAPI();
    // }, [updateData])

    const iconSize = 24;
    const iconColor = BaseColors.black;


    const [updateData, setUpdateData] = useState({
        allowPushNotification: notification?.allowPushNotification,
        messageNotification: notification?.messageNotification,
        friendRequestNotification: notification?.friendRequestNotification,
        locationNotification:  notification?.locationNotification,
    })

    const [toggles, setToggles] = useState([
        {
            id: 1,
            icon: <AIcon name="bells" size={iconSize} color={iconColor} />,
            label: 'Allow Push Notification',
            isOn: updateData?.allowPushNotification,
        },
        {
            id: 2,
            icon: <AIcon name="message1" size={iconSize} color={iconColor} />,
            label: 'Message Notifications',
            isOn: updateData?.messageNotification,
        },
        {
            id: 3,
            icon: <AIcon name="contacts" size={iconSize} color={iconColor} />,
            label: 'Friend Request Notification',
            isOn: updateData?.friendRequestNotification,
        },
        {
            id: 4,
            icon: <EIcon name="location" size={iconSize} color={iconColor} />,
            label: 'Location',
            isOn: updateData?.locationNotification,
        },
    ]);

    const handleToggle = (id) => {
        console.log('id ', typeof id)
        if (id === 1) {
            let dataVals = { ...updateData }
            dataVals.allowPushNotification = !updateData.allowPushNotification
            setUpdateData(dataVals)
        }
        if (id === 2) {
            let dataVals = { ...updateData }
            dataVals.messageNotification = !updateData.messageNotification
            setUpdateData(dataVals)
        }
        if (id === 3) {
            let dataVals = { ...updateData }
            dataVals.friendRequestNotification = !updateData.friendRequestNotification
            setUpdateData(dataVals)
        }
        if (id === 4) {
            let dataVals = { ...updateData }
            dataVals.locationNotification = !updateData.locationNotification
            setUpdateData(dataVals)
        }
        setToggles((prevToggles) =>
            prevToggles.map((toggle) =>
                toggle.id === id ? { ...toggle, isOn: !toggle.isOn } : toggle
            )
        );
    };

    useEffect(() => {
        console.log("When updates data ", updateData)
    }, [updateData])

    // API for updateNotificationAPI
    async function updateNotificationAPI() {
        const data = {
            allowPushNotification: updateData?.allowPushNotification,
            messageNotification: updateData?.messageNotification,
            friendRequestNotification: updateData?.friendRequestNotification,
            locationNotification: updateData?.locationNotification,
        };
        const header = {
            token: accessToken,
        };
        try {
            const response = await getApiDataProgress(
                `${BaseSetting.endpoints.updateNotification}`,
                data,
                header,
                true
            );
            console.log("res====>", response);
            if (response?.status === "success") {
                dispatch(setNotification(response?.data));
                console.log("status====>", response?.status);
            } else {
                console.log('erro>>Something went wrong');
            }
        } catch (error) {
            console.log('error =======>>>', error);
        }
    }

    return (
        <>
            <View style={styles.mainView} >
                <View style={styles.container}>
                    <CHeader
                        leftIcon
                        // title="My Profile"
                        headingwithbtn
                        headerTitle="My Profile"
                        rightBtnTitle="Save"
                       rightBtnPress={()=> updateNotificationAPI()}
                        onLeftIconClick={() => navigation.goBack()} />
                    <View style={styles.subView}>
                        <Text style={styles.heading}>Notification</Text>
                        {/* Toggle */}
                        <View style={styles.subHeading}>
                            <Text>General</Text>
                        </View>
                        <View>
                            {toggles.map((toggle) => (
                                <View style={styles.togaalMainView} key={toggle.id}>
                                    <View style={styles.togaalInView}>
                                        <View style={styles.icons}>{toggle?.icon}</View>
                                        <Text style={[styles.nameOfList, { paddingVertical: 10, left: 10 }]}>
                                            {toggle?.label}
                                        </Text>
                                    </View>
                                    <ToggleSwitch
                                        key={toggle.id}

                                        isOn={toggle?.isOn}
                                        onToggle={() => {
                                            handleToggle(toggle.id);
                                        }}
                                        onColor={BaseColors.labelColor}

                                        thumbOnStyle={{
                                            backgroundColor: BaseColors.white,
                                            marginRight: 15,
                                        }}
                                        thumbOffStyle={{
                                            backgroundColor: BaseColors.white,
                                            marginRight: 15,
                                        }}
                                        trackOnStyle={{
                                            borderWidth: 1,
                                            backgroundColor: BaseColors.green,
                                            borderColor: '#ecf0f1',
                                            marginRight: 15,
                                        }}
                                        trackOffStyle={{
                                            borderWidth: 1,
                                            backgroundColor: BaseColors.inputColor,
                                            borderColor: '#ecf0f1',
                                            marginRight: 15,
                                        }}
                                        size="medium"

                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </>

    );
};

export default Notification;
