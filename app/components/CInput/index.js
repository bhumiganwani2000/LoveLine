import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { BaseColors } from '../../config/theme';
import Icon from 'react-native-vector-icons/Feather';
Icon.loadFont();

const CInput = (props) => {
  const {
    label,
    placeHolder,
    placeHolderColor,
    onChangeText,
    value,
    showError,
    showErrTxt,
    eyePassword,
    secureText,
    maxLength,
    keyBoardType,
    returnKeyType,
    customstyl,
    numberOfLines,
    multiline,
    errCustomstyl,
    ...rest
  } = props;
  const [showPassword, setShowPassword] = useState(!props.secureText);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={{}}>
        <View style={[styles.inputStyl,{...customstyl}]}>
        <TextInput 
          multiline={multiline}
          numberOfLines={numberOfLines}
            value={value}
            placeholder={placeHolder}
            placeholderTextColor={placeHolderColor} 
            onChangeText={onChangeText}
            maxLength={maxLength}
            secureTextEntry={
              showPassword ? false : true
            }
            keyboardType={keyBoardType}
            returnKeyType={returnKeyType}
            style={{color:BaseColors.black,}}
       />
         
      {eyePassword ? (<View style={{position:'absolute',right:20,}}>
        {!showPassword ? (
          <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon name="eye-off" size={22}  color={BaseColors.borderColor}/>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity  onPress={togglePasswordVisibility}>
          <Icon name="eye" size={22} color={BaseColors.borderColor} />  
          </TouchableOpacity>
        )}
        </View>): null}
   
      </View>
     {showError ? <Text  style={[styles.errStyl,{...errCustomstyl}]}>{showErrTxt}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
labelStyl:{
    fontSize:16,
    color: 'black',
    fontWeight:'bold',
    padding:5,
    },
 inputStyl:{
    height:55,
    paddingHorizontal:15,
    borderWidth:1,
    borderColor: BaseColors.borderColor,
    borderRadius: 30,
    justifyContent:'center',
 },
 errStyl:{
    paddingHorizontal:20,
    color: "red",
    fontSize:14,
 }


});

export default CInput;