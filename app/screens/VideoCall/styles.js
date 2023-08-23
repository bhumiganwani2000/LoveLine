import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors } from '../../config/theme';

// const nWidth = Dimensions.get('screen').width;
// const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
      container: {
        flex: 1,
      },
      bgImg:{
        height:"100%",
        width:'100%',
      },
      backArrow:{
        marginTop:Dimensions.get('screen').height / 15,
        marginHorizontal:20,
        position:'absolute',
        backgroundColor:BaseColors.bgColor,
        padding:10,
        borderRadius:10,

      },
      footerImg:{
        // height:130,
        height: Dimensions.get('screen').height /7,
        width:Dimensions.get('screen').width,
        bottom:20,
      },
      callingView:{
        // padding:40,
        height:90,
        width:90,
        // height:'100%',
        // width:'100%'
        borderRadius:50,
        bottom:0,
        top:50,
        backgroundColor:BaseColors.lightcallRed,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
      },
      phnIconStyl:{
        height:60,
        width:60,
      },
      btmVlImg:{
        // flex:1,
        // flexDirection:'row',
        height:120,
        width:90,
        bottom:10,
        top:50,
        right:20,
        // left:30,
        bottom:20,
        alignSelf:'flex-end',
        // justifyContent:'flex-end',
        // position:'absolutse',
        // padding:50,
        // backgroundColor:'red',
      },
      vclIMG:{
        height:'100%',
        width:'100%',
        borderRadius:20,
        // height:Dimensions.get('screen').height /6,
        // width:Dimensions.get('screen').width /7,
        // alignSelf:'flex-end',s
      },
      namestyl:{
        flex:1,
        bottom:-160,
        marginHorizontal:20,
        // top:-40,s
        // backgroundColor:'red',
        justifyContent:'flex-start',
        alignSelf:'flex-start',
        // bottom:0,
      },
      name:{
        fontSize:25,
        fontWeight:'bold',
        // color:BaseColors.white,
        color:BaseColors.black,
      },
      subTitle:{
        marginTop:10,
        fontSize:14,
        // fontWeight:'bold',
        // color:BaseColors.white,
        color:BaseColors.black,

      },
      timerView:{
        paddingHorizontal:5,
        marginTop:30,
        alignSelf:'flex-start',
      },
      timer:{
      backgroundColor: '#D3D3D338',
      paddingHorizontal:10,
      paddingVertical:5,
      borderRadius:10,
      // color:BaseColors.white,
      color:BaseColors.black,

      }
});
