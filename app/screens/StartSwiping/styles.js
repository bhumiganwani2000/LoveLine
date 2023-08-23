import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors } from '../../config/theme';

const nWidth = Dimensions.get('screen').width;
const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: BaseColors.white,
    },
    animationView: {
        flex: 1,
        justifyContent: 'center',
    },
    secView: {
        alignItems: "center"
    },
    animatiInside: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: "center"
    }
});
