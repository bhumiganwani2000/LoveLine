import {Dimensions, Platform, StyleSheet} from 'react-native';
import {BaseColors} from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  mainView:{
    flex: 1,
    backgroundColor:BaseColors.white,
  },
  uprView: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
},
header:{
  paddingTop:10,
  paddingHorizontal:40,
  fontSize:14,
  color:BaseColors.black,
  fontWeight:'bold',
  textAlign:'center',
},
subHeading:{
  paddingTop:10,
  paddingHorizontal:30,
  fontSize:12,
  color: BaseColors.black,
  textAlign:'center',
  // fontWeight:'bold',
},

btmView:{
  // backgroundColor:'red',
  padding:20,
  justifyContent:'flex-end',
  marginBottom:30,
},

btmTxt:{
  fontSize:12,
  color: BaseColors.black,
  textAlign:'center',
},

});
