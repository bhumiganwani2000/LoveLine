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


const Gender = ({navigation,route}) => {
  const data = route.params?.data;

  const [selectedImage, setSelectedImage] = useState(null);
  const [genderErr,setGenderErr] = useState(false);
  const [genderErrTxt, setGenderErrTxt] = useState('');

  useEffect(()=>{
    console.log("===>>",data);
    // console.log("NameCondataatacNumt==>",data?.num);
    // console.log("NameContactPass==>",data?.pass);

  },[])
//   const temp_obj = {
//     mobile: data?.mobile,
//     password: data?.password,
//     name: data?.name,
//     gender: selectedImage,
// }
  // useEffect(()=>{
  //   console.log(".?>>>>",temp_obj);

  // },[])

  // const validations =()=>{
  //   const temp_obj = {
  //     mobile: data?.mobile,
  //     password: data?.password,
  //     name: password?.name
  // }
  //   if (isEmpty(name)) {
  //     setNameErr(true);
  //     setNameErrText('Please enter name');
  //   } else{
  //     navigation.navigate("Birthdate",{data:temp_obj});
  //   }
  // }

  const validateGender = () => {
    if (!selectedImage) {
        setGenderErr(true);
        setGenderErrTxt('Please select a gender');
        return false;
    }
    setGenderErrTxt('');
    return true;
};

const handleContinue = () => {
    if (!validateGender()) {
        return;
    }
    const GenData = {
        mobile: data.mobile,
        password: data.password,
        name: data?.name,
        gender: selectedImage,
    };
    navigation.navigate('Birthdate', { data: GenData });
}

  return (
    <>
     <View style={styles.mainView}  >
          <StatusBar 
          backgroundColor={BaseColors.white}
          barStyle="dark-content" 
          translucent
            />
              <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.uprView}>
                  <Text style={styles.heading}>Lorem ipsum dolor sit amet, consectetur</Text>
                 <View style={styles.imageContainer}>
                  <View>
                  <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={()=>{setSelectedImage('female')}} 
                          style={[
                            styles.imageWrapper,
                            selectedImage === 'female' && styles.selectedImage,
                          ]}>
                  <Image source={Images.female} />
                  </TouchableOpacity>
                  <Text style={[styles.heading,{marginTop:20}]}>Female</Text>
                  </View>
                  <View>
                  <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={()=>{setSelectedImage('male')}}
                   style={[
                    styles.imageWrapper,
                    selectedImage === 'male' && styles.selectedImage,
                  ]}>
                 <Image source={Images.male} />
                </TouchableOpacity>
                <Text style={[styles.heading,{marginTop:20}]}>Male</Text>
                  </View>
                 </View>
                 {genderErr ? <Text style={styles.errorText}>{genderErrTxt}</Text> : null}
                </View>
               
                <View style={styles.btmView}>
                    <Text style={styles.btmTxt}>Lorem ipsum dolor sit amet, consectetur Lorem ipsum </Text>
                    <CButton
                    containerStyle={{marginTop:20}}
                     btnTitle={"continue"} 
                     onPress={()=>handleContinue()}
                    />
                  </View>
                </SafeAreaView>
               
     </View>
    </>
   
  );
};

export default Gender;
