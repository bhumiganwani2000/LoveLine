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
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import styles from './styles';
import { isArray, isEmpty, isNull } from 'lodash';
import CInput from '../../components/CInput';
import { BaseColors } from '../../config/theme';
import CButton from '../../components/CButton';
import AuthAction from '../../redux/reducers/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import BaseSetting from '../../config/setting';
import { getApiDataProgress } from '../../utils/apiHelper';
import Toast from 'react-native-toast-message'
import CHeader from '../../components/CHeader';
import messaging from '@react-native-firebase/messaging';

const Password = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrText, setPasswordErrText] = useState('');
  const [loader, setLoader] = useState(false);
  const contactNum = route?.params?.contactNum;
  const loginData = route?.params?.lData;
  //Login number
  const LoginNum = loginData?.loginNum;
  const screen = contactNum?.screen;
  const loginScreen = loginData?.screen?.forgotScreen;
  const dispatch = useDispatch();
  const { setAccessToken, setUserData } = AuthAction;
  const [pushToken, setPushToken] = useState('');
  console.log(pushToken);

  useEffect(() => {
    console.log("LoginNum==>", LoginNum);
    console.log("Signupscreen==>", contactNum?.contactNum);
    console.log("Login===>", loginScreen);
  }, [])

  // For Push Notification Token
  useEffect(() => {
    getTokenPush();
  }, []);
  const getTokenPush = async () => {
    const pushNtfnToken = await messaging().getToken();
    setPushToken(pushNtfnToken);
  };



  // API for LoginAPI
  async function LoginAPI() {
    console.log("calling....");
    setLoader(true);
    const data = {
      contact_no: LoginNum,
      password: password,
      device_token: pushToken
    };
    console.log("data>>>>>>>>>s",data);
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.login}`,
        data,
        {},
        true
      );
      console.log("calling12222....");

      console.log("res====>", response);
      if (response?.status === "success") {
        setLoader(false);
        Toast.show({
          type: 'success',
          text1: "success",
          text2: response?.message || " Logged in successfully",
          position: 'Top',
        });
        dispatch(setAccessToken(response?.data?.login_token));
        dispatch(setUserData(response?.data));
        setTimeout(() => {
          navigation.navigate('LocationAllow');
        }, 3000);
      } else {
        setLoader(false);
        Toast.show({
          type: 'error',
          text1: response.message || "Contact No or password is Wrong",
          position: 'Top',
        });
        console.log('error =======>>>1224');


      }
    } catch (error) {
      console.log('error =======>>>12', error);
      setLoader(false);
    }
  }
  // API for ForgotPassAPI
  async function ForgotPassAPI() {
    setLoader(true);
    const data = {
      contact_no: LoginNum,
    };
    const sendOtpData = {
      num: LoginNum,
      screen: 'forgot',
    }
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.forgotPassword}`,
        data,
        {},
        true
      );
      console.log("res====>", response);
      if (response?.status === "success") {
        setLoader(false);
        Toast.show({
          type: 'success',
          text1: "success",
          text2: response?.message || "otp sent successfully",
          position: 'Top',
        });
        setTimeout(() => {
          navigation.navigate("Otp", { forgotData: sendOtpData });
        }, 3000);
      } else {
        setLoader(false);
        Toast.show({
          type: 'error',
          text1: `${response.message}`,
          position: 'Top',
        });
        console.log('error =======>>>');

      }
    } catch (error) {
      setLoader(false);
      console.log('error =======>>>', error);
    }
  }
  // Validations
  const numPass = {
    num: contactNum?.contactNum,
    pass: password,

  }
  const validations = () => {
    console.log("numPass.....>>", numPass);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (isEmpty(password)) {
      setPasswordErr(true);
      setPasswordErrText('Please enter password');
    } else if (!passwordRegex.test(password)) {
      setPasswordErr(true);
      setPasswordErrText('8 Characters | 1 Special | 1 Uppercase | 1 Numeric');
    } else {
      if (screen === "signup") {
        console.log(">>>>>>>signup");
        navigation.navigate("Name", { data: numPass });
      }
      else {
        LoginAPI();
      }
    }
  }


  return (
    <>
      <View style={{ flex: 1 }}  >
        <CHeader
          leftIcon
          //  title="Bank Detail"
          onLeftIconClick={() => navigation.goBack()} />
        <Toast />
        <StatusBar
          backgroundColor={BaseColors.bgColor}
          barStyle="light-content"
          translucent
        />
        <SafeAreaView style={{ flex: 1 }}>

          <View style={styles.uprView}  >
            <Text style={styles.headingTxt} >Enter Your Password</Text>
            <Text style={styles.subHeading} >Lorem ipsum dolor sit amet, consectetur</Text>
            <View style={styles.subView}>
              <View style={styles.inputStyl}>
                <CInput
                  eyePassword
                  value={password}
                  placeHolder={"Enter password"}
                  placeHolderColor={"gray"}
                  showError={passwordErr}
                  showErrTxt={passwordErrText}
                  secureText={true}
                  onChangeText={(password) => setPassword(password)}
                  onSubmit={() => {
                    validations();
                  }}
                  />
              </View>

              <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 20 }}
                onPress={() => ForgotPassAPI()}>
                <Text style={styles.forgotTxt}>Forgot Password?</Text>
              </TouchableOpacity>
              <View style={{ paddingHorizontal: 15 }}>
                <CButton
                  loading={loader}
                  btnTitle={"Continue"}
                  onPress={() => validations()}
                />
              </View>
            </View>

          </View>

        </SafeAreaView>

      </View>
    </>

  );
};

export default Password;
