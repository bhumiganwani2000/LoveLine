import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors } from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: BaseColors.lightGreyBg,
  },
  headTxt: {
    fontSize: 20,
    color: BaseColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: BaseColors.bgColor,
    overflow: 'hidden',
  },
  bgImg: {
    // flex:1,
    // height:'100%',
    width: '100%',
    marginTop: Dimensions.get('screen').height / 12,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    //
  },
  subView: {
    flex: 1,
    // marginTop: Dimensions.get('screen').height / 12,
    height: Dimensions.get('screen').height,
    width: '100%',
    // padding: 15,
    overflow: 'hidden'
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
    // marginBottom: 20
  },
  headingTxt: {
    textAlign: "center",
    color: BaseColors.white,
    fontSize: 15,
    marginTop: 30,
    paddingHorizontal: 10
  },
  telepView: {
    borderRadius: 20,
    backgroundColor: BaseColors.plusingView_bg,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teleSubpView: {
    width: '48%',
    marginTop: 10,
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Telptxt: {
    fontWeight: 'bold',
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
  },
  QuizTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: BaseColors.white,
    // left: 10,
    // backgroundColor:'red'
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
    textAlign: 'center'
  }
});
