// import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, { useEffect, useState } from 'react';
import { Images } from '../../config/images';
import {
  StatusBar,
  View,
  Text,
  Animated,
  UIManager,
  LayoutAnimation,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';
import CButton from '../../components/CButton';
import { BaseColors } from '../../config/theme';
// import LinearGradient from 'react-native-linear-gradient';

const Intro = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle="light-content"
        translucent
      />
      {/* <LinearGradient colors={['#DF8CD1', '#DF8CD1', '#C434C7']} style={styles.linearGradient}> */}
      <View style={styles.linearGradient}>
        <View style={styles.box}>
          <Image source={Images.intro} style={{ width: 180, height: 250 }} />
          <Text style={styles.TitleTxt}>Love Line</Text>
        </View>
        <View style={{ paddingBottom: 20 }}>
          <View style={styles.btnView}>
            <CButton
              onPress={() => navigation.navigate('Signup')}
              containerStyle={{ backgroundColor: BaseColors.white }}
              txtSty={{ color: BaseColors.secondary }}
              btnTitle={"I'm New Here"} />
          </View>
          <View style={styles.btnView}>
            <CButton
              onPress={() => navigation.navigate('Login')}
              btnTitle={"I’ve Been Here Before"}
              type="outlined" />
          </View>
        </View>
      </View>
      {/* </LinearGradient> */}

    </View>
  );
};

export default Intro;
