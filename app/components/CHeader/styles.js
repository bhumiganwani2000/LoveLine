import {Dimensions, StyleSheet,Platform, StatusBar} from 'react-native';
import {BaseColors} from '../../config/theme';


const IOS = Platform.OS === 'ios';
const statusBar = IOS ? 30 : StatusBar.currentHeight;
const dHeight = Dimensions.get('screen').height / (IOS ? 10 : 9
    
    );

export default StyleSheet.create({
  mainView:{
    height: dHeight,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:BaseColors.bgColor,
    paddingTop: statusBar,
    paddingHorizontal: 20,
  },
  headingView:{
   flex:1,
    flexDirection:'row',
   justifyContent:'space-between',
   paddingHorizontal:10,
   alignItems:'center',
  },
  titleView:{
    flex:1,
    justifyContent:'center',
    paddingHorizontal:10,
    // alignItems:'center',
   },
  heading:{
    fontSize:24,
    color: BaseColors.white,
    fontWeight:'bold',
  },
  btnTxt:{
    fontSize:18,
    color: BaseColors.white,
    fontWeight:'bold',
  }

});
