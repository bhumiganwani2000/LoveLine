import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors } from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  mainCantainer: {
    flex: 1,
  },
  uprView: {
    paddingTop: Dimensions.get('screen').height / -5,
    backgroundColor: BaseColors.bgColor,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 4,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 15,
  },
  headingTxt: {
    fontSize: 32,
    color: BaseColors.white,
    fontWeight: "bold",
  },
  subHeading: {
    marginTop: 10,
    fontSize: 16,
    color: BaseColors.white,
  },
  inputStyl: {
    flex: 1,
    // paddingVertical:20,
    paddingHorizontal: 15,
  },
  subView: {
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    height: Dimensions.get('screen').height / 4.2,
    backgroundColor: BaseColors.white,
  },
  whiteView: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row'
  },
  inputView: {
    backgroundColor: BaseColors.white,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 20,
    top: -55,
    paddingBottom: 40,
  },

  btmView: {
    padding: 20,
    justifyContent: 'flex-end',
  },
  btmTxt: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },

  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  btnContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    // justifyContent:'space-between',
    borderWidth: 1,
    borderColor: BaseColors.secondary,
    borderRadius: 50,
    // paddingHorizontal:25,
    paddingVertical: 15,
    width: 150,
  },
  btnTxt: {
    fontSize: 16,
    color: BaseColors.secondary,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    // padding:20,
    // borderColor: 'red',
    // borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  // customButtonText: {
  //   fontSize: 16,
  //   color: 'red',
  // },
  // loginButton: {
  //   // borderWidth:2,
  //   // paddingVertical:20,
  //   // paddingHorizontal:50,
  //   // Customize LoginButton styles here if needed
  // },
});
