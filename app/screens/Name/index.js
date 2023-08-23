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
import { useDispatch, useSelector } from 'react-redux';
import BaseSetting from '../../config/setting';
import { getApiDataProgress } from '../../utils/apiHelper';

const Name = ({navigation,route}) => {
  const data = route.params?.data;
  // const number = data?.num;
  // const password = data?.pass;
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [nameErrText, setNameErrText] = useState('');

  useEffect(()=>{
    console.log("===>>",data?.num);
    console.log("===>>",data?.pass);
    // console.log("NameCondataatacNumt==>",data?.num);
    // console.log("NameContactPass==>",data?.pass);

  },[])

  const validations =()=>{
    const uData = {
      mobile: data?.num,
      password: data?.pass,
      name: name
  }
    if (isEmpty(name)) {
      setNameErr(true);
      setNameErrText('Please enter name');
    } else{
      navigation.navigate("Gender",{data:uData});
    }
  }



  return (
    <>
     <View style={{ flex: 1 }}  >
          <StatusBar 
          backgroundColor={BaseColors.bgColor}
          barStyle="light-content" 
          translucent
            />
              <SafeAreaView style={{ flex: 1 }}>
                
                <View style={styles.uprView}  >
                    <Text style={styles.headingTxt} >Your Name is...</Text>
                    <Text style={styles.subHeading} >Lorem ipsum dolor sit amet, consectetur</Text>
                    <View style={styles.subView}>
                    <View style={styles.inputStyl}>
                    <CInput 
                    value={name}
                    placeHolder={"Enter Name"}
                    placeHolderColor={"gray"}
                    showError={nameErr}
                    showErrTxt={nameErrText}
                    // secureText
                    onChangeText={(name) => setName(name)}
                    onSubmit={() => {
                      validations();
                    }}

                    // onSelectCountry={country => {
                    //   setCode( country?.dial_code);
                    // }}
                
                />
                 
                  </View>
                  <View style={{paddingHorizontal:15,}}>
                    <CButton
                     btnTitle={"continue"} 
                     onPress={()=>validations()}
                    
                    />
                  </View>
                </View>
                </View>
                </SafeAreaView>
               
     </View>
    </>
   
  );
};

export default Name;
