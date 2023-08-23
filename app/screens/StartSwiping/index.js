// import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, { useEffect, useRef, useState } from 'react';
import { Images } from '../../config/images';
import {
    StatusBar,
    View,
    Text,
    Animated,
    UIManager,
    LayoutAnimation,
    Image,
    Easing,
} from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import BaseSetting from '../../config/setting';
import { getApiDataProgress } from '../../utils/apiHelper';
import Toast from 'react-native-toast-message'

// import {useSelector} from 'react-redux';
// import {useSelector} from 'react-redux';
// import localStorage from 'redux-persist/es/storage';

const StartSwiping = ({ navigation }) => {
    const accessToken = useSelector(state => state.auth.accessToken);
    console.log('accessToken----Build_date----', accessToken);
    const rotationValue = useRef(new Animated.Value(0)).current;
    const rotationValue1 = useRef(new Animated.Value(0)).current;
    const [callingData,setCallingData] = useState(null);

    useEffect(()=>{
        findTelepathAPI();
    },[]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         navigation.navigate('VideoCall');
    //     }, 2500)
    // }, []);
  // Api On Call Icon  
  async function findTelepathAPI() {
    // setLoader(true);
    const header = {
      token: accessToken,
    };
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.findBlindTelepath}`,
        null,
        header,
        true
      );
      console.log("build date cmp----", response?.data);
      if (response?.status === "success") {
        setCallingData(response?.data);
        setTimeout(() => {
            navigation.navigate('VideoCall',{d:response?.data})
        }, 3000)
      } else {
        Toast.show({
            type: 'error',
            text1: `${response.message}`,
            position: 'Top',
          });
        // setLoader(false);
      }
      //console.log("cardList====>", response?.data);
    } catch (error) {
    //   setLoader(false);
      console.log('error =======>>>', error);
    }
  }



    useEffect(() => {
        const rotateAnimation = Animated.loop(
            Animated.timing(rotationValue, {
                toValue: 1,
                duration: 7000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        rotateAnimation.start();
        return () => {
            rotateAnimation.stop();
        };

    }, [rotationValue]);

    useEffect(() => {
        const rotateAnimation1 = Animated.loop(
            Animated.timing(rotationValue1, {
                toValue: -1,
                duration: 7000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        rotateAnimation1.start();
        return () => {
            rotateAnimation1.stop();
        };

    }, [rotationValue1]);
    const rotateInterpolation = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const rotateInterpolation1 = rotationValue1.interpolate({
        inputRange: [0, 1],
        outputRange: ["-360deg", "0deg"],
    });
    return (
        <>
            <StatusBar
                backgroundColor={'transparent'}
                barStyle="dark-content"
                translucent
            />
            <View style={styles.mainView}>
            <Toast />
                <View style={styles.animationView}>
                    <View style={styles.secView}>
                        <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative', transform: [{ rotate: rotateInterpolation }] }}>
                            <Animated.Image style={{ height: 350, width: 350, }} source={Images.animationBorder} />
                            <View style={styles.animatiInside}>
                                <Image style={{ height: 280, width: 280 }} source={Images.animationRound} />
                                <Animated.View style={{ position: 'absolute', transform: [{ rotate: rotateInterpolation1 }] }}>
                                    <Image style={{ height: 110, width: 110 }} source={Images.centerImg2} />
                                </Animated.View>
                                <Animated.View style={{ right: 0, top: -10, position: 'absolute', transform: [{ rotate: rotateInterpolation1 }] }}>
                                    <Image source={Images.roundH} />
                                </Animated.View>

                                <Animated.View style={{ right: 20, bottom: 20, position: 'absolute', transform: [{ rotate: rotateInterpolation1 }] }}>
                                    <Image source={Images.roundG} />
                                </Animated.View>

                                <Animated.View style={{ left: 20, top: 20, position: 'absolute', transform: [{ rotate: rotateInterpolation1 }] }}>
                                    <Image source={Images.roundF} />
                                </Animated.View>

                                <Animated.View style={{ left: -15, bottom: 10, position: 'absolute', transform: [{ rotate: rotateInterpolation1 }] }}>
                                    <Image source={Images.roundE} />
                                </Animated.View>
                            </View>

                        </Animated.View>

                    </View>

                    <View>
                    </View>

                </View>
                {/* <Text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                </Text> */}
            </View>

        </>
    );
};

export default StartSwiping;

