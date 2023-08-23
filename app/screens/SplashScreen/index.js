// import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, {useEffect, useState} from 'react';
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
// import {useSelector} from 'react-redux';
import styles from './styles';
import {useSelector} from 'react-redux';
import { store } from '../../redux/store/configureStore';
// import localStorage from 'redux-persist/es/storage';

const SplashScreen = ({navigation}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const accessToken = useSelector(state => state.auth.accessToken);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {      
      if (accessToken) {
        console.log("====>accesTokenLocations")
        navigation.reset({
          routes: [{name: 'LocationAllow', from: 'SplashScreen'}],
        });
      } 
       else {
        navigation.reset({
          routes: [{name: 'Intro', from: 'SplashScreen'}],
        });
      }
    }, 4000);
  }, [accessToken]);

  const enableAnimateInEaseOut = () => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  enableAnimateInEaseOut();
  return (
    <>
     <StatusBar
          backgroundColor={'transparent'}
          barStyle="dark-content"
          translucent
        />
    <Animated.View style={[styles.main, {opacity: fadeAnim}]}>     
        <View style={styles.box}>
        <Image source={Images.splashlogo} style={{width: 180, height: 250}} />
        <Text style={styles.TitleTxt}>Love Line</Text>
        </View>
    </Animated.View>
    </>
  );
};

export default SplashScreen;
