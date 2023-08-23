import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors } from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: BaseColors.white,
    },
    container: {
        flex: 1,
        backgroundColor: BaseColors.bgColor,
        // height: Dimensions.get('screen').height / -6,
        // height: Dimensions.get('screen').height / 7,
    },
    heading: {
        color: BaseColors.black,
        fontWeight: 'bold',
        fontSize: 25,
        paddingHorizontal: 20,
    },
    subView: {
        flex: 1,
        // marginTop:20,
        marginTop: Dimensions.get('screen').height / 30,
        paddingVertical: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: Dimensions.get('screen').height,
        backgroundColor: BaseColors.white,
    },
    listView: {
        //   paddingVertical:5,
        //  paddingTop:20,
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 20,
    },
    navItem: {
        //   borderBottomWidth: 0.8,
        //   borderBottomColor: BaseColors.borderColor,
        flexDirection: 'row',
        // justifyContent: 'space-eve,
        paddingVertical: 8,
        alignItems: 'center',
    },
    icons: {
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navItemText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: BaseColors.labelColor,
        marginLeft: 20,
    },

    viewmsgUi: {
        marginTop: 120,
        backgroundColor: BaseColors.white,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        paddingLeft: 20,
        paddingRight: 20,
        height: Dimensions.get('window').height,
        position: 'relative'
    },
    avatar: {
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 80,
        width: 160,
        height: 160,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'flex-start',
        marginTop: -80,
        borderWidth: 8,
        borderColor: BaseColors.white,
        // backgroundColor: BaseColors.white,
        paddingVertical: 7,
        paddingHorizontal: 20,
        alignSelf: "center",
    },
    userNameTxt: {
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
        color: BaseColors.secondary,
        fontWeight: 'bold',
    },
    cameraIcon: {
        position: 'absolute',
        backgroundColor: BaseColors.white,
        height: 40,
        width: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top: 35,
        right: 120,
        zIndex: 1
    },
    btmView: {
        marginTop: 20,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
    },
    deleteTxt: {
        fontSize: 14,
        marginTop: 20,
        textAlign: 'center',
        color: BaseColors.secondary,
        fontWeight: 'bold',
    },

});
