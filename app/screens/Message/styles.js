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
  },
  searchInput:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BaseColors.white,
    borderRadius: 50,
    paddingHorizontal: 12,
    marginHorizontal:10,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  subView: {
    flex: 1,
    marginTop: Dimensions.get('screen').height / 30,
    paddingVertical: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: Dimensions.get('screen').height,
    backgroundColor: BaseColors.lightGreyBg,
    paddingHorizontal: 20,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'red',
    alignItems: 'center',
    paddingVertical: 10
  },
  subRowView: {
    flex: 0.8,
    flexDirection: 'row',
    // backgroundColor:'green',
    alignItems: 'center',
  },
  heading: {
    textTransform: 'uppercase',
    fontSize: 20,
    // fontWeight: 'bold',
    paddingVertical: 10
  },
  userImg: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  username: {
    flex: 0.7,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: BaseColors.black
  },
  btnView: {
    width: 120,
    // backgroundColor: 'red',
  },
  // Mathces View
  MatchesView: {
    margin: 10,
    alignItems: 'center'
  },
  mathcesTxt: {
    marginTop:5,
    fontSize: 14,
    color: BaseColors.black,
  },
 

});
