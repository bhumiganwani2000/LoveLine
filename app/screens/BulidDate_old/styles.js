import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors } from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: BaseColors.lightGreyBg,
  },
  container: {
    flex: 1,
    backgroundColor: BaseColors.bgColor,
    // height: Dimensions.get('screen').height / -6,
    // height: Dimensions.get('screen').height / 7,
  },
  subView: {
    marginTop: Dimensions.get('screen').height / 12,
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    padding: 15
  },
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 65,
    width: 130,
    height: 130,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'flex-start',
    borderWidth: 5,
    borderColor: BaseColors.white,
    paddingVertical: 7,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginBottom: 20
  },
  headingTxt: {
    textAlign: "center",
    color: BaseColors.white,
    fontSize: 17
  },
  telepView: {
    marginTop: 45,
    borderRadius: 20,
    backgroundColor: BaseColors.plusingView_bg,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  teleSubpView: {
    height: 60,
    width: '48%',
    // backgroundColor: BaseColors.LoveLineClic,
    marginTop: 10,
    borderRadius: 20,
    margin: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Telptxt: {
    fontWeight: 'bold',
    color: BaseColors.white
  },
  Loremtxt: {
    color: BaseColors.white,
    marginTop: 10
  },
  StartView: {
    backgroundColor: BaseColors.white,
    height: 30,
    width: 100,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 15,
  },
  StartText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  LoveClic: {
    fontSize: 15,
    color: BaseColors.white,
    fontWeight: 'bold',
    left: 5
  },
  QuizTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: BaseColors.white,
    left: 15
  },
  text10X: {
    backgroundColor: BaseColors.lightGreyBg,
    left: 10,
    paddingHorizontal: 7,
    borderRadius: 10
  },
  pulse: {
    backgroundColor: BaseColors.lightGreyBg,
    position: 'absolute',
    height: 35,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // To make it a circle
  },
  plusingText: {
    color: BaseColors.plusingView_bg,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign:'center'
  }
});