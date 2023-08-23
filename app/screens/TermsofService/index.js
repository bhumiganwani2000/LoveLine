import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { WebView } from "react-native-webview";
import { getApiDataProgress } from '../../utils/apiHelper';
import { useDispatch, useSelector } from 'react-redux';
import BaseSetting from '../../config/setting';
import CHeader from '../../components/CHeader';
import styles from './styles';
import { isEmpty } from 'lodash';
import { BaseColors } from '../../config/theme';

const TermsofService = ({ navigation, route }) => {
    const [termsPages, setTermsPages] = useState('');
    const [pageLoader, setpageLoader] = useState(false);
    const accessToken = useSelector(state => state.auth.accessToken);
    const { width } = useWindowDimensions();

    useEffect(() => {
        getCMsPagesAPI();
    }, [])



    // API for getCMsPagesAPI
    async function getCMsPagesAPI() {
        setpageLoader(true);
        const data = {
            type: "Terms of service",
        };
        const header = {
            token: accessToken,
        };
        try {
            const response = await getApiDataProgress(
                `${BaseSetting.endpoints.getSingleCMSPages}`,
                data,
                header,
                true
            );
            console.log("res====>", response);
            if (response?.status === "success") {
                setpageLoader(false);
                setTermsPages(response?.data?.content)
            } else {
                setpageLoader(false);
                console.log('erro>>Something went wrong');
            }
        } catch (error) {
            setpageLoader(false);
            console.log('error =======>>>', error);
        }
    }

    // this function for render loader
    function renderLoader() {
        return (
            <View style={styles.loaderView}>
                <ActivityIndicator size="large" color={BaseColors.secondary} />
            </View>
        );
    }


    return (
        <View style={styles.mainView}>
            <CHeader
                leftIcon
                title="Terms of service"
                onLeftIconClick={() => navigation.goBack()}
            />
            <View style={styles.container}>
                <View style={styles.subView}>
                    {pageLoader ? renderLoader() : null}
                    {!isEmpty(termsPages) ? (
                        <RenderHtml
                            contentWidth={width}
                            source={{ html: termsPages }}
                        />
                    ) : (
                        isEmpty(termsPages) &&
                        !pageLoader && (
                            <View style={styles.loaderView}>
                                <Text style={styles.emptyListTxt}>No Data Found</Text>
                            </View>
                        )
                    )}
                </View>
            </View>
        </View>
    );
}
export default TermsofService;
