// import GradientWrapper from '@components/GradientWrapper/GradientWrapper';
// import {Images} from '@config';
// import {BaseColors} from '@config/theme';
import React, { useEffect, useRef, useState } from 'react';
import { Images } from '../../config/images';
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  UIManager,
  LayoutAnimation,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import styles from './styles';
import { isArray, isEmpty, isNull } from 'lodash';
import { BaseColors } from '../../config/theme';
import CHeader from '../../components/CHeader';
import AIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Feather';
import EIcon from 'react-native-vector-icons/Entypo';
import CButton from '../../components/CButton';
import ImagePicker from 'react-native-image-crop-picker';
import ModalCmp from '../../components/CModal';
import BaseSetting from '../../config/setting';
import { getApiDataProgress } from '../../utils/apiHelper';
import AuthAction from '../../redux/reducers/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message'


// import Icon from 'react-native-vector-icons/AntDesign';



const Profile = ({ navigation, route }) => {

  const editProfileData = useSelector(state => state.auth.editProfileData);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null)
  const { accessToken } = useSelector(state => state.auth);


  const dispatch = useDispatch();
  const { setAccessToken, setUserData } = AuthAction;

  const logout = () => {
    // Clear the access token and user data from Redux store
    dispatch(setAccessToken(''));
    dispatch(setUserData({}));

    // If you are using React Navigation, you can use the following code to navigate to the login screen:
    navigation.navigate('Login');
  };

  const iconSize = 24;
  const iconColor = BaseColors.black;
  const listItems = [
    {
      id: '1',
      title: 'Account Detail',
      icon: <MIcon name="account-circle-outline" size={iconSize} color={iconColor} />,
      navto: 'EditProfile',
    },
    {
      id: '2',
      title: 'Settings',
      icon: <FIcon name="settings" size={iconSize} color={iconColor} />,
      navto: 'Smile',
      navto: 'Settings',
    },
    {
      id: '3',
      title: 'Contact Us',
      icon: <AIcon name="contacts" size={iconSize} color={iconColor} />,
      navto: 'LikeMeList',

    },
    {
      id: '4',
      title: 'Blocked Users',
      icon: <AIcon name="lock" size={iconSize} color={iconColor} />,
      navto: 'Message',

    },
  ];




  // useEffect(()=>{
  //   console.log("===>>",data);
  // },[])

  const imageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      setSelectedImage(image?.path);
      console.log(image);
      updateProfilePic();
    });
  };
  const cameraOpen = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      setSelectedImage(image?.path)
      console.log("Image Data Done");
      let base64Data = `data:${image.mime};base64,${image.data}`;
      updateProfilePic(base64Data);
    });
  };
  // const convertImg = async() =>{
  //   console.log("selectedImageselectedImage>>>",selectedImage);
  //   const base64Image = await convertImage(selectedImage?.path);
  //   console.log('base64Image>>>>>>>>--', base64Image);
  // }
  // API for updateProfilePic
  async function updateProfilePic(base64uri) {
    //const base64Image = await convertImage(selectedImage.path);
    console.log('base64Image--');
    // setLoader(true);
    const data = {
      profilePicFile: base64uri,
    };
    const header = {
      token: accessToken,
    };
    // console.log("res 1====>", data);

    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.addProfilePic}`,
        data,
        header,
        true
      );
      if (response?.status === "success") {
        // console.log("res 2====>", response);
        // setSelectedImage(base64uri);
        setLoader(false);
        Toast.show({
          type: 'success',
          text1: "success",
          text2: response?.message || "Image upload successfully",
          position: 'Top',
        })
        setModalVisible(false);
      } else {
        setLoader(false);
        Toast.show({
          type: 'error',
          text1: `${response.message}`,
          position: 'Top',
        });
        setModalVisible(false);
        console.log(">>>>>> 3", response.message);
      }
    } catch (error) {
      // setLoader(false);
      setModalVisible(false);
      // console.log("Catch...");
      console.log('error =======>>>', error);
    }
  }


  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.mainView} >
        <Toast />
        <CHeader
          leftIcon
          //  title="Bank Detail"
          onLeftIconClick={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={styles.subView}>
            <View style={styles.profilePicView}>
              <TouchableOpacity style={styles.cameraIcon}
                onPress={() => setModalVisible(true)}
              >
                <EIcon style={{}} name="camera" size={20} color="black" />
              </TouchableOpacity>
              <View style={{ padding: 5 }}>
                <Image
                  source={selectedImage ? { uri: selectedImage } : require('../../assets/Images/01.jpg')}
                  style={styles.avatar}
                />
                {
                  modalVisible ? <ModalCmp
                    openCamera={() => cameraOpen()}
                    openGallery={() => imageUpload()}
                    closeModal={() => closeModal()}
                  />
                    : null
                }
                <Text style={styles.userNameTxt}>{editProfileData.username}</Text>
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.listView}>
                {
                  listItems.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.3}
                        style={styles.navItem}
                        onPress={() => {
                          navigation.navigate(item.navto);
                        }} key={"profile"+index}>
                        <View style={styles.icons}>{item.icon}</View>
                        <Text style={styles.navItemText}>{item.title}</Text>
                      </TouchableOpacity>
                    );
                  })
                }
              </View>
              <View style={styles.btmView}>
                <CButton
                  btnTitle={"Log Out"}
                  onPress={logout}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                  <Text style={styles.deleteTxt}>Delete Account</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </>

  );
};

export default Profile;
