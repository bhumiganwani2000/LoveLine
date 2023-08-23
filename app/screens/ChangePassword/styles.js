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
    // paddingTop:  Dimensions.get('screen').height / 10,
justifyContent:'center',
    // backgroundColor: BaseColors.bgColor,
    // width: Dimensions.get('screen').width,
    // height: Dimensions.get('screen').height / 3,
    // borderBottomLeftRadius: 40,
    // borderBottomRightRadius: 40,
    // paddingHorizontal:15,
    // backgroundColor:'red',
},
inputStyl:{
    paddingVertical:10,
    paddingHorizontal:15,
  },
heading:{
  fontSize:14,
  color: BaseColors.black,
  textAlign:'center',
  fontWeight:'bold',
},
imageContainer: {
  paddingTop: Dimensions.get('screen').height / 15,
  paddingHorizontal:20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
imgView:{
  flex:1,
// flexDirection:'row',
},
btmView:{
  // backgroundColor:'red',
  padding:20,
  justifyContent:'flex-end',
  marginBottom:30,
},
imageWrapper: {
  borderWidth: 5,
  borderColor: BaseColors.white,
  borderRadius: 100,
  marginHorizontal: 5,
  overflow: 'hidden',
},
selectedImage: {
  borderWidth: 5,
  borderRadius: 100,
  borderColor: BaseColors.borderColor,

},
selectedImageStyl: {
  borderWidth: 5,
  borderColor: "blue",
},
borderImg:{
  backgroundColor:'red',
  padding:20,
borderWidth:2,
borderColor: BaseColors.black,
},
btmTxt:{
  fontSize:12,
  color: BaseColors.black,
  textAlign:'center',
},
errorText:{
  marginTop:30,
  fontSize:14,
  color:BaseColors.red,
  textAlign:'center',
}
});
