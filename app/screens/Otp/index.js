// import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, {useEffect, useRef, useState} from 'react';
import { Images } from '../../config/images';
import {
  StatusBar,
  View,
  Text,
  Animated,
  UIManager,
  LayoutAnimation,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
// import {useSelector} from 'react-redux';
import styles from './styles';
import {isArray, isEmpty, isNull} from 'lodash';
import CInput from '../../components/CInput';
import CountryInput from '../../components/CountryInput';
import { BaseColors } from '../../config/theme';
// import Icon from 'react-native-vector-icons/AntDesign';
import CButton from '../../components/CButton';
import { useDispatch, useSelector } from 'react-redux';
import authActions from '../../redux/reducers/auth/actions';
import OTPInputView from 'react-native-otp-textinput';
import BaseSetting from '../../config/setting';
import { getApiDataProgress } from '../../utils/apiHelper';
import Toast from 'react-native-toast-message'
import CHeader from '../../components/CHeader';


const Otp = ({navigation,route}) => {
  const signupData = route.params?.signUpData;
  const signNum = signupData?.contact_no;
  const screen = signupData?.screen;
  const forgotData= route.params?.forgotData;
  const forgotScreen=forgotData?.screen;
  const loginNum= forgotData?.num;

  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);
  const [timerCount, setTimer] = useState(60);

  useEffect(()=>{
    console.log("signupData==>",screen);
    console.log('forgotNum:', loginNum);
    console.log("forgotScreen",forgotScreen);

  },[])
  useEffect(() => {
    setTimer(60);
  }, []);
  useEffect(() => {
    setTimer(60);
  }, []);

  useEffect(() => {
    if (timerCount === 0) {
      //   setResendViewVisible(true);
      //   ReSendOTP();
    }

    if (!timerCount) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimer(timerCount - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerCount]);
 
  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

// API for resendOtpAPI
async function resendOtpAPI() {
  // resendLoader(true);
  const data = {
    contact_no:forgotScreen === "forgot"? loginNum  : signNum,
  };
  try {
    const response = await getApiDataProgress(
      `${BaseSetting.endpoints.resendOtp}`,
      data,
      {},
      true
    );
    console.log("res====>",response);
    if (response?.status === "success") {
      Toast.show({
        type: 'success',
        text1: 'OTP resend successfully.',
        position: 'bottom',
      });
    } else {
      setOtp('')
      //  resendLoader(false);
    }
  } catch (error) {
    setOtp('');
    // resendLoader(false);
    console.log('error =======>>>', error);
  }
}

// API for otpVerify
  async function otpVerify() {
    setLoader(true);
    const data = {
      otp: otp,
    };
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.otpVerify}`,
        data,
        {},
        true
      );
      console.log("res====>",response);
      if (response?.status === "success") {
        setLoader(false);
        const conNum = {
          contactNum:signupData?.contact_no,
          screen:signupData?.screen,
        }
        const LoginData ={
          num:loginNum,
        }
        console.log("--->",conNum);
        Toast.show({
          type: 'success',
          text1: "success",
          text2: response?.message || "otp verify successfully",
          position: 'Top',
        })
        setOtp('');
        setTimeout(() => {          
          if(forgotScreen === "forgot"){
            console.log(">>>Forgot")
            navigation.navigate("ChangePassword",{loginNum:LoginData});
          } else{
            console.log(">>>Signup")
            navigation.navigate("Password",{contactNum:conNum});
          }
        }, 3000);
      
      } else {
         setLoader(false);
         Toast.show({
          type: 'error',
          text1: response.message || 'otp is wrong, please try again',
          position: 'Top',
        })
        console.log('error =======>>>');
      }
    } catch (error) {
      setLoader(false);
      console.log('error =======>>>', error);
    }
  }


  // const countryCode = country?.code;
  return (
    <>
     <View style={{ flex: 1 }}  >
     <CHeader 
             leftIcon
            //  title="Bank Detail"
             onLeftIconClick={() => navigation.goBack()}/>
     <Toast/> 
          <StatusBar 
          backgroundColor={BaseColors.bgColor}
          barStyle="light-content" 
          translucent
            />
              <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.uprView}  >
                    <Text style={styles.headingTxt} >Enter Your OTP</Text>
                    <Text style={styles.subHeading} >Lorem ipsum dolor sit amet, consectetur</Text>
                    <View style={styles.subView}>
                    
              <View style={styles.inputStyl}>
                <OTPInputView
                  handleTextChange={handleOtpChange}
                  inputCount={6}
                  tintColor={BaseColors.secondary}
                  offTintColor={BaseColors.borderColor}
                  containerStyle={styles.otpContainer}
                  textInputStyle={styles.otpInput}
                  />
                  <View style={styles.resendView}>
                  <Text style={styles.btmTxt}>Didn’t receive OTP?
                 {' '}<Text  onPress={()=>resendOtpAPI()} style={[styles.btmTxt,{color:BaseColors.secondary}]}>  {`Resend 00:${
                    timerCount < 10 ? `0${timerCount}` : timerCount
                  }`}</Text> 
                 </Text>

                 
                  </View>
                   
                    <CButton
                     loading={loader}
                     btnTitle={"Verify & Continue"} 
                     onPress={()=>otpVerify()}
                    //  onPress={()=>navigation.navigate("ChangePassword")}
                    />        
                  </View>
                </View>
                </View>
                </SafeAreaView>
                <View style={styles.btmView}>
                 <Text style={styles.btmTxt}>Already have an account? 
                 {' '}<Text  onPress={()=>navigation.navigate("Login")} style={[styles.btmTxt,{color:BaseColors.secondary}]}>Login</Text> 
                 </Text>
                 </View>
     </View>
    </>
   
  );
};

export default Otp;
