import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors } from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
    mainCantainer: {
        flex: 1,
        // padding: 10
    },
    uprView: {
        paddingTop: Dimensions.get('screen').height / -4,
        backgroundColor: BaseColors.bgColor,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height / 5.5,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingHorizontal: 25,
    },
    subView: {
        marginTop: 30,
        paddingVertical: 20,
        borderRadius: 15,
        marginHorizontal: 10,
        height: Dimensions.get('screen').height / 4,
        backgroundColor: BaseColors.white,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    hedingTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: BaseColors.darkPink,
        marginBottom: 40
    },
    questionTxt: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: BaseColors.black,
        fontSize: 17
    },
    btmView: {
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        marginBottom: 20
    },
    listView: {
        borderWidth: 2,
        borderColor: BaseColors.darkPink,
        borderRadius: 15,
        margin: 5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    validationErrorText: {
        color: 'red'
    }
});
