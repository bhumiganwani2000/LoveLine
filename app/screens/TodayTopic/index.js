import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import styles from './styles';
import { BaseColors } from '../../config/theme';
import CButton from '../../components/CButton';
import { useSelector } from 'react-redux';
import BaseSetting from '../../config/setting';
import Toast from 'react-native-toast-message'
import CHeader from '../../components/CHeader';
import { getApiDataProgress } from '../../utils/apiHelper';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';

const TodayTopic = ({ navigation, route }) => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [selectedOption, setSelectedOption] = useState(null);
    const [getData, setGetData] = useState();
    const [validationError, setValidationError] = useState(false);
    const [pageLoader, setPageLoader] = useState(true);

    const isFocused = useIsFocused();

    useEffect(() => {
        quistionApi();
    }, [isFocused]);

    // Quistion APi
    async function quistionApi() {
        setPageLoader(true);
        const header = {
            token: accessToken,
        };
        try {
            const response = await getApiDataProgress(
                `${BaseSetting.endpoints.getQuizQuestion}`,
                null,
                header,
                true
            );
            console.log("res====>", response?.data);
            if (response?.status === "success") {
                setPageLoader(false);
                setGetData(response?.data)
            } else {
                setPageLoader(false);
                console.log('error>>Something went wrong');
            }
        } catch (error) {
            setPageLoader(false);
            console.log('error =======>>>', error);
        }
    };

    const handleCheck = (option) => {
        setSelectedOption(option);
        setValidationError(false);
    };

    // Answer APi
    async function continueClick() {
        if (selectedOption === null) {
            setValidationError(true);
            return;
        }
        const data = {
            questionId: getData?._id,
            userAnswer: selectedOption,
        }
        const header = {
            token: accessToken,
        };
        try {
            const response = await getApiDataProgress(
                `${BaseSetting.endpoints.answerQuizQuestion}`,
                data,
                header,
                true
            );
            console.log("res==Ans==>", response?.data);
            if (response?.status) {
                setGetData(response?.data)
                navigation.navigate('StartSwiping')
            } else {
                console.log('error>>Something went wrong');
            }
        } catch (error) {
            console.log('error =======>>>', error);
        }
    };

    return (
        <>
            <View style={styles.mainCantainer}>
                <CHeader
                    leftIcon
                    onLeftIconClick={() => navigation.goBack()}
                />
                <Toast />
                <StatusBar
                    backgroundColor={BaseColors.bgColor}
                    barStyle="light-content"
                    translucent
                />

                <>
                    {pageLoader ? (
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator
                                size="large"
                                color={BaseColors.secondary}
                            />
                        </View>
                    ) : (
                        <SafeAreaView style={{ flex: 1 }}>
                            <View style={styles.uprView}>
                                <View style={styles.subView}>
                                    <Text style={styles.hedingTxt}>Today topic</Text>
                                    <Text style={styles.questionTxt}>{getData?.question}</Text>
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <TouchableOpacity
                                        style={styles.listView}
                                        onPress={() => handleCheck('option1')}
                                    >
                                        <Text style={{ fontSize: 20, left: 10, fontWeight: 'bold', color: BaseColors.black }}>
                                            {getData?.option1}
                                        </Text>
                                        {selectedOption === 'option1' && (
                                            <MIcon style={{ fontSize: 25, color: BaseColors.darkPink }} name="check-box" />
                                        )}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.listView}
                                        onPress={() => handleCheck('option2')}
                                    >
                                        <Text style={{ fontSize: 20, left: 10, fontWeight: 'bold', color: BaseColors.black }}>
                                            {getData?.option2}
                                        </Text>
                                        {selectedOption === 'option2' && (
                                            <MIcon style={{ fontSize: 25, color: BaseColors.darkPink }} name="check-box" />
                                        )}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.listView}
                                        onPress={() => handleCheck('option3')}
                                    >
                                        <Text style={{ fontSize: 20, left: 10, fontWeight: 'bold', color: BaseColors.black }}>
                                            {getData?.option3}
                                        </Text>
                                        {selectedOption === 'option3' && (
                                            <MIcon style={{ fontSize: 25, color: BaseColors.darkPink }} name="check-box" />
                                        )}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.listView}
                                        onPress={() => handleCheck('option4')}
                                    >
                                        <Text style={{ fontSize: 20, left: 10, fontWeight: 'bold', color: BaseColors.black }}>
                                            {getData?.option4}
                                        </Text>
                                        {selectedOption === 'option4' && (
                                            <MIcon style={{ fontSize: 25, color: BaseColors.darkPink }} name="check-box" />
                                        )}
                                    </TouchableOpacity>
                                    {validationError && (
                                        <Text style={styles.validationErrorText}>Please select right answer</Text>
                                    )}
                                </View>
                            </View>
                        </SafeAreaView>
                    )}
                </>

                <View style={styles.btmView}>
                    <CButton
                        btnTitle={"Continue"}
                        onPress={() => continueClick()}
                    />
                </View>
            </View>
        </>
    );
};

export default TodayTopic;