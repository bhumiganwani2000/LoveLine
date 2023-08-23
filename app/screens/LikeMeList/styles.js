import {Dimensions, Platform, StyleSheet} from 'react-native';
import {BaseColors} from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  mainView:{
    flex: 1,
    backgroundColor:BaseColors.lightGreyBg,
    paddingTop:  Dimensions.get('screen').height /25,
  },
  container:{
    flex: 1,
  },
  headingView:{
  },
  tabView:{
   flexDirection:'row',
   justifyContent:'center',
   paddingVertical:10,   
  },
  listImage: {
    borderRadius: 8,
    justifyContent:'center',
    width: Dimensions.get('window').width / 2.2,
    height: 250,
    marginHorizontal: 10,
    marginVertical:8,
  },
  tabTxt:{
  fontSize:15,
  textAlign:'center',
  fontWeight:'bold',
  },
  vrLine:{
   marginHorizontal:10,
   height:20,
   width:2,
   backgroundColor:BaseColors.bgColor,
  },
  desTxt:{
    textAlign:'center',
    paddingHorizontal:30,
    color:BaseColors.black,
  },
  underLine:{
    height:2,
    width:25,
    marginTop:5,
    alignSelf:'center'
  }
});
