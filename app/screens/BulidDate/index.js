import React, { useEffect, useRef, useState } from 'react';
import { Images } from '../../config/images';
import {
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import styles from './styles';
import CHeader from '../../components/CHeader';
import { BaseColors } from '../../config/theme';
import FIcon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { getApiDataProgress } from '../../utils/apiHelper';
import BaseSetting from '../../config/setting';
import * as Animatable from 'react-native-animatable';
import { useIsFocused } from '@react-navigation/native';
import AIcon from 'react-native-vector-icons/AntDesign';

const scaleOut = {
  0: { opacity: 1, scale: 1, },
  1: { opacity: 0, scale: 1.3 },
};

const BulidDate = ({ navigation, route }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  // console.log('accessToken----Build_date----', accessToken);
  const [loader, setLoader] = useState(true);
  const [pulses, setPulses] = useState([]);
  const [nbPulse, setNbPulse] = useState(3);
  const [duration, setDuration] = useState(3000);
  const [delay, setDelay] = useState(duration / nbPulse);
  const [rotationValue] = useState(new Animated.Value(0)); // Initialize the rotation value
  const isFocused = useIsFocused();
  // for Bell Animation 
  const rotateBellCurl = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotationValue, {
          toValue: -2, // Rotate by -1 radian (approximately -57.3 degrees)
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(rotationValue, {
          toValue: 2, // Rotate back to the original position
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    rotateBellCurl(); // Start the continuous animation on component mount
  }, []);


  // For Start Animation
  useEffect(() => {
    setDelay(duration / nbPulse);
  }, [duration, nbPulse]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulses((prevState) => {
        let pulse = {
          id: String(Date.now()),
          duration: duration,
        };
        let newState = [...prevState];
        if (newState.length >= nbPulse) {
          newState.shift(); // Remove the first element
        }
        newState.push(pulse);
        return newState;
      });
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, [delay]);

  // Api On Call Icon  
  // async function CallingApi() {
  //   setLoader(true);
  //   const header = {
  //     token: accessToken,
  //   };
  //   try {
  //     const response = await getApiDataProgress(
  //       `${BaseSetting.endpoints.findBlindTelepath}`,
  //       null,
  //       header,
  //       true
  //     );
  //     console.log("build date cmp----", response);
  //     if (response?.status === "success") {
  //       navigation.navigate('StartSwiping')
  //       setLoader(false);
  //       // setCardsList(response?.data);
  //     } else {
  //       setLoader(false);
  //     }
  //     //console.log("cardList====>", response?.data);
  //   } catch (error) {
  //     setLoader(false);
  //     //console.log('error =======>>>', error);
  //   }
  // }

  return (
    <>
      <ImageBackground source={require('../../assets/Images/backIMG.jpg')}
        style={styles.subView}>
        {
          isFocused &&
          <StatusBar
            backgroundColor={'#110f34'}
            barStyle="ligh-content"
            translucent
          />
        }
        <View style={{ flex: 1, marginTop: Dimensions.get('screen').height / 20, }}>
          <View style={{ marginTop: 20, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <AIcon name="left" size={25} color={BaseColors.white} style={{ textAlign: 'center' }} />
            </TouchableOpacity>
            <Text style={styles.headTxt}>Blind date</Text>
          </View>


          {/*bothview */}
          <View style={{ flex: 1, justifyContent: 'space-between', marginTop: Dimensions.get('screen').height / 10, paddingVertical: 15 }}>
            <View>
              <Image
                source={Images.img1}
                // source={selectedImage ? { uri: selectedImage } : require('../../assets/Images/01.jpg')}
                style={styles.avatar}
              />
              <Text style={styles.headingTxt}>Anonymous social sphere. Meet your spulmate</Text>
            </View>

            {/* btmView */}

            <View style={{ paddingHorizontal: 15, }}>
              <View style={styles.telepView}>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.Telptxt, { color: BaseColors.white }]}>
                      Telephone
                    </Text>
                    <View style={styles.text10X}>
                      <Text style={[styles.Telptxt, { color: BaseColors.plusingView_bg }]}>10X</Text>
                    </View>
                  </View>
                  <Text style={styles.Loremtxt}>
                  Anonymous social sphere.
                  </Text>

                  <TouchableOpacity onPress={() => navigation.navigate("StartSwiping")} style={styles.StartView}>
                    {pulses.map((item) => (
                      <Animatable.View
                        key={item.id}
                        duration={duration}
                        animation={scaleOut}
                        useNativeDriver={true}
                        style={styles.pulse}
                      />
                    ))}
                    <Text style={styles.plusingText}>Start</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <FIcon
                    onPress={() => navigation.navigate('VideoCall')}
                    style={{ fontSize: 50, color: BaseColors.white }} name="phone-call" />
                </View>


              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={[styles.teleSubpView, { backgroundColor: BaseColors.LoveLineClic_bg }]}>
                  <View style={{}}>
                    <Animated.Image
                      style={{
                        height: 70,
                        width: 70,
                        transform: [{
                          rotate: rotationValue.interpolate({
                            inputRange: [-2, 2],
                            outputRange: ['-60deg', '60deg'],
                          })
                        }],
                      }}
                      source={require('../../assets/Images/bellIMG.png')}
                    />
                  </View>
                  <View>
                    <Text style={styles.LoveClic}>
                      LoveLine
                    </Text>
                    <Text style={{ fontSize: 15, color: BaseColors.white }}>
                      Clic on
                    </Text>
                  </View>
                </View>
                <View style={[styles.teleSubpView, { backgroundColor: BaseColors.datingQuiz_bg }]}>
                  <View>
                    <MIcon size={45} name="robot-love" />
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('TodayTopic')}>
                      <Text style={styles.QuizTxt}>Dating Quiz</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {/*  */}

          </View>




        </View>
      </ImageBackground>
    </>




  );
};

export default BulidDate;