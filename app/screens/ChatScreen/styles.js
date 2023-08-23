import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors } from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: BaseColors.bgColorwhite,
    },
    container: {
        flex: 1,
        backgroundColor: BaseColors.bgColor,
        // height: Dimensions.get('screen').height / -6,
        // height: Dimensions.get('screen').height / 7,
    },

    subView: {
        flexGrow:1,
        // marginTop:20,
        // marginTop: Dimensions.get('screen').height / 6,
        // paddingVertical: 20,
        paddingTop:20,

        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        // height: Dimensions.get('screen').height,
        backgroundColor: BaseColors.white,
    },
 

    // 
      bubbleLeft: {
        backgroundColor: BaseColors.lightBgTextInput,
        zIndex: 111,
        marginBottom: 10,
      },
      bubbleRight: {
        backgroundColor: BaseColors.secondary,
        marginBottom: 10,
      },
      composerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // alignSelf: 'center',
        // padding: 10,
      },
      textLeft: {
        color: BaseColors.black,
      },
      emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        // paddingBottom: 100, // Adjust this value to create spacing above the input
      },
      emptyText: {
        color: BaseColors.secondary,
        // fontFamily: FontFamily.bold,
        fontWeight:'bold',
        textAlign: 'center',
        fontSize: 18,
        transform: [{ scaleY: -1 }],
      },
      textRight: {
        color: BaseColors.white,
      },
      inputView:{
          flex:1,
          // marginHorizontal:10,
          // paddingHorizontal:20,
          // paddingHorizontal:30,
          // position:'absolute',
          // bottom:10,
      },
      inputToolbar: {
        backgroundColor: '#ECF0F0',
        color: 'black',
        borderRadius:20,
        paddingHorizontal:20,
        borderTopWidth: 0.5,
        borderColor: '#E8E8E8',
        paddingBottom: Platform.OS === 'ios' ? 20 : 5,
      },
      // sendText: {
      //   color: 'red',
      // },
      sendContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      },
      sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
      },
      accessoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 10,
      },
      button: {
        // position:'absolute',
        // marginLeft: 10,
        // paddingVertical: 5,
        // paddingHorizontal: 10,
        // borderRadius: 20,
        // left:0,
        // justifyContent:'flex-start',
        // backgroundColor: '#0084ff',
      },
      buttonText: {
        color: '#ffffff',
        fontSize: 14,
      },
    
      // model
      modelTxt: {
        color: 'black',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '700',
        paddingVertical: 10,
      },
      modelListTxt: {
        paddingVertical: 15,
        backgroundColor: '#F3F3F3',
        marginBottom: 10,
        maxheight: 60,
        paddingHorizontal: 10,
      },
      modelBoxView: { flex: 1, margin: 25, paddingTop: 5 },
      modelTxt1: {
        color: '#515050',
      },
      firstTxt: {
        // fontFamily: FontFamily.roRegular,
        fontWeight: '400',
        fontSize: 18,
        color: BaseColors.secondary,
        lineHeight: 24,
        paddingBottom: 10,
      },
      numTxt: {
        // fontFamily: FontFamily.roRegular,
        fontWeight: '400',
        fontSize: 12,
        color: BaseColors.secondary,
        lineHeight: 20,
      },

      // head
      rowView: {
        // position:'absolute',
        paddingBottom:20,
        paddingHorizontal:20,
        paddingVertical:20,
        // flex: 1,
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
        marginLeft:10,
        height: 60,
        width: 60,
        borderRadius: 50,
      },
      username: {
        flex: 0.7,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: BaseColors.secondary
      },
      activeTxt:{
        fontSize: 15,
        color: BaseColors.secondary
      },
      userView:{
        justifyContent:'center',
        alignItems:'center',
      },
      activeIcon:{
        position:'absolute',
        right:5,
        bottom:8,
        height:15,
        width:15,
        borderRadius:50,
        borderWidth:3,
        borderColor:BaseColors.white,
        backgroundColor:BaseColors.greenActiveColor,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
      },
      voiceIcon: {
        marginRight: 10,
      },
      inputText: {
        flex: 1,
        fontSize: 16,
        padding: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#d3d3d3',
      },
      sendIcon: {
        marginLeft: 10,
      },
});
