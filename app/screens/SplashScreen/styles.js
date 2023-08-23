import {Dimensions, Platform, StyleSheet} from 'react-native';
import {BaseColors} from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor:'white',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // welcomeHeading: {
  //   marginTop: 20,
  //   fontSize: 28,
  //   fontFamily: FontFamily.semibold,
  //   color: BaseColor.whiteColor,
  //   fontWeight: 'bold',
  // }
  
  TitleTxt: {
    textTransform: 'uppercase',
    marginTop: 20,
    fontSize: 28,
    fontWeight:'bold',
    color: BaseColors.primary,
    textAlign:'center',
  },
  line: {
    backgroundColor: BaseColors.white,
    height: 3,
    width: '17%',
  },
});
