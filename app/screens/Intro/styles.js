import {Dimensions, Platform, StyleSheet} from 'react-native';
import {BaseColors} from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor:'white',
  },
  btnView:{
    // backgroundColor:'red',
    paddingHorizontal:10,
    paddingVertical:5,
  },
  linearGradient: {
    flex: 1,
    backgroundColor:BaseColors.bgColor,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: BaseColors.white,
    backgroundColor: 'transparent',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleTxt: {
    textTransform: 'uppercase',
    marginTop: 20,
    fontSize: 28,
    fontWeight:'bold',
    color: BaseColors.white,
  },
  buttonNo: {
    // flex: 1,
    backgroundColor: BaseColors.secondary,
    marginLeft: 5,
    width: 120,
    //elevation: 0,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
