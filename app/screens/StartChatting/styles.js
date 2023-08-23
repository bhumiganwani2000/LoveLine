import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors } from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BaseColors.bgColor
    },
    subView: {
        height: Dimensions.get('screen').height / 1.7,
        width: Dimensions.get('screen').width / 1.1,
        backgroundColor: BaseColors.white,
        borderRadius: 20,
        alignItems: 'center',
        padding: 20
        // paddingTop: Dimensions.get('screen').height / 1,
    },
    rowView: {
        flexDirection: 'row',
    },
    ageMainView: {
        borderWidth: 1,
        borderColor: BaseColors.lightGrey,
        marginVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 20,
        flexDirection: 'row',
        margin: 8
    },
    ageView: {
        padding: 5,
        justifyContent:'center'
    },
    iconView: {
        position: 'absolute',
        bottom: -17,
        alignSelf: 'center'
    },
    texView: {
        backgroundColor: BaseColors.lightPinkBTN,
        padding: 20,
        borderRadius: 5,
        marginTop: 20,
        borderWidth: .7,
        borderColor: BaseColors.secondary,
        // position: 'absolute',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: BaseColors.black

    },
    btnView: {
        marginTop: 40,
    },
    container: {
        position: 'relative',
        alignItems: 'center',
        marginTop: 20,
    },
    messageBox: {
        backgroundColor: BaseColors.lightPinkBTN,
        borderRadius: 5,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    arrow: {
        position: 'absolute',
        bottom: -20,
        width: 20,
        height: 20,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: BaseColors.lightPinkBTN,
        transform: [{ rotate: '180deg' }],
    },
    namText: {
        fontWeight: 'bold',
        color: BaseColors.black
    }
});
