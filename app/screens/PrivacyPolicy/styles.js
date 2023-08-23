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
    },
    loaderView:{
        flex:1,
        justifyContent:'center',
    },
    emptyListTxt:{
        fontSize:20,
        color: BaseColors.secondary,
        textAlign:'center',
    },
    heading: {
        color: BaseColors.black,
        fontWeight: 'bold',
        fontSize: 25,
        paddingHorizontal: 20,
    },
    subView: {
        flex: 1,
        marginTop: Dimensions.get('screen').height / 30,
        paddingVertical: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: Dimensions.get('screen').height,
        backgroundColor: BaseColors.white,
        paddingHorizontal:20,
    }
});
