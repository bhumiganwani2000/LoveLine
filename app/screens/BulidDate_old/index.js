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
  Animated
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

  // for Bell Animation 
  const rotateBellCurl = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotationValue, {
          toValue: -2, // Rotate by -1 radian (approximately -57.3 degrees)
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(rotationValue, {
          toValue: 2, // Rotate back to the original position
          duration: 1000,
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
  async function CallingApi() {
    setLoader(true);
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
      console.log("build date cmp----", response);
      if (response?.status === "success") {
        navigation.navigate('StartSwiping')
        setLoader(false);
        // setCardsList(response?.data);
      } else {
        setLoader(false);
      }
      //console.log("cardList====>", response?.data);
    } catch (error) {
      setLoader(false);
      //console.log('error =======>>>', error);
    }
  }

  return (
    <>
      <View style={styles.mainView} >
        <CHeader
          leftIcon
          title="Blind date"
          onLeftIconClick={() => navigation.goBack()} />
        <View style={styles.container}>
          {/* <View style={styles.subView}> */}
          <ImageBackground
            style={styles.subView}
            source={require('../../assets/Images/backIMG.jpg')}
          >
            <View>
              <View style={{ padding: 5 }}>
                <Image
                  source={Images.img1}
                  // source={selectedImage ? { uri: selectedImage } : require('../../assets/Images/01.jpg')}
                  style={styles.avatar}
                />
                <Text style={styles.headingTxt}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
              </View>

              <View style={styles.telepView}>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.Telptxt}>
                      Telephone
                    </Text>
                    <View style={styles.text10X}>
                      <Text style={[styles.Telptxt, { color: BaseColors.plusingView }]}>10X</Text>
                    </View>
                  </View>
                  <Text style={styles.Loremtxt}>
                    Lorem Ipsum is simply dumm
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")} style={styles.StartView}>
                    {/* <Text style={styles.StartText}>Start</Text> */}
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
                    //  onPress={CallingApi}
                    onPress={() => navigation.navigate('VideoCall')}
                    style={{ fontSize: 50, color: BaseColors.white }} name="phone-call" />
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={[styles.teleSubpView, { backgroundColor: BaseColors.LoveLineClic_bg }]}>
                  <View style={{ justifyContent: 'center' }}>
                    {/* <MIcon style={{ fontSize: 35 }} name="bell-ring-outline" /> */}
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
                      source={require('../../assets/Images/bell.png')}
                    />
                  </View>
                  <View>
                    <Text style={styles.LoveClic}>
                      Love line Clic
                    </Text>
                    <Text style={styles.LoveClic}>
                      On
                    </Text>
                  </View>
                </View>
                <View style={[styles.teleSubpView, { backgroundColor: BaseColors.datingQuiz_bg }]}>
                  <MIcon style={{ fontSize: 35 }} name="robot-love" />
                  <TouchableOpacity onPress={() => navigation.navigate('TodayTopic')}>
                    <Text style={styles.QuizTxt}>Dating Quiz</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>


          {/* </View> */}
        </View>



      </View >
    </>

  );
};

export default BulidDate;