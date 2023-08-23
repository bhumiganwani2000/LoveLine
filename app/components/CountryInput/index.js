import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { BaseColors } from '../../config/theme';
import {CountryPicker} from "react-native-country-codes-picker";

const CountryInput = (props) => {
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');
  const {
    label,
    placeHolder,
    placeHolderColor,
    onChangeText,
    value,
    showError,
    showErrTxt,
    maxLength,
    keyBoardType,
    returnKeyType,
    customIn,
    // handleCountrySelect,
    onSelectCountry,
    customstyl,
    custmonCode,
    ...rest
  } = props;

  return (
    <View style={{}}>
        <View style={[styles.inputStyl,{...customstyl}]}>
            <View>
            <View>
                <Text style={[styles.countryCodeTxt,{...custmonCode}]}>{countryCode}</Text>
            </View>
        <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
            width: '20%',
            height: 60,
            // backgroundColor: 'red',
            padding: 10,
        }}
      >
        <CountryPicker
        show={show}
        
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          onSelectCountry(item)
          setCountryCode(item.dial_code);
          setShow(false);
          
        }}
      />
      </TouchableOpacity>
      </View>
      <View style={styles.vrLine}/>
      <TextInput 
          //  style={styles.input}
           style={[styles.input,{...customIn}]}
            value={value}
            placeholder={placeHolder}
            placeholderTextColor={placeHolderColor} 
            onChangeText={onChangeText}
            maxLength={maxLength}
            keyboardType={keyBoardType}
            returnKeyType={returnKeyType}
       />
      </View>
     {showError ? <Text style={styles.errStyl}>{showErrTxt}</Text> : null}
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
input:{
    position: 'absolute',
    left:'30%',
    width:'70%',
    justifyContent: 'center',
    alignItems: 'center',
    color:BaseColors.black
},
 inputStyl:{
    height:55,
    paddingHorizontal:5,
    borderWidth:1,
    borderColor: BaseColors.borderColor,
    borderRadius: 30,
    justifyContent: 'center',
 },
 errStyl:{
    color: "red",
    fontSize:14,
 },
 vrLine:{
    position:'absolute',
    // top:15,
    left:75,
    height:25,
    width:2,
    backgroundColor:BaseColors.vrLineClr,
 },
 countryCodeTxt:{
    position:'absolute',
    top:18,
    left:20,
    fontSize:16,
    color:BaseColors.black
 },


});

export default CountryInput;