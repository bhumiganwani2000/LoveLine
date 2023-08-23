import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors } from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  uprView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 40,
    fontSize: 28,
    color: BaseColors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeading: {
    paddingHorizontal: 30,
    fontSize: 14,
    color: BaseColors.lightGrey,
    textAlign: 'center',
    // fontWeight:'bold',
  },

  btmView: {
    // backgroundColor:'red',
    padding: 20,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },

  btmTxt: {
    fontSize: 12,
    color: BaseColors.black,
    textAlign: 'center',
  },
  container: {
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',

  },
  inputView: {
    marginTop: 20,
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 30,
    fontSize: 14,
    color: BaseColors.red,
    textAlign: 'center',
  },
  dropdownButton: {
    width: 100,
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  },
  dropdown: {
    width: 110,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    padding: 8,
  },
});
