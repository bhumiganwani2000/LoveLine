// import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, {useEffect, useRef, useState} from 'react';
import { Images } from '../../config/images';
import {
  StatusBar,
  View,
  Text,
  Animated,
  UIManager,
  LayoutAnimation,
  Image,
  Easing,
} from 'react-native';
// import {useSelector} from 'react-redux';
import styles from './styles';
import {useSelector} from 'react-redux';
// import localStorage from 'redux-persist/es/storage';

const NearByUsers = ({navigation}) => {
  const rotationValue = useRef(new Animated.Value(0)).current;
  const rotationValue1 = useRef(new Animated.Value(0)).current;

  
  useEffect(() => {
    setTimeout(()=>{
        navigation.navigate("HomeS");
    },2500)

  }, []);

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 7000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();
    return () => {
      rotateAnimation.stop();
    };

  }, [rotationValue]);

  useEffect(() => {
    const rotateAnimation1 = Animated.loop(
      Animated.timing(rotationValue1, {
        toValue: -1,
        duration: 7000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotateAnimation1.start();
    return () => {
      rotateAnimation1.stop();
    };

  }, [rotationValue1]);
  const rotateInterpolation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const rotateInterpolation1 = rotationValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ["-360deg", "0deg"],
  });
  return (
    <>
     <StatusBar
          backgroundColor={'transparent'}
          barStyle="dark-content"
          translucent
        />
      <View style={styles.animationView}>
       <View style={styles.secView}>
                  <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative', transform: [{ rotate: rotateInterpolation }] }}>
                  <Animated.Image style={{ height: 350, width: 350, }} source={Images.animationBorder} />
                  <View style={styles.animatiInside}>
                    <Image style={{ height: 280, width: 280 }}  source={Images.animationRound} />
                    <Animated.View style={{ position: 'absolute', transform: [{ rotate: rotateInterpolation1 }] }}>
                      <Image source={Images.centerImg} />
                    </Animated.View>
                    <Animated.View style={{ right: 0, top: -10, position: 'absolute', transform: [{ rotate: rotateInterpolation1 }] }}>
                      <Image source={Images.roundC} />
                    </Animated.View>

                    <Animated.View style={{ right: 20, bottom: 20, position: 'absolute', transform: [{ rotate: rotateInterpolation1 }] }}>
                      <Image source={Images.roundA}/>
                    </Animated.View>

                    <Animated.View style={{ left: 20, top: 20, position: 'absolute', transform: [{ rotate: rotateInterpolation1 }] }}>
                      <Image source={Images.roundB}/>
                    </Animated.View>

                    <Animated.View style={{ left: -15, bottom: 10, position: 'absolute', transform: [{ rotate: rotateInterpolation1 }] }}>
                      <Image source={Images.roundD} />
                    </Animated.View>
                  </View>
                  
                </Animated.View>
              
              </View>  
                 
              <View>
              
              </View>   
            </View>
            {/* <Text style={styles.btmTxt}>
                Lorem ipsum dolor sit amet Lorem
              </Text>  */}
    </>
  );
};

export default NearByUsers;
