import {Dimensions, Platform, StyleSheet} from 'react-native';
import {BaseColors} from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor:BaseColors.white,
  },
  animationView:{
    flex:1,
    justifyContent:'center',
    // backgroundColor:'red',
    // paddingTop: Dimensions.get('screen').height / ,
    // height: Dimensions.get('screen').height / 2 + 100,
    // justifyContent: 'flex-end',
    // alignSelf: 'center',
    // marginLeft: 10,
    // marginRight: 10,
  },
  secView:{
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center"
  },
  animatiInside:{
    flex: 1,
    position: 'absolute', 
     justifyContent: 'center',
      alignItems: "center"
  },
  // btmTxt:{
  //   // backgroundColor:'red',
  //   paddingBottom:50,
  //   // paddingTop:Dimensions.get('screen').height / 6,
  //   fontSize:12,
  //   textAlign:'center',
  //   color:BaseColors.black,
  // }
});
