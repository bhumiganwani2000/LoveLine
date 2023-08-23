import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors } from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const nHeight = Dimensions.get('screen').height;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: BaseColors.lightGreyBg,
  },
  heading: {
    textTransform: 'uppercase',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 40,
    paddingBottom: 40,
    textAlign: 'center',
    color: BaseColors.secondary,
  },
  container: {
    // flex: 1,
    alignItems: 'center',
  },
  cardMainView: {
    backgroundColor: BaseColors.lightGreyBg,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },
  cardImg: {
    height: '73%',
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: BaseColors.textGrey,
    // backgroundColor:'red',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 10,

  },
  cardImage: {
    width: 320,
    height: 360,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },
  onTexMainView: {
    backgroundColor: BaseColors.lightGreyBg,
    // backgroundColor:'red',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  texCardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardTexeName: {
    fontSize: 20,
    color: BaseColors.black,
    fontWeight: 'bold'
  },
  lightTextCard: {
    fontSize: 17,
    color: BaseColors.black
  },
  iconTexView: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center'
  },
  iconView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    width: '100%'
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    top: nHeight / 1.4,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalShadowContent: {
    height: nHeight - (nHeight / 2.2),
  },
  modalContent: {
    backgroundColor: BaseColors.white,
    height: nHeight / 2.2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    padding: 10
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: BaseColors.borderBtmColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 12
  },
  rowView1: {
    borderBottomColor: BaseColors.borderBtmColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 16,
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text_icon: {
    flexDirection: 'row',
    marginTop: 5,
  },
  modalHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: BaseColors.black,

  },
  modal_heading2: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  modaltext: {
    fontSize: 17,
    fontWeight: "bold",
    color: BaseColors.black,
    marginBottom: 5
  },
  modal_text: {
    marginTop: 10,
    fontSize: 15
  },
  mapView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listView: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: BaseColors.lightGreyBg,
  },
  listTxt: {
    fontSize: 14,
    textAlign: 'center',
    color: BaseColors.black,
  },
  modalTxt: {
    fontSize: 14,
    color: BaseColors.black,
  },
  likeImgView: {
    position: 'absolute',
    right: Dimensions.get('screen').width / 2.7,
    top: Dimensions.get('screen').height / 3.5,
    // borderRadius: 50,
    // padding: 25,
    backgroundColor: BaseColors.white,
    height: 90,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45
  },
  dlikeImgView: {
    position: 'absolute',
    right: Dimensions.get('screen').width / 2.4,
    top: Dimensions.get('screen').height / 3.3,
  },
  buttonBg: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  middleIcon: {
    backgroundColor: BaseColors.iconBlue,
    height: 80,
    width: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backTxtView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backTxt: {
    fontWeight: 'bold',
    color: BaseColors.secondary,
    fontSize: 17,
    width: 200,
    textAlign: "center",
    opacity: 0.5,
    lineHeight: 40,
    textTransform: "uppercase"
  }

});
