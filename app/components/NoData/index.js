import PropTypes from 'prop-types';
import React from 'react';
import {Images} from '@config';
import {Text, View} from 'react-native';
import { BaseColors } from '../../config/theme';

/**
 * Component for GradientContainer
 *@function NoDataFound
 */
export default function NoDataFound(props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <Lottie
      source={Images.noData}
      style={{height: 200, width: 200}}
      autoPlay
      loop
    /> */}
      <Text style={{color: BaseColors.secondary, fontWeight:'bold'}}>
        {props.title}
      </Text>
    </View>
  );
}
