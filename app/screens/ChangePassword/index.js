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
import styles from './styles';
import {isArray, isEmpty, isNull} from 'lodash';
import CInput from '../../components/CInput';
import { BaseColors } from '../../config/theme';
// import Icon from 'react-native-vector-icons/AntDesign';
import CButton from '../../components/CButton';
import { getApiDataProgress } from '../../utils/apiHelper';
import BaseSetting from '../../config/setting';
import Toast from 'react-native-toast-message'


const ChangePassword = ({navigation,route}) => {

    const [newPass, setNewPass] = useState('');
    const [newPassErr, setNewPassErr] = useState(false);
    const [newPassErrTxt, setNewpassErrTxt] = useState('');
  
    const [confirmPass, setConfirmPass] = useState('');
    const [confirmPassErr, setConfirmErr] = useState(false);
    const [confirmPassErrTxt, setConfirmPassErrTxt] = useState('');
    const [loader, setLoader] = useState(false);

    // const LoginData =  route?.params?.LoginNumData;
    const LoginNum= route?.params?.loginNum?.num;

  useEffect(()=>{
    // console.log("LoginNum===>>",LoginData);
    console.log("Number==>",LoginNum);
    // console.log("NameContactPass==>",data?.pass);

  },[])


 // API for ChangePasswordAPI
 async function ChangePasswordAPI() {
  setLoader(true);
  const data = {
    contact_no:LoginNum,
    password:confirmPass,

  };
  try {
    const response = await getApiDataProgress(
      `${BaseSetting.endpoints.changepassword}`,
      data,
      {},
      true
    );
    console.log("res====>",response);
    if (response?.status === "success") {
      setLoader(false);
      console.log("status====>",response?.status);
      Toast.show({
        type: 'success',
        text1: "success",
        text2: response?.message || "Password change successfully",
        position: 'Top',
      });
      setTimeout(() => {          
        navigation.navigate("LocationAllow");
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
  
  // function for error changing password
  const validations = () => {
    let valid = true;
    // eslint-disable-next-line no-useless-escape
    const PasswordPattern =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (isEmpty(newPass)) {
      valid = false;
      setNewPassErr(true);
      setNewpassErrTxt('Please enter new password');
      // eslint-disable-next-line brace-style
    } else if (PasswordPattern.test(newPass) === false) {
      setNewPassErr(true);
      valid = (false);
      setNewpassErrTxt('8 Characters | 1 Special | 1 Uppercase | 1 Numeric');
    } else {
      setNewPassErr(false);
      setNewpassErrTxt('');
    }

    if (isEmpty(confirmPass)) {
      valid = false;
      setConfirmErr(true);
      setConfirmPassErrTxt('Please enter confirm password');
    } else if (newPass !== confirmPass) {
      setConfirmErr(true);
      valid = false;
      setConfirmPassErrTxt("Confirm password doesn't match");
    } else {
      setConfirmErr(false);
      setConfirmPassErrTxt('');
    }
    if (valid) {
      ChangePasswordAPI();
    //   changePasswordAction();
    }
  };

  return (
    <>
     <View style={styles.mainView}>
     <Toast />
          <StatusBar 
          backgroundColor={BaseColors.white}
          barStyle="dark-content" 
          translucent
            />
              <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.uprView}>
                <Image source={Images.passScreen} style={{alignSelf:'center'}}/>
                <View style={styles.inputStyl}>
                    <CInput 
                    eyePassword
                    value={newPass}
                    placeHolder={"New Password"}
                    placeHolderColor={"gray"}
                    showError={newPassErr}
                    showErrTxt={newPassErrTxt}
                    secureText
                    onChangeText={(newPass) => setNewPass(newPass)}
                    onSubmit={() => {
                      validations();
                    }}/>
                     </View>
                 <View style={styles.inputStyl}>
                    <CInput 
                    eyePassword
                    value={confirmPass}
                    placeHolder={"Confirm Password"}
                    placeHolderColor={"gray"}
                    showError={confirmPassErr}
                    showErrTxt={confirmPassErrTxt}
                    secureText
                    onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
                    onSubmit={() => {
                      validations();
                    }}/>
                    </View>
                    
                 
                </View>
               
                <View style={styles.btmView}>
                    <Text style={styles.btmTxt}>Lorem ipsum dolor sit amet, consectetur Lorem ipsum </Text>
                    <CButton
                      loading={loader}
                      containerStyle={{marginTop:20}}
                     btnTitle={"Submit"} 
                     onPress={()=>validations()}
                    />
                  </View>
                </SafeAreaView>
               
     </View>
    </>
   
  );
};

export default ChangePassword;
