// import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, { useEffect, useState } from 'react';
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
  BackHandler,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
// import {useSelector} from 'react-redux';
import styles from './styles';
import { isArray, isEmpty, isNull } from 'lodash';
import CountryInput from '../../components/CountryInput';
// import Icon from 'react-native-vector-icons/AntDesign';
import CButton from '../../components/CButton';
import { getApiDataProgress } from '../../utils/apiHelper';
import AuthAction from '../../redux/reducers/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import BaseSetting from '../../config/setting';
import Toast from 'react-native-toast-message'
import CHeader from '../../components/CHeader';
import { useIsFocused } from '@react-navigation/native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import { Button } from 'react-native-elements';
import { BaseColors } from '../../config/theme';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '498354268624-duvlmgsjl5i4s20d067q8amqj1205db0.apps.googleusercontent.com',
});



const Signup = ({ navigation }) => {
  const [code, setCode] = useState('+91');
  const [phoneNum, setPhoneNum] = useState('');
  const [phoneNumErr, setPhoneNumErr] = useState(false);
  const [phoneNumErrTxt, setPhoneNumErrTxt] = useState('');
  const [loader, setLoader] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const isFocused = useIsFocused();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const { setAccessToken, setUserData } = AuthAction;



  // getting google token 
  const gSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      googleSignout();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
      const res = await auth().signInWithCredential(googleCredential);
      socailGoogle(res, idToken);
    } catch (error) {
      console.log("Error occurred during Google sign-in:", error);
    }
  };

  // socailGoogle login bakend call 
  async function socailGoogle(res, idToken) {
    const responseData = res;
    const email = responseData?.additionalUserInfo?.profile.email;
    const token = idToken;
    const gdata = {
      email: email,
      socialType: "Gmail",
      social_login_token: token,
    };
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.socailGoogle}`,
        gdata,
        {},
        true
      );
      if (response?.status === "success") {
        Toast.show({
          type: 'success',
          text1: "success",
          text2: response?.message || "User Logged in successfully",
          position: 'Top',
        })
        dispatch(setAccessToken(response?.data?.login_token));
        dispatch(setUserData(response?.data));
        setTimeout(() => {
          navigation.navigate("LocationAllow");
        }, 2000);
      } else {
        Toast.show({
          type: 'error',
          text1: `${response.message}`,
          position: 'Top',
        });
      }
    } catch (error) {
      console.log('error =======>>>', error);
    }
  }

  // signout
  const googleSignout = async () => {
    auth().signOut().then(() => {
      console.log("User signout successfully");
    }).catch(e => console.log("error".e.message));
  }
  const showMsg = () => {
    Toast.show({
      type: 'success',
      // text1: "success",
      text2: "Coming soon",
      position: 'Top',
    });
  }

  useEffect(() => {
    setPhoneNum('');
    setPhoneNumErr(false);
    setPhoneNumErrTxt('');
  }, [isFocused]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const fullPhoneNumber = `${code}${phoneNum}`;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  });
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  const handleLogin = async () => {
    try {
      handleLogout();
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
          console.log("facebook>>>", data.accessToken.toString());
        }
      }
    } catch (error) {
      console.log('Login error: ', error);
    }
  };

  const handleLogout = () => {
    LoginManager.logOut();
    console.log('Logged out successfully');
  };


  // API for signUpAPI
  async function signUpAPI() {
    setLoader(true);
    const data = {
      contact_no: fullPhoneNumber,
      screen: "signup",
    };
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.register}`,
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
        })
        setTimeout(() => {
          navigation.navigate("Otp", { signUpData: data });
        }, 2000);
      } else {
        setLoader(false);
        Toast.show({
          type: 'error',
          text1: `${response.message}`,
          position: 'Top',
        });
        console.log(">>>>>>", response.message);
      }
    } catch (error) {
      setLoader(false);
      console.log('error =======>>>', error);
    }
  }


  const validations = () => {
    const numVal = /^[0-9]+$/;
    if (isEmpty(phoneNum)) {
      setPhoneNumErr(true);
      setPhoneNumErrTxt('Please enter phone number');
    } else if (
      (phoneNum.length > 10) ||
      !numVal.test(String(phoneNum)) ||
      phoneNum.length < 8
    ) {
      setPhoneNumErr(true);
      setPhoneNumErrTxt('Please enter valid phone number');
    } else {
      signUpAPI();
    }
  }

  return (
    <>
      <Toast />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} >
        <CHeader
          leftIcon
          //  title="Bank Detail"
          onLeftIconClick={() => navigation.goBack()} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.uprView}  >
            <Text style={styles.headingTxt} >What's your phone number?</Text>
            <Text style={styles.subHeading} >Signup Lorem ipsum dolor sit amet, consectetur</Text>
            <View style={styles.subView}>
              <View style={styles.inputStyl}>
                <CountryInput
                  value={phoneNum}
                  placeHolder={"Enter Phone number"}
                  placeHolderColor={"gray"}
                  showError={phoneNumErr}
                  showErrTxt={phoneNumErrTxt}
                  onChangeText={(phoneNum) => setPhoneNum(phoneNum)}
                  maxLength={10}
                  onSubmit={() => {
                    validations();
                  }}
                  onSelectCountry={country => {
                    setCode(country?.dial_code);
                  }}
                  keyBoardType="number-pad"
                  returnKeyType="done"
                />
              </View>
              <View style={{ paddingHorizontal: 15, }}>
                <CButton
                  loading={loader}
                  btnTitle={"Continue"}
                  onPress={() => validations()}
                //  onPress={()=>validations()}
                />
              </View>
            </View>
          </View>

        </SafeAreaView>
        {!isKeyboardVisible ? (<View style={styles.btmView}>
          <View style={styles.btnView}>
            <TouchableOpacity
              // onPress={()=>showMsg()}
              onPress={() => handleLogin()}
              style={styles.btnContain}>
              <Image source={Images.fb} style={{ width: 20, height: 20 }} />
              <Text style={[styles.btnTxt, { marginLeft: 10 }]}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={gSignIn}
              style={styles.btnContain}>
              <Image source={Images.mail} style={{ width: 20, height: 20 }} />
              <Text style={[styles.btnTxt, { marginLeft: 15 }]}>E-Mail</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.btmTxt}>Already have an account?
            {' '}<Text onPress={() => navigation.navigate("Login")} style={[styles.btmTxt, { color: BaseColors.secondary }]}>Login</Text>
          </Text>
        </View>) : null}

      </ScrollView>
    </>

  );
};

export default Signup
  ;
