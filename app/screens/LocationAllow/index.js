// import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, { useEffect, useRef, useState } from 'react';
import { Images } from '../../config/images';
import {
  StatusBar,
  View,
  Text,
  Animated,
  UIManager,
  LayoutAnimation,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import styles from './styles';
import { isArray, isEmpty, isNull } from 'lodash';
import CInput from '../../components/CInput';
import { BaseColors } from '../../config/theme';
// import Icon from 'react-native-vector-icons/AntDesign';
import CButton from '../../components/CButton';
import BaseSetting from '../../config/setting';
import { getApiData, getApiDataProgress, postApiData1 } from '../../utils/apiHelper';
import { useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation'
import { PermissionsAndroid } from 'react-native';
import Toast from 'react-native-toast-message'




const LocationAllow = ({ navigation, route }) => {
  const [latitudeLocation, setLatitudeLocatin] = useState();
  const [longitudeLocation, setlongitudeLocatin] = useState();
  const [btnLoader, setBtnLoader] = useState(false);

  const { accessToken, userData } = useSelector(state => state.auth);
  // API for UserLocation staticly

  const UserLocation = () => {
    setBtnLoader(true);
    setTimeout(() => {
      navigation.navigate('NearByUsers');
      setBtnLoader(false);
    }, 2000);
    // navigation.navigate("NearByUsers");
  }




  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted.');
      } else {
        console.log('Location permission denied.');
      }
    } catch (err) {
      console.warn(err);
    }
  };



  // // Call the permission request function
  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);
  //call Gelocationfunction geting latitude & longitude
  useEffect(() => {
    getLocation();
  }, []);


  const getLocation = () => {
    requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatitudeLocatin(latitude);
        setlongitudeLocatin(longitude);
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
      },
      error => {
        console.log('Error====>', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }

    );

  };


  // API for UserLocation
  //  async function UserLocation() {
  //   setBtnLoader(true);
  //   const data = {
  //     lat: latitudeLocation,
  //     lon: longitudeLocation,
  //   };
  //   const header = {
  //     token: accessToken,
  //   };
  //   try {
  //     const response = await getApiDataProgress(
  //             `${BaseSetting.endpoints.userLocation}`,
  //             data,
  //             header,
  //             true
  //           );
  //     console.log("res====>",response);
  //     if (response?.status === "success") {
  //       setBtnLoader(false);
  //       Toast.show({
  //         type: 'success',
  //         text1: "success",
  //         text2: response?.message || "Location successfully",
  //         position: 'Top',
  //       });
  //       setTimeout(() => {          
  //         navigation.navigate('NearByUsers');
  //     }, 3000);
  //     } else {
  //       setBtnLoader(false);
  //       Toast.show({
  //         type: 'error',
  //         text1: response.message || "Something went Wrong",
  //         position: 'Top',
  //       });
  //       console.log('error =======>>>');
  //     }
  //   } catch (error) {
  //     Alert.alert("catch>>>")
  //     setBtnLoader(false);
  //     console.log('error =======>>>', error);
  //   }
  // }

  return (
    <>
      <View style={styles.mainView}  >
        <Toast />
        <StatusBar
          backgroundColor={BaseColors.white}
          barStyle="dark-content"
          translucent
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.uprView}>
            <Image source={Images.location} />
            <View style={{ paddingTop: 20 }}>
              <Text style={styles.header}>Lorem ipsum dolor sit amet, consectetur</Text>
              <Text style={styles.subHeading} >Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur</Text>
            </View>
          </View>
          <View style={styles.btmView}>
            <Text style={styles.btmTxt}>Lorem ipsum dolor sit amet, consectetur Lorem ipsum </Text>
            <CButton
              loading={btnLoader}
              containerStyle={{ marginTop: 20 }}
              btnTitle={"Continue"}
              onPress={() => UserLocation()}
            />
          </View>
        </SafeAreaView>

      </View>
    </>

  );
};

export default LocationAllow;
