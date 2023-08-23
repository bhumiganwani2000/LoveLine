/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
// import { isIPhoneX } from 'react-native-status-bar-height';
import { useTheme } from '@react-navigation/native';
import AIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomIcon } from '@config/LoadIcons';

import AuthAction from '@redux/reducers/auth/actions';
import { useDispatch } from 'react-redux';
import { BaseColors } from '../config/theme';

export default function BottomTabBar({ state, descriptors, navigation }) {
  // const dispatch = useDispatch();
  const { setInviteScroll } = AuthAction;

  // const colors = useTheme();
  // const BaseColors = colors.colors;
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const IOS = Platform.OS === 'ios';

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  // this function for render icons
  const getIcons = (label, isFocused, index) => {
    const tabIconColor = isFocused ? BaseColors.secondary : BaseColors.greyColor;
    const iconSize = isFocused ? 30 : 25;
    switch (label) {
      case 'HomeS':
        return <AIcon name="home" size={iconSize}  color={tabIconColor}/>;
      case 'LikeMeList':
        return  <AIcon name="hearto" size={iconSize} color={tabIconColor}/>;
      case 'BulidDate':
          return <Icon name="smile" size={iconSize}  color={tabIconColor}/>;
      case 'Message':
            return  <Ionicons name="chatbox-outline" size={iconSize}  color={tabIconColor}/>;
      case 'Profile':
        return  <AIcon name="user" size={iconSize} color={tabIconColor}/>;
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        // backgroundColor: BaseColors.red,
        textAlign: 'center',
        shadow: {
          shadowColor: BaseColors.black40,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        paddingBottom: IOS ? 15 : 0,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            console.log(
              '🚀 ~ file: BottomTabBar.js ~ line 84 ~ onPress ~ route.name',
              route.name,
            );
            if (route.name === 'HomeS') {
              navigation.navigate(route.name);
            } else {
            //   dispatch(setInviteScroll(false));
              setTimeout(() => {
                navigation.navigate(route.name);
              }, 100);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return(
          <TouchableOpacity
              key={index}
              activeOpacity={1}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{
                flex: 1,
                paddingBottom: 10,
                height: 65,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: BaseColors.white,
                
              }}>
                 <View
                style={{
                  flex: 1,
                  paddingBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: BaseColors.white,
                }}>
                {getIcons(label, isFocused, index)}
                </View>
              </TouchableOpacity>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 10,
    // paddingBottom: isIPhoneX ? 15 : 10,
    paddingBottom: 10,
    // height: isIPhoneX ? 70 : 60,
    height: 60,
    justifyContent: 'center',
    // backgroundColor:'red',
    alignItems: 'center',
    // borderTopWidth: 2,
    // borderColor: '#000', // BaseColors.secondary,
  },
  iconViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 40,
    width: 40,
  },
});
