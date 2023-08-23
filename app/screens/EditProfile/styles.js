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
  heading: {
    color: BaseColors.black,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 25,
    paddingHorizontal: 20,
  },
  subHeading: {
    marginTop: 20,
    color: BaseColors.greyTxt,
    textTransform: 'uppercase',
    // fontWeight:'bold',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  subView: {
    flex: 1,
    // marginTop:20,
    marginTop: Dimensions.get('screen').height / 60,
    paddingVertical: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: Dimensions.get('screen').height,
    backgroundColor: BaseColors.white,
  },
  rowView: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSty: {
    marginRight: 10,
  },
  labeltyl: {
    fontSize: 18,
    color: BaseColors.darkBlack,
  },
  nametxtStyl: {
    fontSize: 16,
    color: BaseColors.ligtBlueTxt,
    width:'50%'
  },
  customInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 10,
    height: 40,
    width: 180,

  },
  customPhnInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    width: 220,
    // paddingHorizontal: 50, 
    height: 40,
  },
  btmView: {
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 8,
    width: 180,
    borderBottomColor: BaseColors.borderColor,
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color:BaseColors.greyColor,
    left:6
  },
  selectedTextStyle: {
    fontSize: 14,
    color:BaseColors.black
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  // containerDOB: {
  //   borderBottomWidth: 1,
  //   borderBottomColor:BaseColors.borderBtmColor
  // },
  inputView: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor:BaseColors.borderBtmColor,
    paddingHorizontal: 10,
    height: 40,
    width: 180,
  },
  inputText: {
    fontSize: 16,
    // textAlign: 'center',
    color:BaseColors.black
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    color: BaseColors.red,
    // textAlign: 'center',
  }
});2