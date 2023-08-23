import {Dimensions, Platform, StyleSheet} from 'react-native';
import {BaseColors} from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  mainCantainer: {
    flex: 1,
  },
  uprView: {
    paddingTop:  Dimensions.get('screen').height / -5,
    backgroundColor: BaseColors.bgColor,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 4,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal:15,
},
headingTxt:{
  fontSize: 32,
  color:BaseColors.white,
  fontWeight:"bold",
},
subHeading:{
  marginTop:10,
  fontSize: 16,
  color:BaseColors.white,
},
  inputStyl:{
    flex:1,
    paddingHorizontal:15,
  },
  subView:{
  marginTop:20,
  paddingVertical:20,
  borderRadius:15,
  marginHorizontal:10,
  height: Dimensions.get('screen').height / 3.5,
  backgroundColor:BaseColors.white,
  },
  whiteView:{
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row'
  },
  resend:{
    fontSize:14,
    paddingVertical:20,
    color:BaseColors.black,
    textAlign:'center',
  },
  otpInput: {
    flex:1,
    width: 40,
    height: 45,
    borderWidth: 2,
    borderColor: BaseColors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
    color: '#000000',
    // backgroundColor: '#F5F5F5',
  },
  btmView:{
    padding:20,
    justifyContent:'flex-end',
  },
  btmTxt:{
    fontSize:16,
    textAlign:'center',
    marginTop:10,
  },
  resendView:{
    paddingVertical:20,
  }
});
