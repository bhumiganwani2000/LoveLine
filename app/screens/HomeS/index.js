import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StatusBar, Modal, Image, TouchableOpacity, ScrollView, Alert, BackHandler } from 'react-native';
import { getApiDataProgress } from '../../utils/apiHelper';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import BaseSetting from '../../config/setting';
import styles from './styles';
import { BaseColors } from '../../config/theme';
import AIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import NoDataFound from '../../components/NoData';
import { useIsFocused } from '@react-navigation/native';
import SocketAction from '../../redux/reducers/Socket/actions';
import { Overlay, Tile } from 'react-native-elements';

// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';


const HomeS = ({ navigation, route }) => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const editProfileData = useSelector(state => state.auth.editProfileData);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(true);
  const [cardsList, setCardsList] = useState([]);
  const [showLike, setshowLike] = useState(false);
  const [showDislike, setshowDislike] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [swipeData, setSwipeData] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const isFocused = useIsFocused();
  const socketObj = useSelector((state) => state.socket.socketObj);
  const dispatch = useDispatch();
  const { initialize } = SocketAction;
  const { userData } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(initialize()); // socket connection
  }, []);

  useEffect(() => {
  }, [swipeData])

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  // const backPress = () => {
  //   Alert.alert("it's Me");
  // }
  // useEffect(() => {
  //   const hardwareBackPressHandler = () => {
  //     backPress();
  //     return true;
  //   }
  //   BackHandler.addEventListener('hardwareBackPress', hardwareBackPressHandler);
  //   return () => BackHandler.removeEventListener('hardwareBackPress', hardwareBackPressHandler);
  // }, []);


  // useEffect(()=>{
  //     BackHandler.addEventListener('hardwareBackPress', function() );
  // },[])



  // const notification = () => {
  //   PushNotification.localNotificationSchedule({
  //     //... You can use all the options from localNotifications
  //     message: "My Notification Message", // (required)
  //     date: new Date(Date.now() + 60 * 1000), // in 60 secs
  //     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

  //     /* Android Only Properties */
  //     repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
  //   });
  // }

  // For Push Notification Token
  // useEffect(() => {
  //   getTokenPush();
  // }, []);
  // const getTokenPush = async () => {
  //   const pushNtfnToken = await messaging().getToken();
  //   setPushToken(pushNtfnToken);
  // };
  // const configurePushNotifications = () => {
  //   PushNotification.configure({
  //     onRegister: function (pushToken) {
  //       //console.log('TOKEN:------', pushToken);
  //     },
  //     onNotification: function (notification) {
  //       //console.log('REMOTE NOTIFICATION:--------', notification);
  //     },
  //     senderID: '134368384454',
  //     popInitialNotification: true,
  //     requestPermissions: true,
  //   });
  // };

  // const callNotification = async () => {
  //   try {
  //     // Get the push token
  //     const pushToken = await messaging().getToken();
  //     if (!pushToken) {
  //       //console.log('Push notification token not available.');
  //       return;
  //     }
  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //       //console.log('Notification caused app to open from background state:', remoteMessage.notification);
  //     });
  //     messaging().onMessage(async remoteMessage => {
  //       //console.log('Received notification:', remoteMessage);
  //     });
  //     messaging().getInitialNotification().then(remoteMessage => {
  //       if (remoteMessage) {
  //         //console.log('Notification caused app to open from quit state:', remoteMessage.notification);
  //       }
  //     });

  //     const notificationPayload = {
  //       notification: {
  //         title: 'Kira Group',
  //         body: 'Kira Group',
  //       },
  //     };

  //     //console.log('Sending notification', notificationPayload.notification);
  //     await messaging().send(notificationPayload);
  //   } catch (error) {
  //     //console.log('Error while sending push notification:', error);
  //   }
  // };

  // For Push Notification Token
  // useEffect(() => {
  //   getTokenPush();
  //   configurePushNotifications();
  // }, []);
  // const getTokenPush = async () => {
  //   const pushNtfnToken = await messaging().getToken();
  //   setPushToken(pushNtfnToken);
  // };
  // const configurePushNotifications = () => {
  //   PushNotification.configure({
  //     onRegister: function (pushToken) {
  //       //console.log('TOKEN:------', pushToken);
  //     },
  //     onNotification: function (notification) {
  //       //console.log('REMOTE NOTIFICATION:--------', notification);
  //     },
  //     senderID: '134368384454',
  //     popInitialNotification: true,
  //     requestPermissions: true,
  //   });
  // };

  // For Card list

  useEffect(() => {
    if (like) {
      setshowLike(true);
      const timeout = setTimeout(() => {
        setLike(false);
        setshowLike(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [like]);

  useEffect(() => {
    if (dislike) {
      setshowDislike(true);
      const timeout = setTimeout(() => {
        setDislike(false);
        setshowDislike(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [dislike]);

  const swiperRef = useRef(null);

  const handleSwipeRight = (index) => {
    const swipedCard = cardsList[index]._id;
    let currentCard = currentCardIndex
    if (currentCard < cardsList.length - 1) {
      setCurrentCardIndex(currentCard + 1);
    }
    LikeAPI(swipedCard);
  };

  const handleSwipeRightClick = () => {
    swiperRef.current?.swipeRight();
    let currentCard = currentCardIndex
    if (currentCard < cardsList.length - 1) {
      setCurrentCardIndex(currentCard + 1);
    }
  };

  const handleSwipeLeft = (index) => {
    const swipedCard = cardsList[index]._id;
    let currentCard = currentCardIndex
    if (currentCard < cardsList.length - 1) {
      setCurrentCardIndex(currentCard + 1);
    }
    DisLikeAPI(swipedCard);
  };

  const handleSwipeLeftClick = () => {
    swiperRef.current?.swipeLeft();
    let currentCard = currentCardIndex
    if (currentCard < cardsList.length - 1) {
      setCurrentCardIndex(currentCard + 1);
    }
  };

  const onSwipeCards = (x, y) => {
    if (x > 40) {
      setshowLike(true);
      setshowDislike(false);
    } else if (x < -40) {
      setshowDislike(true);
      setshowLike(false);
    }
  };

  const noMoreCardHandle = () => {
    return (
      <View style={styles.backTxtView}>
        <Text style={styles.backTxt}>Please Wait! Finding new matches around</Text>
      </View >
    );
  };


  // Card listApi
  useEffect(() => {
    CardListAPI();
  }, []);
  async function CardListAPI() {
    setLoader(true);
    const header = {
      token: accessToken,
    };
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.homepageList}`,
        null,
        header,
        true
      );
      if (response?.status) {
        setLoader(false);
        setCardsList(response?.data);
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  }
  // Like APi
  async function LikeAPI(userId) {
    const data = {
      likedUserId: userId,
    };
    const header = {
      token: accessToken,
    };
    //console.log("Like--Id---", data);
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.like}`,
        data,
        header,
        true
      );
      // //console.log("Bhumires====>", response?.data);
      if (response?.status) {
        //console.log('masss--Like----', response.message);
      } else {
        // setLoader(false);
      }
      //console.log("LikeAPI====>");
    } catch (error) {
      //console.log('error =======>>>', error);
    }
  }
  // Dislike APi 
  async function DisLikeAPI(userId) {
    const data = {
      dislikedUserId: userId,
    };
    //console.log("---dislike--Id---", data)
    const header = {
      token: accessToken,
    };
    try {
      const response = await getApiDataProgress(
        `${BaseSetting.endpoints.disLike}`,
        data,
        header,
        true
      );
      // //console.log("res====>", response?.data);
      if (response?.status) {
        //console.log('masss--DisLike----', response.message);
      } else {
        setLoader(false);
      }
      //console.log("DisLikeAPI====>");
    } catch (error) {
      //console.log('error =======>>>', error);
    }
  }



  return (
    <View style={styles.mainView}>
      {
        isFocused &&
        <StatusBar
          backgroundColor={BaseColors.lightGreyBg}
          barStyle="dark-content"
          translucent
        />
      }

      <Text style={styles.heading}>LoveLine</Text>
      {/* Cards List */}
      {loader ? (
        <View>
          <ActivityIndicator
            size="large"
            color={BaseColors.primary}
          />
        </View>
      ) : (
        <>
          {!_.isEmpty(cardsList) && _.isArray(cardsList) ? (
            <View style={styles.container}>
              <CardStack
                style={styles.cardImg}
                ref={swiperRef}
                onSwipe={(x, y) => onSwipeCards(x, y)}
                onSwipeEnd={() => {
                  console.log("Test ", swiperRef.current)
                  setshowLike(false);
                  setshowDislike(false);
                }}
                onSwipedLeft={handleSwipeLeft}
                onSwipedRight={handleSwipeRight}
                renderNoMoreCards={noMoreCardHandle}
                verticalSwipe={false}
                onSwipedAll={() => {
                  setSwipeData(!swipeData)
                }}
              >
                {cardsList.map((item, index) => (
                  <Card
                    key={item._id}>
                    <View style={styles.cardMainView}>
                      <Image
                        source={{ uri: item.profilePic }}
                        defaultSource={require('../../assets/Images/user.png')}
                        style={styles.cardImage}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={styles.onTexMainView}>
                      <View style={styles.texCardStyle}>
                        <View>
                          <Text style={styles.cardTexeName}>{item.username}</Text>
                        </View>
                        <View style={styles.iconTexView}>
                          <AIcon name="heart" style={{ right: 4 }} size={15} color={BaseColors.red} />
                          <Text style={styles.lightTextCard}>{item.age}</Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.lightTextCard}>{item.occupation}</Text>
                      </View>
                    </View>
                  </Card>
                ))}
              </CardStack>
            </View>
          ) : (
            <View style={styles.noData}>
              <NoDataFound title={"Please Wait! Finding new matches around"} />
            </View>
          )}

          {
            !swipeData &&
            <View style={styles.iconView}>
              <View style={styles.iconContainer}>
                <View style={[styles.buttonBg, { backgroundColor: BaseColors.red }]}>
                  <AIcon name="close" size={35} color={BaseColors.white} onPress={() => handleSwipeLeftClick()} />
                </View>
                <View style={styles.middleIcon}>
                  <AIcon name="info" type="font-awesome" size={50} onPress={openModal} color={BaseColors.white} />
                </View>
                <View style={[styles.buttonBg, { backgroundColor: BaseColors.secondary }]}>
                  <AIcon name="heart" type="font-awesome" size={35} onPress={() => handleSwipeRightClick()} color={BaseColors.white} />
                </View>

              </View>
              {showLike && (
                <View style={styles.likeImgView}>
                  <AIcon name="heart" size={50} color={BaseColors.lightPurple} />
                </View>
              )}
              {showDislike && (
                <View style={styles.dlikeImgView}>
                  <FIcon name="close" size={100} color={BaseColors.lightPurple} />
                </View>
              )}
            </View>
          }
        </>
      )
      }

      {/*  ModalView */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
        onPressClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalShadowContent} onPress={() => setModalVisible(false)}></TouchableOpacity>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
              <View style={{ flex: 1 }}>
                <View style={styles.rowView}>
                  <View>
                    <View style={styles.text_icon}>
                      <Text style={styles.modalHeading}>{cardsList[currentCardIndex]?.username}</Text>
                      <MIcon style={{ left: 10 }} name="check-decagram" size={30} color={BaseColors.green} />
                    </View>
                    <View style={styles.text_icon}>
                      <EIcon name="location-pin" size={20} color={BaseColors.secondary} />
                      <Text style={styles.modalTxt}>{cardsList[currentCardIndex]?.nationality}</Text>
                    </View>
                  </View>
                  <View style={styles.text_icon}>
                    <FIcon name="user-o" style={{ right: 10 }} size={18} color={BaseColors.secondary} />
                    <Text style={[styles.modalTxt, { fontWeight: 'bold' }]}>{cardsList[currentCardIndex]?.age}</Text>
                  </View>
                </View>
                <View style={styles.rowView}>
                  <Text style={styles.modaltext}>Occupation</Text>
                  <View style={styles.text_icon}>
                    <AIcon name="plussquare" style={{ right: 10 }} size={17} color={BaseColors.red} />
                    <Text style={[styles.modalTxt, { lineHeight: 17 }]}>{cardsList[currentCardIndex]?.occupation}</Text>
                  </View>
                </View>
                <View style={styles.rowView1}>
                  <Text style={styles.modaltext}>About Me</Text>
                  <Text style={styles.modalTxt}>{cardsList[currentCardIndex]?.aboutMe}</Text>
                </View>
                {/* Display Interests */}
                {cardsList[currentCardIndex]?.interests && Array.isArray(cardsList[currentCardIndex]?.interests) && cardsList[currentCardIndex]?.interests.length > 0 && (
                  <View style={[styles.rowView1, { borderBottomWidth: 0 }]}>
                    <Text style={styles.modaltext}>My Interests</Text>
                    <View style={styles.mapView}>
                      {cardsList[currentCardIndex]?.interests.map((itm, interestIndex) => (
                        <TouchableOpacity key={interestIndex} style={styles.listView}>
                          <Text style={styles.listTxt}>{itm}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>



    </View >
  );
};

export default HomeS;