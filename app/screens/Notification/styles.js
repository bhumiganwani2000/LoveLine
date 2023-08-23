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
        padding: 20
    },
    nameOfList: {
        fontSize: 16,
        fontWeight: 'bold'
    },
subHeading:{
    marginVertical:20,
    paddingVertical: 10,
     backgroundColor: BaseColors.lightWhite,
},
    icons: {
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },
    togaalMainView: {
        paddingVertical:10,
        flexDirection: 'row',
         justifyContent: 'space-between'
    },
    togaalInView: {
        flexDirection: 'row'
    }

});
