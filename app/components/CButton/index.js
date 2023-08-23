import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { BaseColors } from '../../config/theme';

const CButton = (props) => {
  const {
    containerStyle,
    btnTitle,
    type,
    onPress,
    btnStyle,
    txtSty,
    loading,
    ...rest
  } = props;


  const renderText = () => (
    <Text
      style={{
        fontSize: 16,
        color:
          type === 'outlined' ? BaseColors.white : BaseColors.white,
        fontWeight: 'bold',
        textAlign:'center',
        ...txtSty,
      }}>
      {!loading ? (
        btnTitle
      ) : (
        <ActivityIndicator
          animating
          size={20}
          color={type === 'outlined' ? BaseColors.white : BaseColors.white}
        />
      )}
    </Text>
  );

  return (
    <View>
      {type === 'outlined' ? (<TouchableOpacity 
       onPress={loading ? () => {} : onPress}
       style={[styles.outlinedStyl, containerStyle]}>
        {renderText()}
        </TouchableOpacity>):
        (<TouchableOpacity  onPress={onPress} style={[styles.btnContainer, containerStyle]}>
             {renderText()}
          </TouchableOpacity>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 20,
    height:55,
    paddingVertical: 12,
    borderTopStartRadius: 100,
    borderTopEndRadius: 100,
    borderBottomStartRadius: 100,
    borderBottomEndRadius: 100,
    width: '100%',
    backgroundColor:BaseColors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlinedStyl:{
    paddingHorizontal: 20,
    height:55,
    paddingVertical: 12,
    borderTopStartRadius: 100,
    borderTopEndRadius: 100,
    borderBottomStartRadius: 100,
    borderBottomEndRadius: 100,
    width: '100%',
    borderWidth:2,
    borderColor:BaseColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxtSty:{
   textAlign:'center',
  }
//  btnStyle:{
//     backgroundColor:'blue',
//     height:50,
//     borderRadius:30,
//     justifyContent:'center',
//     alignItems:'center',
//  },
 
});

export default CButton;