import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { BaseColors } from '../../config/theme';
import AIcon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
// Icon.loadFont();

const CHeader = (props) => {

  const {
    title,
    iconName,
    leftIcon,
    onLeftIconClick,
    headingwithbtn,
    headerTitle,
    rightBtnPress,
    rightBtnTitle,
    ...rest
  } = props;

  return (
    <View style={styles.mainView}>
      <StatusBar
        backgroundColor={BaseColors.bgColor}
        barStyle="light-content"
        translucent
      />
      {leftIcon ? (<TouchableOpacity activeOpacity={0.5} onPress={onLeftIconClick}>
        <AIcon name="left" size={25} color={BaseColors.white} />
      </TouchableOpacity>) : null}
      {title ? (<View style={styles.titleView}>
        <Text style={styles.heading}>{title}</Text>
      </View>) : null}
      {headingwithbtn ?
        (<View style={styles.headingView}>
          <Text style={styles.heading}>{headerTitle}</Text>
          <TouchableOpacity onPress={rightBtnPress}>
            <Text style={styles.btnTxt}>{rightBtnTitle}</Text>
          </TouchableOpacity>
        </View>) : null
      }
    </View>
  );
};





export default CHeader;